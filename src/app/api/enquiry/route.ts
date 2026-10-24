import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { baseEnquirySchema } from "@/lib/enquiry-schema";
import { validateSpamGuard } from "@/lib/spam-guard";
import { EnquiryNotificationEmail } from "../../../../emails/enquiry-notification";
import { EnquiryAutoreplyEmail } from "../../../../emails/enquiry-autoreply";
import { siteConfig } from "@/config/site";

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

    const body = await request.json();

    // 2. Validate input schema using shared Zod definition
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

    // 3. Spam Guard Protection: Honeypot & Fill Speed Verification
    const spamCheck = validateSpamGuard({
      website: data.website,
      _time: data._time,
      turnstileToken: data.turnstileToken,
    });

    if (spamCheck.isSpam) {
      // Return 400 without revealing internal anti-bot heuristics
      return NextResponse.json(
        { error: "Unable to process request at this time." },
        { status: 400 }
      );
    }

    // 4. Send Emails via Resend
    const toEmail = process.env.ENQUIRY_TO_EMAIL || "dispatch@mirstradecenter.com";
    const fromEmail =
      process.env.ENQUIRY_FROM_EMAIL ||
      `${siteConfig.name} <rentals@mirstradecenter.com>`;

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

    // Note: No enquiry data is stored in any database or disk log.
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
