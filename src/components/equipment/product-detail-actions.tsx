"use client";

import React from "react";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { toast } from "@/components/ui/toaster";
import { Phone, MessageCircle, Share2 } from "lucide-react";

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

  const handleCall = () => {
    toast.info("Connecting to Dispatch Desk", {
      description: `Calling ${phone}...`,
    });
  };

  const handleWhatsApp = () => {
    toast.success("Opening WhatsApp Chat", {
      description: "Direct messaging M/S Mir Sulaiman Trade Center...",
    });
  };

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied to Clipboard!", {
          description: `Direct link for ${productName} is ready to share.`,
          action: {
            label: "WhatsApp Share",
            onClick: () =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(`Check out ${productName}: ${window.location.href}`)}`,
                "_blank"
              ),
          },
        });
      }
    } catch {
      toast.info("Share Equipment", {
        description: `Direct URL: ${window.location.href}`,
      });
    }
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Large Request a Quote Button */}
      <button
        type="button"
        onClick={() => {
          openDrawer({ machineName: productName, machineSlug: productSlug });
          toast.info("Quote Proposal Drawer Opened", {
            description: `Reviewing options for ${productName}`,
          });
        }}
        className="w-full h-12 px-6 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-base flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#111111]"
      >
        Request a Quote for this Machine
      </button>

      {/* Direct Call & WhatsApp row */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`tel:${phoneRaw}`}
          onClick={handleCall}
          className="h-12 px-4 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] text-[#111111] font-semibold text-sm flex items-center justify-center transition-colors whitespace-nowrap"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call {phone}
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="h-12 px-4 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] text-[#111111] font-semibold text-sm flex items-center justify-center transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </a>
      </div>

      {/* Interactive Share / Copy Link Button */}
      <button
        type="button"
        onClick={handleShare}
        className="w-full h-10 rounded-[6px] border border-[#E5E5E0] bg-[#F7F7F5] hover:bg-white hover:border-[#111111] text-[#6B6B6B] hover:text-[#111111] font-medium text-xs flex items-center justify-center transition-colors"
      >
        <Share2 className="w-3.5 h-3.5 mr-1.5" />
        Share or Copy Equipment Link
      </button>
    </div>
  );
}
