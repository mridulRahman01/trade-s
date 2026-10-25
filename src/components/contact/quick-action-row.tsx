"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Phone, MessageCircle, Mail, MapPin, Copy, Check } from "lucide-react";

export function QuickActionRow() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (
    textToCopy: string,
    key: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);

    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } catch {
        // Fallback below
      }
    }

    if (!success && typeof document !== "undefined") {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch {
        // Ignore fallback error
      }
    }
  };

  const actions = [
    {
      id: "phone",
      label: "Call Direct",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phoneRaw}`,
      icon: Phone,
      copyableValue: siteConfig.contact.phone,
      copyAriaLabel: "Copy phone number to clipboard",
    },
    {
      id: "whatsapp",
      label: "Chat on WhatsApp",
      value: "01711-269863",
      href: `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
        "Hello, I would like to ask about your equipment."
      )}`,
      icon: MessageCircle,
      isExternal: true,
      copyableValue: siteConfig.contact.phone,
      copyAriaLabel: "Copy WhatsApp number to clipboard",
    },
    {
      id: "email",
      label: "Email Inquiries",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: Mail,
      copyableValue: siteConfig.contact.email,
      copyAriaLabel: "Copy email address to clipboard",
    },
    {
      id: "visit",
      label: "Visit Our Yard",
      value: "Tabunia Bazaar, Pabna",
      href: siteConfig.map.directionsUrl,
      icon: MapPin,
      isExternal: true,
      copyableValue: siteConfig.address.formatted,
      copyAriaLabel: "Copy physical address to clipboard",
    },
  ];

  return (
    <section
      aria-label="Quick contact actions"
      className="bg-[#F7F7F5] py-8 border-b border-[#E5E5E0]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {actions.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedKey === item.id;

            return (
              <div
                key={item.id}
                className="group relative min-h-[72px] sm:min-h-[80px] p-3.5 sm:p-4 bg-white border border-[#E5E5E0] rounded-[6px] hover:border-[#111111] transition-all flex flex-col justify-between focus-within:ring-2 focus-within:ring-[#111111]"
              >
                {/* Header row: Icon link & Copy Button */}
                <div className="flex items-center justify-between w-full mb-1.5">
                  <a
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`${item.label}: ${item.value}`}
                    className="text-[#111111] hover:text-[#FFC20E] transition-colors focus:outline-none"
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </a>

                  <button
                    type="button"
                    onClick={(e) => handleCopy(item.copyableValue, item.id, e)}
                    aria-label={item.copyAriaLabel}
                    className="p-1 -mr-1 rounded-[4px] text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F7F7F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] flex items-center gap-1 text-xs"
                    title={isCopied ? "Copied!" : "Copy"}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold text-[#10B981]">
                          Copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" strokeWidth={2} />
                        <span className="text-[11px] text-[#6B6B6B]">
                          Copy
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Text Block link */}
                <a
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="w-full truncate block focus:outline-none"
                >
                  <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider truncate">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#111111] truncate block mt-0.5 group-hover:underline">
                    {item.value}
                  </span>
                </a>

                {/* Screen reader live notification */}
                <span className="sr-only" aria-live="polite">
                  {isCopied ? `${item.label} copied to clipboard` : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
