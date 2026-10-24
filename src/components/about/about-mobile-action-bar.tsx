"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { Phone, MessageCircle } from "lucide-react";

export function AboutMobileActionBar() {
  const { openDrawer } = useQuoteDrawer();

  return (
    <div
      data-testid="about-mobile-action-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E5E0] shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden pb-[env(safe-area-inset-bottom)]"
    >
      <div className="h-14 px-4 flex items-center justify-between gap-2 max-w-lg mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          aria-label={`Call ${siteConfig.contact.phone}`}
          className="flex-1 h-11 rounded-[6px] border border-[#E5E5E0] bg-[#F7F7F5] active:bg-[#E5E5E0] text-[#111111] flex items-center justify-center font-semibold text-xs transition-colors"
        >
          <Phone className="w-4 h-4 mr-1 text-[#111111]" />
          Call
        </a>

        {/* WhatsApp Button */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex-1 h-11 rounded-[6px] border border-[#E5E5E0] bg-[#F7F7F5] active:bg-[#E5E5E0] text-[#111111] flex items-center justify-center font-semibold text-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-1 text-[#111111]" />
          WhatsApp
        </a>

        {/* Request a Quote Button (half width, yellow) */}
        <button
          type="button"
          onClick={() => openDrawer()}
          className="w-1/2 h-11 rounded-[6px] bg-[#FFC20E] active:bg-[#E6AC00] text-[#111111] font-semibold text-xs flex items-center justify-center transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#111111]"
        >
          Request a Quote
        </button>
      </div>
    </div>
  );
}
