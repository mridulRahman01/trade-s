"use client";

import React from "react";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { Phone, MessageCircle } from "lucide-react";

interface ProductDetailActionsProps {
  productName: string;
  productSlug: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
}

export function ProductDetailActions({
  productName,
  productSlug,
  phone,
  phoneRaw,
  whatsappUrl,
}: ProductDetailActionsProps) {
  const { openDrawer } = useQuoteDrawer();

  return (
    <div className="space-y-3 pt-2">
      {/* Large Request a Quote Button */}
      <button
        type="button"
        onClick={() =>
          openDrawer({ machineName: productName, machineSlug: productSlug })
        }
        className="w-full h-12 px-6 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-base flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#111111]"
      >
        Request a Quote for this Machine
      </button>

      {/* Direct Call & WhatsApp row */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`tel:${phoneRaw}`}
          className="h-12 px-4 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] text-[#111111] font-semibold text-sm flex items-center justify-center transition-colors whitespace-nowrap"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call {phone}
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-4 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] text-[#111111] font-semibold text-sm flex items-center justify-center transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
