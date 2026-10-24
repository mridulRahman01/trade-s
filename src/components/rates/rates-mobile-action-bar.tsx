"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { Phone, MessageCircle } from "lucide-react";

export function RatesMobileActionBar() {
  const { openDrawer } = useQuoteDrawer();

  return (
    <aside
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E5E5E0] shadow-[0_-2px_10px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="h-14 px-3 flex items-center justify-between gap-2 max-w-[1200px] mx-auto">
        {/* Direct Call Button (1/4 width) */}
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          aria-label={`Call ${siteConfig.contact.phone}`}
          className="flex-1 h-11 px-2 rounded-[6px] border border-[#E5E5E0] bg-[#F7F7F5] hover:bg-[#EBEBE6] text-[#111111] font-semibold text-xs flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98]"
        >
          <Phone className="w-4 h-4 mr-1 text-[#111111]" />
          Call
        </a>

        {/* WhatsApp Button (1/4 width) */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex-1 h-11 px-2 rounded-[6px] border border-[#E5E5E0] bg-[#F7F7F5] hover:bg-[#EBEBE6] text-[#111111] font-semibold text-xs flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4 mr-1 text-[#111111]" />
          WhatsApp
        </a>

        {/* Request a Quote Button (1/2 width) */}
        <button
          type="button"
          onClick={() => openDrawer()}
          className="flex-[2] h-11 px-3 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-bold text-xs sm:text-sm flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98] shadow-sm"
        >
          Request a Quote
        </button>
      </div>
    </aside>
  );
}
