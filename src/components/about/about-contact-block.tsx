"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { Phone, MessageCircle, Mail, MapPin, Clock, User } from "lucide-react";
import { aboutContent } from "@/data/about-content";

export function AboutContactBlock() {
  const { openDrawer } = useQuoteDrawer();

  return (
    <div className="space-y-6">
      <p className="text-base sm:text-lg text-[#3D3D3D]">
        {aboutContent.contact.sentence}
      </p>

      {/* Contact Items - each row 56px minimum tap target on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-3xl">
        {/* Call */}
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="min-h-[56px] px-4 py-3 bg-white border border-[#E5E5E0] rounded-[6px] flex items-center hover:border-[#111111] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-[#F7F7F5] group-hover:bg-[#FFC20E] flex items-center justify-center shrink-0 mr-3.5 transition-colors">
            <Phone className="w-5 h-5 text-[#111111]" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
              Call Direct
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#111111] whitespace-nowrap">
              {siteConfig.contact.phone}
            </span>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[56px] px-4 py-3 bg-white border border-[#E5E5E0] rounded-[6px] flex items-center hover:border-[#111111] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-[#F7F7F5] group-hover:bg-[#FFC20E] flex items-center justify-center shrink-0 mr-3.5 transition-colors">
            <MessageCircle className="w-5 h-5 text-[#111111]" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
              WhatsApp
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#111111] whitespace-nowrap">
              {siteConfig.contact.whatsapp}
            </span>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="min-h-[56px] px-4 py-3 bg-white border border-[#E5E5E0] rounded-[6px] flex items-center hover:border-[#111111] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-[#F7F7F5] group-hover:bg-[#FFC20E] flex items-center justify-center shrink-0 mr-3.5 transition-colors">
            <Mail className="w-5 h-5 text-[#111111]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
              Email
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#111111] truncate block">
              {siteConfig.contact.email}
            </span>
          </div>
        </a>

        {/* Address */}
        <div className="min-h-[56px] px-4 py-3 bg-white border border-[#E5E5E0] rounded-[6px] flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center shrink-0 mr-3.5">
            <MapPin className="w-5 h-5 text-[#111111]" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
              Address
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#111111]">
              {siteConfig.address.formatted}
            </span>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="min-h-[56px] px-4 py-3 bg-white border border-[#E5E5E0] rounded-[6px] flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center shrink-0 mr-3.5">
            <Clock className="w-5 h-5 text-[#111111]" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
              Hours
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#111111]">
              {siteConfig.operatingHours.display}
            </span>
          </div>
        </div>

        {/* Proprietor */}
        <div className="min-h-[56px] px-4 py-3 bg-white border border-[#E5E5E0] rounded-[6px] flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center shrink-0 mr-3.5">
            <User className="w-5 h-5 text-[#111111]" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
              Proprietor
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#111111]">
              {siteConfig.proprietor}
            </span>
          </div>
        </div>
      </div>

      {/* Yellow Request a Quote Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => openDrawer()}
          className="w-full sm:w-auto h-12 px-8 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-base flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#111111]"
        >
          Request a Quote
        </button>
      </div>
    </div>
  );
}
