import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { baseEnquirySchema } from "@/lib/enquiry-schema";
import { contactFormSchema, normalizeBangladeshPhone } from "@/lib/contact-schema";
import { validateSpamGuard } from "@/lib/spam-guard";
import { checkRateLimit } from "@/lib/rate-limit";
import { EnquiryNotificationEmail } from "../../../../emails/enquiry-notification";
import { EnquiryAutoreplyEmail } from "../../../../emails/enquiry-autoreply";
import { ContactNotificationEmail } from "../../../../emails/contact-notification";
import { ContactAutoreplyEmail } from "../../../../emails/contact-autoreply";
import { siteConfig } from "@/config/site";
import { allEquipment } from "@/data/equipment";

// Initialize Resend client if API key is provided
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    // 1. Basic Abuse Protection: Input Size Limits (max 64KB)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 65536) {
      return NextResponse.json(
        { error: "Payload too large. Maximum request size is 64KB." },
        { status: 413 }
      );
    }

    // 2. Per-IP Rate Limiting (5 requests per 10 minutes)
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait a few minutes before trying again or call 01711-269863.",
          fallback: {
            phone: siteConfig.contact.phone,
            whatsappUrl: siteConfig.contact.whatsappUrl,
            email: siteConfig.contact.email,
          },
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const isContactForm =
      body.type === "contact" || ("interest" in body && "message" in body);

    const toEmail = process.env.ENQUIRY_TO_EMAIL || "info@msmirsulaimantradecenter.com";
    const fromEmail =
      process.env.ENQUIRY_FROM_EMAIL ||
      `${siteConfig.name} <notifications@msmirsulaimantradecenter.com>`;

    // Format current time in Asia/Dhaka
    const dhakaTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date());

    if (isContactForm) {
      // Validate Contact Form Schema
      const validationResult = contactFormSchema.safeParse(body);
      if (!validationResult.success) {
        const fieldErrors = validationResult.error.flatten().fieldErrors;
        if (fieldErrors.website) {
          return NextResponse.json(
            { error: "Unable to process request at this time." },
            { status: 400 }
          );
        }
        return NextResponse.json(
          {
            error: "Invalid form data.",
            details: fieldErrors,
          },
          { status: 400 }
        );
      }

      const data = validationResult.data;

      // Spam Guard Check: Honeypot & Minimum Fill-Time (3 seconds)
      const spamCheck = validateSpamGuard({
        website: data.website,
        _time: data._time,
        turnstileToken: data.turnstileToken,
      });

      if (spamCheck.isSpam) {
        return NextResponse.json(
          { error: "Unable to process request at this time." },
          { status: 400 }
        );
      }

      // Normalize phone for display
      const normalized = normalizeBangladeshPhone(data.phone);
      const displayPhone = normalized.isValid ? normalized.formatted || data.phone : data.phone;

      // Resolve product name if slug was passed
      const matchedProduct = data.product
        ? allEquipment.find((item) => item.slug === data.product)
        : undefined;
      const productName = matchedProduct ? matchedProduct.name : data.product || undefined;

      if (resend) {
        // 1. Send dispatch notification email to ENQUIRY_TO_EMAIL
        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          replyTo: data.email || undefined,
          subject: `New Website Contact Inquiry from ${data.name}`,
          react: ContactNotificationEmail({
            name: data.name,
            phone: displayPhone,
            email: data.email || undefined,
            interest: data.interest,
            productName,
            productSlug: matchedProduct?.slug,
            neededFrom: data.neededFrom || undefined,
            location: data.location || undefined,
            message: data.message,
            dhakaTime,
          }),
        });

        // 2. Send client auto-reply confirmation email if client provided an email
        if (data.email) {
          await resend.emails.send({
            from: fromEmail,
            to: data.email,
            replyTo: toEmail,
            subject: `We received your inquiry - ${siteConfig.name}`,
            react: ContactAutoreplyEmail({
              name: data.name,
              interest: data.interest,
              productName,
              message: data.message,
            }),
          });
        }
      }

      // Note: No enquiry data is stored in any database or disk log.
      return NextResponse.json(
        {
          success: true,
          message: "Contact inquiry successfully transmitted.",
        },
        { status: 200 }
      );
    }

    // Otherwise handle Quote Enquiry Form
    const validationResult = baseEnquirySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid form data.",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Spam Guard Check
    const spamCheck = validateSpamGuard({
      website: data.website,
      _time: data._time,
      turnstileToken: data.turnstileToken,
    });

    if (spamCheck.isSpam) {
      return NextResponse.json(
        { error: "Unable to process request at this time." },
        { status: 400 }
      );
    }

    if (resend) {
      // Send dispatch notification email
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: data.email,
        subject:
          data.type === "quote"
            ? `New Equipment Quote Request: ${data.machineName || data.name}`
            : `New Website Contact Inquiry from ${data.name}`,
        react: EnquiryNotificationEmail({ data }),
      });

      // Send client auto-reply confirmation email
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        replyTo: toEmail,
        subject: `We received your equipment request - ${siteConfig.name}`,
        react: EnquiryAutoreplyEmail({ data }),
      });
    }

    return NextResponse.json(
      { success: true, message: "Enquiry successfully transmitted." },
      { status: 200 }
    );
  } catch {
    // Return friendly error response with fallback contact info
    return NextResponse.json(
      {
        error: "Failed to transmit inquiry.",
        fallback: {
          phone: siteConfig.contact.phone,
          whatsappUrl: siteConfig.contact.whatsappUrl,
          email: siteConfig.contact.email,
        },
      },
      { status: 500 }
    );
  }
}
