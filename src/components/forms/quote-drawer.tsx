"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { siteConfig } from "@/config/site";
import { allEquipment } from "@/data/equipment";
import { X, CheckCircle2, Phone, AlertCircle, Loader2 } from "lucide-react";

interface DrawerContentProps {
  initialMachine: string;
  initialMessage?: string;
  onClose: () => void;
}

function QuoteDrawerContent({ initialMachine, initialMessage = "", onClose }: DrawerContentProps) {
  const [machine, setMachine] = useState(initialMachine);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [jobSiteCity, setJobSiteCity] = useState("");
  const [notes, setNotes] = useState(initialMessage);
  const [honeypot, setHoneypot] = useState("");
  const [loadTime] = useState(() => Date.now());

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus management on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const firstInput = drawerRef.current?.querySelector<HTMLElement>(
        "input:not([type=hidden]), select"
      );
      firstInput?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Please enter your name (minimum 2 characters)";
    }
    if (!phone.trim() || phone.trim().length < 7) {
      errs.phone = "Please enter a valid phone number (minimum 7 digits)";
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setServerError(null);

    startTransition(async () => {
      try {
        const payload = {
          type: "quote",
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          machineName: machine || "General Fleet Inquiry",
          startDate: startDate || undefined,
          jobSiteCity: jobSiteCity.trim() || undefined,
          notes: notes.trim() || undefined,
          website: honeypot, // Honeypot must be empty
          _time: loadTime,
        };

        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
          setServerError(
            result.error || "Unable to send your request. Please call or WhatsApp us directly."
          );
        } else {
          setIsSuccess(true);
        }
      } catch {
        setServerError(
          "Connection issue. Please call or WhatsApp our dispatch desk directly."
        );
      }
    });
  };

  return (
    <div
      ref={drawerRef}
      className="relative z-10 w-full md:max-w-[480px] bg-white h-full max-h-[100dvh] flex flex-col shadow-2xl border-l border-[#E5E5E0] overflow-hidden"
    >
      {/* Sticky Header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-[#E5E5E0] bg-white shrink-0">
        <h2
          id="quote-drawer-title"
          className="text-xl font-bold font-heading text-[#111111] uppercase tracking-wide"
        >
          Request a Quote
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quote drawer"
          className="w-11 h-11 flex items-center justify-center rounded-[6px] text-[#111111] hover:bg-[#F7F7F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC20E]"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {isSuccess ? (
          <div className="space-y-6 py-8">
            <div className="w-14 h-14 bg-[#FFC20E]/20 text-[#111111] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#111111]" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold font-heading text-[#111111]">
                Request Received
              </h3>
              <p className="text-[#3D3D3D] text-sm leading-relaxed">
                Thank you, <strong>{name}</strong>. Our machinery coordinator is reviewing availability for <strong>{machine || "your project"}</strong>.
              </p>
              <p className="text-xs text-[#6B6B6B]">
                Operating hours: {siteConfig.operatingHours.display}
              </p>
            </div>

            <div className="border border-[#E5E5E0] bg-[#F7F7F5] rounded-[6px] p-4 text-center space-y-3">
              <p className="text-xs text-[#6B6B6B] uppercase font-semibold tracking-wider">
                For Immediate Field Dispatch Call Or WhatsApp
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-[6px] bg-[#111111] text-white font-semibold text-sm hover:bg-[#3D3D3D] transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-6 rounded-[6px] bg-[#FFC20E] text-[#111111] font-semibold text-sm hover:bg-[#E6AC00] transition-colors whitespace-nowrap"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 rounded-[6px] border border-[#111111] text-[#111111] font-semibold text-base hover:bg-[#F7F7F5] transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form id="quote-drawer-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Server Error Alert */}
            {serverError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-[6px] flex items-start space-x-3 text-red-900 text-sm">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Unable to submit quote</p>
                  <p className="text-xs mt-1">{serverError}</p>
                </div>
              </div>
            )}

            {/* Honeypot field (hidden) */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="quote-drawer-website">Website</label>
              <input
                id="quote-drawer-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Equipment Field */}
            <div className="space-y-1">
              <label
                htmlFor="quote-drawer-machine"
                className="block text-sm font-semibold text-[#111111]"
              >
                Equipment Model
              </label>
              <select
                id="quote-drawer-machine"
                value={machine}
                onChange={(e) => setMachine(e.target.value)}
                className="w-full h-12 px-3 text-base text-[#111111] bg-white border border-[#E5E5E0] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#FFC20E]"
              >
                <option value="">Select a Machine (or General Inquiry)</option>
                {allEquipment.map((eq) => (
                  <option key={eq.slug} value={eq.name}>
                    {eq.name} ({eq.brand})
                  </option>
                ))}
              </select>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label
                htmlFor="quote-drawer-name"
                className="block text-sm font-semibold text-[#111111]"
              >
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-drawer-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tariq Ahmed"
                className={`w-full h-12 px-3 text-base text-[#111111] bg-white border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#FFC20E] ${
                  errors.name ? "border-red-500" : "border-[#E5E5E0]"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label
                htmlFor="quote-drawer-phone"
                className="block text-sm font-semibold text-[#111111]"
              >
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-drawer-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 01711-XXXXXX"
                className={`w-full h-12 px-3 text-base text-[#111111] bg-white border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#FFC20E] ${
                  errors.phone ? "border-red-500" : "border-[#E5E5E0]"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="quote-drawer-email"
                className="block text-sm font-semibold text-[#111111]"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-drawer-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full h-12 px-3 text-base text-[#111111] bg-white border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#FFC20E] ${
                  errors.email ? "border-red-500" : "border-[#E5E5E0]"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Job-Site City / Location */}
            <div className="space-y-1">
              <label
                htmlFor="quote-drawer-city"
                className="block text-sm font-semibold text-[#111111]"
              >
                Job-Site Location / City
              </label>
              <input
                id="quote-drawer-city"
                type="text"
                value={jobSiteCity}
                onChange={(e) => setJobSiteCity(e.target.value)}
                placeholder="e.g. Pabna, Ishwardi, Kushtia"
                className="w-full h-12 px-3 text-base text-[#111111] bg-white border border-[#E5E5E0] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#FFC20E]"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-1">
              <label
                htmlFor="quote-drawer-date"
                className="block text-sm font-semibold text-[#111111]"
              >
                Estimated Start Date
              </label>
              <input
                id="quote-drawer-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-12 px-3 text-base text-[#111111] bg-white border border-[#E5E5E0] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#FFC20E]"
              />
            </div>

            {/* Message / Project Scope */}
            <div className="space-y-1">
              <label
                htmlFor="quote-drawer-notes"
                className="block text-sm font-semibold text-[#111111]"
              >
                Project Details / Duration
              </label>
              <textarea
                id="quote-drawer-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Estimated project duration, ground conditions, or specific attachments required..."
                className="w-full p-3 text-base text-[#111111] bg-white border border-[#E5E5E0] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#FFC20E] resize-none"
              />
            </div>
          </form>
        )}
      </div>

      {/* Sticky Submit Button at Bottom */}
      {!isSuccess && (
        <div className="p-4 border-t border-[#E5E5E0] bg-white shrink-0">
          <button
            type="submit"
            form="quote-drawer-form"
            disabled={isPending}
            className="w-full h-12 px-6 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-base transition-colors flex items-center justify-center whitespace-nowrap active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#111111]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Submit Quote Request"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export function QuoteDrawer() {
  const { isOpen, closeDrawer, preselectedMachine, preselectedSlug, preselectedMessage } =
    useQuoteDrawer();
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const initialMachine =
    preselectedMachine ||
    (preselectedSlug
      ? allEquipment.find((e) => e.slug === preselectedSlug)?.name || ""
      : "");

  // Manage body scroll and restore focus
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previouslyFocusedElementRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDrawer]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-[#111111]/60 transition-opacity"
        aria-hidden="true"
      />

      {/* Keyed Drawer Content ensures clean mount & zero cascading renders */}
      <QuoteDrawerContent
        key={`${isOpen}-${preselectedMachine}-${preselectedSlug}-${preselectedMessage}`}
        initialMachine={initialMachine}
        initialMessage={preselectedMessage}
        onClose={closeDrawer}
      />
    </div>
  );
}
