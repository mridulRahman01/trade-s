"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { useDhakaBusinessStatus } from "@/lib/business-hours";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  User,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

export function ContactDetailsBlock() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const status = useDhakaBusinessStatus();
  const currentDhakaDay = status?.dhakaDay || "Sat";

  const handleCopy = async (text: string, key: string) => {
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);

    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch {
        // Fallback
      }
    }

    if (!success && typeof document !== "undefined") {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch {
        // Ignore fallback error
      }
    }
  };

  const scheduleRows = [
    { key: "Sat", day: "Saturday", hours: "11:00 AM – 11:00 PM" },
    { key: "Sun", day: "Sunday", hours: "11:00 AM – 11:00 PM" },
    { key: "Mon", day: "Monday", hours: "11:00 AM – 11:00 PM" },
    { key: "Tue", day: "Tuesday", hours: "11:00 AM – 11:00 PM" },
    { key: "Wed", day: "Wednesday", hours: "11:00 AM – 11:00 PM" },
    { key: "Thu", day: "Thursday", hours: "11:00 AM – 11:00 PM" },
    { key: "Fri", day: "Friday", hours: "Closed (Weekly Holiday)", isClosed: true },
  ];

  return (
    <div className="space-y-8">
      {/* Visit or Call Block */}
      <div className="bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] p-6 lg:p-8 space-y-6">
        <div>
          <h2
            className="font-heading font-bold text-[#111111] uppercase tracking-tight"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.1,
            }}
          >
            Visit or Call
          </h2>
          <div className="w-10 h-1 bg-[#FFC20E] mt-2" />
          <p className="mt-2 text-sm text-[#3D3D3D] leading-relaxed">
            Our physical machinery staging yard and dispatch office are located directly at Tabunia Bazaar.
          </p>
        </div>

        {/* Business Entity & Proprietor */}
        <div className="pt-2 border-t border-[#E5E5E0] space-y-1.5">
          <p className="text-base font-bold text-[#111111]">{siteConfig.name}</p>
          <div className="flex items-center text-sm font-semibold text-[#111111]">
            <User className="w-4 h-4 mr-2 text-[#6B6B6B] shrink-0" />
            <span>Proprietor: {siteConfig.proprietor}</span>
          </div>
        </div>

        {/* Physical Address */}
        <div className="pt-2 border-t border-[#E5E5E0] space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start text-sm text-[#3D3D3D]">
              <MapPin className="w-4 h-4 mr-2 text-[#6B6B6B] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#111111] block">Address:</span>
                <span>{siteConfig.address.formatted}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(siteConfig.address.formatted, "address")}
              aria-label="Copy address to clipboard"
              className="p-1 rounded text-[#6B6B6B] hover:text-[#111111] hover:bg-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] shrink-0 flex items-center gap-1 text-xs"
            >
              {copiedKey === "address" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2.5} />
                  <span className="text-[11px] font-semibold text-[#10B981]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-[#6B6B6B]">Copy</span>
                </>
              )}
            </button>
          </div>

          <a
            href={siteConfig.map.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-semibold text-[#111111] hover:underline pt-1"
          >
            <span>Get directions to Tabunia yard</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Direct Phone */}
        <div className="pt-2 border-t border-[#E5E5E0] space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Phone className="w-4 h-4 mr-2 text-[#6B6B6B] shrink-0" />
              <span className="font-semibold text-[#111111] mr-1.5">Phone:</span>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="font-bold text-[#111111] hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(siteConfig.contact.phone, "phone")}
              aria-label="Copy phone number to clipboard"
              className="p-1 rounded text-[#6B6B6B] hover:text-[#111111] hover:bg-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] shrink-0 flex items-center gap-1 text-xs"
            >
              {copiedKey === "phone" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2.5} />
                  <span className="text-[11px] font-semibold text-[#10B981]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-[#6B6B6B]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="pt-2 border-t border-[#E5E5E0] space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <MessageCircle className="w-4 h-4 mr-2 text-[#6B6B6B] shrink-0" />
              <span className="font-semibold text-[#111111] mr-1.5">WhatsApp:</span>
              <a
                href={`${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
                  "Hello, I would like to ask about your equipment."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#111111] hover:underline"
              >
                01711-269863
              </a>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(siteConfig.contact.phone, "whatsapp")}
              aria-label="Copy WhatsApp number to clipboard"
              className="p-1 rounded text-[#6B6B6B] hover:text-[#111111] hover:bg-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] shrink-0 flex items-center gap-1 text-xs"
            >
              {copiedKey === "whatsapp" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2.5} />
                  <span className="text-[11px] font-semibold text-[#10B981]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-[#6B6B6B]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="pt-2 border-t border-[#E5E5E0] space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm truncate mr-2">
              <Mail className="w-4 h-4 mr-2 text-[#6B6B6B] shrink-0" />
              <span className="font-semibold text-[#111111] mr-1.5 shrink-0">Email:</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-[#111111] hover:underline truncate"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(siteConfig.contact.email, "email")}
              aria-label="Copy email address to clipboard"
              className="p-1 rounded text-[#6B6B6B] hover:text-[#111111] hover:bg-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] shrink-0 flex items-center gap-1 text-xs"
            >
              {copiedKey === "email" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2.5} />
                  <span className="text-[11px] font-semibold text-[#10B981]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-[#6B6B6B]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Operating Hours Table */}
      <div className="bg-white border border-[#E5E5E0] rounded-[6px] p-6 lg:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-base font-bold text-[#111111]">
            <Clock className="w-5 h-5 mr-2 text-[#111111]" />
            <span>Operating Hours</span>
          </div>
          <span className="text-xs text-[#6B6B6B] font-medium">Asia/Dhaka (BST)</span>
        </div>

        <p className="text-xs text-[#6B6B6B]">
          Today&apos;s schedule is highlighted below based on Bangladesh local time.
        </p>

        <div className="border border-[#E5E5E0] rounded-[4px] overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F7F7F5] border-b border-[#E5E5E0] text-[#111111] font-semibold">
                <th scope="col" className="py-2.5 px-3">Day</th>
                <th scope="col" className="py-2.5 px-3 text-right">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E0]">
              {scheduleRows.map((row) => {
                const isToday = currentDhakaDay === row.key;

                return (
                  <tr
                    key={row.key}
                    className={`transition-colors ${
                      isToday
                        ? "bg-[#FFFBEB] font-bold text-[#111111] border-l-4 border-l-[#FFC20E]"
                        : "text-[#3D3D3D] hover:bg-[#F7F7F5]"
                    }`}
                  >
                    <td className="py-2.5 px-3 flex items-center gap-1.5">
                      <span>{row.day}</span>
                      {isToday && (
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-[#FFC20E] text-[#111111] px-1.5 py-0.5 rounded-[3px]">
                          Today
                        </span>
                      )}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right whitespace-nowrap ${
                        row.isClosed ? "text-[#6B6B6B] font-semibold" : ""
                      }`}
                    >
                      {row.hours}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
