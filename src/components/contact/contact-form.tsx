"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import {
  contactFormSchema,
  ContactFormData,
  interestOptions,
  normalizeBangladeshPhone,
} from "@/lib/contact-schema";
import { siteConfig } from "@/config/site";
import { allEquipment } from "@/data/equipment";
import { categories } from "@/data/categories";
import {
  Send,
  MessageCircle,
  Phone,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

interface ContactFormProps {
  initialProduct?: string;
}

export function ContactForm({ initialProduct }: ContactFormProps) {
  const [loadTime] = useState<number>(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(
    null
  );

  const headingId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  // Compute minimum selectable date in Asia/Dhaka (YYYY-MM-DD)
  const minDate = (() => {
    try {
      return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  })();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interest: "Renting equipment",
      product: initialProduct || "",
      neededFrom: "",
      location: "",
      message: "",
      website: "", // Honeypot (must stay empty)
      _time: loadTime,
      turnstileToken: "",
    },
  });

  // Watch fields using React Compiler friendly useWatch hook
  const watchedMessage = useWatch({ control, name: "message" }) || "";
  const watchedName = useWatch({ control, name: "name" }) || "";
  const watchedPhone = useWatch({ control, name: "phone" }) || "";
  const watchedInterest = useWatch({ control, name: "interest" }) || "Renting equipment";
  const watchedProduct = useWatch({ control, name: "product" }) || "";
  const watchedLocation = useWatch({ control, name: "location" }) || "";

  // 1. Restore message draft from localStorage on mount (wrapped safely in try/catch)
  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(
        "msm_contact_message_draft"
      );
      if (savedDraft && !watchedMessage) {
        setValue("message", savedDraft, { shouldValidate: false });
      }
    } catch {
      // LocalStorage unavailable/disabled
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Save message draft to localStorage on change (try/catch)
  useEffect(() => {
    try {
      if (watchedMessage) {
        window.localStorage.setItem("msm_contact_message_draft", watchedMessage);
      } else {
        window.localStorage.removeItem("msm_contact_message_draft");
      }
    } catch {
      // LocalStorage unavailable/disabled
    }
  }, [watchedMessage]);

  // 3. If prefilled product was passed in query, preselect and scroll into view
  useEffect(() => {
    if (initialProduct) {
      setValue("product", initialProduct);
      const timer = setTimeout(() => {
        const formEl = document.getElementById("contact-form");
        if (formEl) {
          formEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [initialProduct, setValue]);

  // Submit handler
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Normalize phone before sending
    const normalized = normalizeBangladeshPhone(data.phone);
    const payload = {
      ...data,
      phone: normalized.isValid ? normalized.formatted || data.phone : data.phone,
      _time: loadTime,
      type: "contact",
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to transmit enquiry");
      }

      // Clear draft on success
      try {
        window.localStorage.removeItem("msm_contact_message_draft");
      } catch {
        // Ignore storage error
      }

      setSubmittedData(data);
    } catch {
      // Error state preserves entered values
      setSubmitError(
        "We could not send your message. Please call 01711-269863 or use WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Focus the first invalid field on validation error
  const onError = (fieldErrors: typeof errors) => {
    const errorKeys = Object.keys(fieldErrors);
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0];
      const targetElement = document.getElementById(`field-${firstKey}`);
      if (targetElement) {
        targetElement.focus();
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  // Build client-side WhatsApp link with current form values
  const buildWhatsAppFallbackLink = () => {
    const productName = watchedProduct
      ? allEquipment.find((e) => e.slug === watchedProduct)?.name ||
        watchedProduct
      : "Not specified";

    const lines = [
      `Hello ${siteConfig.name}, I am sending an inquiry from your website contact form:`,
      `• Name: ${watchedName || "Customer"}`,
      watchedPhone ? `• Phone: ${watchedPhone}` : null,
      `• Interest: ${watchedInterest}`,
      watchedProduct ? `• Product: ${productName}` : null,
      watchedLocation ? `• Location: ${watchedLocation}` : null,
      watchedMessage ? `• Message: ${watchedMessage}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(lines)}`;
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setSubmitError(null);
    reset({
      name: "",
      phone: "",
      email: "",
      interest: "Renting equipment",
      product: "",
      neededFrom: "",
      location: "",
      message: "",
      website: "",
      _time: Date.now(),
    });
  };

  // SUCCESS STATE (Replaces form on same page)
  if (submittedData) {
    const productName = submittedData.product
      ? allEquipment.find((e) => e.slug === submittedData.product)?.name ||
        submittedData.product
      : null;

    return (
      <div
        id="contact-form"
        tabIndex={-1}
        className="scroll-mt-24 bg-white border-2 border-[#111111] rounded-[6px] p-6 lg:p-10 space-y-6 focus:outline-none"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ECFDF5] border border-[#10B981] flex items-center justify-center shrink-0 text-[#10B981]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
              Message Sent
            </h2>
            <p className="text-sm text-[#3D3D3D]">
              Thank you, <strong>{submittedData.name}</strong>. We have received your inquiry.
            </p>
          </div>
        </div>

        {/* Message Summary */}
        <div className="bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] p-5 space-y-2 text-xs sm:text-sm">
          <p className="font-bold text-[#111111] uppercase tracking-wider text-xs pb-1 border-b border-[#E5E5E0]">
            Inquiry Summary
          </p>
          <p>
            <span className="font-semibold text-[#111111]">Phone:</span> {submittedData.phone}
          </p>
          {submittedData.email && (
            <p>
              <span className="font-semibold text-[#111111]">Email:</span> {submittedData.email}
              <span className="text-[#6B6B6B] block text-xs mt-0.5">
                (An automated confirmation was sent to your inbox)
              </span>
            </p>
          )}
          <p>
            <span className="font-semibold text-[#111111]">Interest:</span> {submittedData.interest}
          </p>
          {productName && (
            <p>
              <span className="font-semibold text-[#111111]">Product:</span> {productName}
            </p>
          )}
          {submittedData.neededFrom && (
            <p>
              <span className="font-semibold text-[#111111]">Needed From:</span> {submittedData.neededFrom}
            </p>
          )}
          {submittedData.location && (
            <p>
              <span className="font-semibold text-[#111111]">Location:</span> {submittedData.location}
            </p>
          )}
          <div className="pt-2 border-t border-[#E5E5E0]">
            <span className="font-semibold text-[#111111] block mb-1">Message:</span>
            <p className="text-[#3D3D3D] whitespace-pre-wrap bg-white p-3 rounded-[4px] border border-[#E5E5E0]">
              {submittedData.message}
            </p>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
            Need an immediate response? Connect directly:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="h-12 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] text-[#111111] font-semibold text-sm flex items-center justify-center transition-colors active:scale-[0.99]"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 01711-269863
            </a>

            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 rounded-[6px] bg-[#111111] hover:bg-[#222222] text-white font-semibold text-sm flex items-center justify-center transition-colors active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 mr-2 text-[#FFC20E]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Send Another Message Button */}
        <div className="pt-4 border-t border-[#E5E5E0]">
          <button
            type="button"
            onClick={handleResetForm}
            className="inline-flex items-center text-sm font-semibold text-[#111111] hover:underline"
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Send another message
          </button>
        </div>
      </div>
    );
  }

  // STANDARD FORM VIEW
  return (
    <div
      id="contact-form"
      className="scroll-mt-24 bg-white border border-[#E5E5E0] rounded-[6px] p-6 lg:p-8 space-y-6"
    >
      <div>
        <h2
          id={headingId}
          className="font-heading font-bold text-[#111111] uppercase tracking-tight"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            lineHeight: 1.1,
          }}
        >
          Send a Message
        </h2>
        <div className="w-10 h-1 bg-[#FFC20E] mt-2" />
        <p className="mt-2 text-sm text-[#3D3D3D]">
          Fill out the form below. We will review your equipment inquiry and reply promptly.
        </p>
      </div>

      {/* Error Banner if submission failed */}
      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-[6px] text-sm text-[#991B1B] flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{submitError}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="font-bold underline hover:text-[#7F1D1D]"
              >
                Call {siteConfig.contact.phone}
              </a>
              <span>·</span>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-[#7F1D1D]"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        noValidate
        aria-labelledby={headingId}
        onSubmit={handleSubmit(onSubmit, onError)}
        className="space-y-5"
      >
        {/* Anti-spam Honeypot (visually hidden, off-screen, tabIndex -1) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="field-website">Leave this field blank</label>
          <input
            id="field-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {/* Full Name & Phone Number (Side by side on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="field-name"
              className="block text-sm font-semibold text-[#111111]"
            >
              Full name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="field-name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "error-name" : undefined}
              className={`w-full h-12 px-3.5 text-base rounded-[6px] border bg-white text-[#111111] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                errors.name
                  ? "border-[#DC2626] bg-[#FEF2F2]/40"
                  : "border-[#E5E5E0] hover:border-[#111111]"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p
                id="error-name"
                role="alert"
                className="text-xs font-semibold text-[#DC2626] mt-1"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="field-phone"
              className="block text-sm font-semibold text-[#111111]"
            >
              Phone number <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="field-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="e.g. 01711-269863"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "error-phone" : undefined}
              className={`w-full h-12 px-3.5 text-base rounded-[6px] border bg-white text-[#111111] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                errors.phone
                  ? "border-[#DC2626] bg-[#FEF2F2]/40"
                  : "border-[#E5E5E0] hover:border-[#111111]"
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <p
                id="error-phone"
                role="alert"
                className="text-xs font-semibold text-[#DC2626] mt-1"
              >
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Address (Optional) */}
        <div className="space-y-1.5">
          <label
            htmlFor="field-email"
            className="block text-sm font-semibold text-[#111111]"
          >
            Email address{" "}
            <span className="text-xs font-normal text-[#6B6B6B]">
              (optional, for automatic email confirmation)
            </span>
          </label>
          <input
            id="field-email"
            type="email"
            autoComplete="email"
            placeholder="name@msmirsulaimantradecenter.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={`w-full h-12 px-3.5 text-base rounded-[6px] border bg-white text-[#111111] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] ${
              errors.email
                ? "border-[#DC2626] bg-[#FEF2F2]/40"
                : "border-[#E5E5E0] hover:border-[#111111]"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="error-email"
              role="alert"
              className="text-xs font-semibold text-[#DC2626] mt-1"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Interested in & Product (Side by side on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* I am interested in */}
          <div className="space-y-1.5">
            <label
              htmlFor="field-interest"
              className="block text-sm font-semibold text-[#111111]"
            >
              I am interested in <span className="text-[#DC2626]">*</span>
            </label>
            <select
              id="field-interest"
              aria-required="true"
              aria-invalid={!!errors.interest}
              aria-describedby={errors.interest ? "error-interest" : undefined}
              className={`w-full h-12 px-3 text-base rounded-[6px] border bg-white text-[#111111] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                errors.interest
                  ? "border-[#DC2626] bg-[#FEF2F2]/40"
                  : "border-[#E5E5E0] hover:border-[#111111]"
              }`}
              {...register("interest")}
            >
              {interestOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.interest && (
              <p
                id="error-interest"
                role="alert"
                className="text-xs font-semibold text-[#DC2626] mt-1"
              >
                {errors.interest.message}
              </p>
            )}
          </div>

          {/* Product (Grouped by Category + Not sure yet) */}
          <div className="space-y-1.5">
            <label
              htmlFor="field-product"
              className="block text-sm font-semibold text-[#111111]"
            >
              Product / Machine{" "}
              <span className="text-xs font-normal text-[#6B6B6B]">
                (optional)
              </span>
            </label>
            <select
              id="field-product"
              className="w-full h-12 px-3 text-base rounded-[6px] border border-[#E5E5E0] bg-white text-[#111111] transition-colors hover:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
              {...register("product")}
            >
              <option value="">Not sure yet</option>
              {categories.map((cat) => {
                const categoryItems = allEquipment.filter(
                  (item) => item.category === cat.slug
                );
                if (categoryItems.length === 0) return null;

                return (
                  <optgroup key={cat.slug} label={cat.name}>
                    {categoryItems.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>
        </div>

        {/* Needed from & Job-site location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Needed from */}
          <div className="space-y-1.5">
            <label
              htmlFor="field-neededFrom"
              className="block text-sm font-semibold text-[#111111]"
            >
              Needed from{" "}
              <span className="text-xs font-normal text-[#6B6B6B]">
                (optional date)
              </span>
            </label>
            <input
              id="field-neededFrom"
              type="date"
              min={minDate}
              className="w-full h-12 px-3.5 text-base rounded-[6px] border border-[#E5E5E0] bg-white text-[#111111] transition-colors hover:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
              {...register("neededFrom")}
            />
          </div>

          {/* Job-site location */}
          <div className="space-y-1.5">
            <label
              htmlFor="field-location"
              className="block text-sm font-semibold text-[#111111]"
            >
              Job-site location{" "}
              <span className="text-xs font-normal text-[#6B6B6B]">
                (optional)
              </span>
            </label>
            <input
              id="field-location"
              type="text"
              autoComplete="address-level2"
              placeholder="Area or city, e.g. Pabna Sadar"
              className="w-full h-12 px-3.5 text-base rounded-[6px] border border-[#E5E5E0] bg-white text-[#111111] transition-colors hover:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
              {...register("location")}
            />
          </div>
        </div>

        {/* Message Field (Min 10, Max 1000 with live counter) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="field-message"
              className="block text-sm font-semibold text-[#111111]"
            >
              Message <span className="text-[#DC2626]">*</span>
            </label>
            <span
              className={`text-xs ${
                watchedMessage.length > 1000
                  ? "text-[#DC2626] font-bold"
                  : watchedMessage.length < 10 && watchedMessage.length > 0
                  ? "text-[#DC2626]"
                  : "text-[#6B6B6B]"
              }`}
              aria-live="polite"
            >
              {watchedMessage.length} / 1000 characters
            </span>
          </div>
          <textarea
            id="field-message"
            rows={4}
            placeholder="Tell us about your project, timeline, machine specifications, or requirements..."
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
            className={`w-full p-3.5 text-base rounded-[6px] border bg-white text-[#111111] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] ${
              errors.message
                ? "border-[#DC2626] bg-[#FEF2F2]/40"
                : "border-[#E5E5E0] hover:border-[#111111]"
            }`}
            {...register("message")}
          />
          {errors.message && (
            <p
              id="error-message"
              role="alert"
              className="text-xs font-semibold text-[#DC2626] mt-1"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-[#6B6B6B] leading-relaxed">
          We use your details only to reply to your enquiry.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          {/* Yellow Primary Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] disabled:bg-[#E5E5E0] disabled:text-[#6B6B6B] text-[#111111] font-bold text-base transition-all whitespace-nowrap active:scale-[0.99] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#111111]"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                <span>Send message</span>
              </>
            )}
          </button>

          {/* Secondary Send on WhatsApp Instead Button */}
          <a
            href={buildWhatsAppFallbackLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] active:bg-[#E5E5E0] text-[#111111] font-semibold text-sm sm:text-base flex items-center justify-center transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 mr-2 text-[#111111]" />
            Send on WhatsApp instead
          </a>
        </div>
      </form>
    </div>
  );
}
