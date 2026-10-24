"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { rentalRatesContent } from "@/data/rental-rates-content";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";

export function RatesContactBlock() {
  const { openDrawer } = useQuoteDrawer();

  return (
    <section
      id="contact"
      className="scroll-mt-28 bg-[#F7F7F5] border-b border-[#E5E5E0] py-12 md:py-[72px] lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[65ch] mb-8">
          <h2 className="font-heading font-bold text-[#111111] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight uppercase">
            {rentalRatesContent.contact.heading}
          </h2>
          <div className="w-12 h-1 bg-[#FFC20E] mt-4 mb-4" aria-hidden="true" />
          <p className="text-base text-[#3D3D3D]">
            {rentalRatesContent.contact.subheading}
          </p>
        </div>

        {/* 6 Touchpoint Rows: 56px min-height on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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

        {/* Action Buttons: Request a Quote + Call + WhatsApp */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="button"
            onClick={() => openDrawer()}
            className="w-full sm:w-auto h-12 px-8 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-base transition-colors flex items-center justify-center whitespace-nowrap active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#111111]"
          >
            Request a Quote
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="w-full sm:w-auto h-12 px-6 rounded-[6px] bg-white border border-[#111111] hover:bg-[#F7F7F5] text-[#111111] font-semibold text-base transition-colors flex items-center justify-center whitespace-nowrap active:scale-[0.98]"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call {siteConfig.contact.phone}
          </a>
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-6 rounded-[6px] bg-white border border-[#E5E5E0] hover:border-[#111111] text-[#111111] font-semibold text-base transition-colors flex items-center justify-center whitespace-nowrap active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
