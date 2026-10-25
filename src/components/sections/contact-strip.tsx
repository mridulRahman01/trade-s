"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { toast } from "@/components/ui/toaster";
import { Phone, Mail, MapPin, Clock, MessageCircle, User, ArrowRight } from "lucide-react";

export function ContactStrip() {
  const { openDrawer } = useQuoteDrawer();

  return (
    <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#111111] tracking-tight">
            Direct Equipment Dispatch & Inquiries
          </h2>
          <div className="w-12 h-1 bg-[#FFC20E] mt-3" />
          <p className="mt-3 text-base text-[#3D3D3D] max-w-[65ch]">
            Speak directly with our machinery desk for availability, site delivery scheduling, and customized rental agreements.
          </p>
        </div>

        {/* Desktop Grid / Mobile 56px Stacked Tap Targets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Phone */}
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            onClick={() => {
              toast.info("Connecting to Dispatch Desk", {
                description: `Calling ${siteConfig.contact.phone}...`,
              });
            }}
            className="flex items-center min-h-[56px] p-4 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] hover:border-[#111111] active:bg-[#E5E5E0] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center shrink-0 mr-3 text-[#111111] group-hover:bg-[#FFC20E] transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                Call Direct
              </span>
              <span className="text-base font-bold text-[#111111] whitespace-nowrap">
                {siteConfig.contact.phone}
              </span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              toast.success("Opening WhatsApp Chat", {
                description: `Direct messaging ${siteConfig.contact.whatsapp}...`,
              });
            }}
            className="flex items-center min-h-[56px] p-4 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] hover:border-[#111111] active:bg-[#E5E5E0] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center shrink-0 mr-3 text-[#111111] group-hover:bg-[#FFC20E] transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                WhatsApp Chat
              </span>
              <span className="text-base font-bold text-[#111111] whitespace-nowrap">
                {siteConfig.contact.whatsapp}
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            onClick={() => {
              toast.info("Opening Email Client", {
                description: `Composing email to ${siteConfig.contact.email}...`,
              });
            }}
            className="flex items-center min-h-[56px] p-4 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] hover:border-[#111111] active:bg-[#E5E5E0] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center shrink-0 mr-3 text-[#111111] group-hover:bg-[#FFC20E] transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                Email Inquiries
              </span>
              <span className="text-sm font-bold text-[#111111] truncate block">
                {siteConfig.contact.email}
              </span>
            </div>
          </a>

          {/* Address */}
          <div className="flex items-center min-h-[56px] p-4 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px]">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center shrink-0 mr-3 text-[#111111]">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                Location
              </span>
              <span className="text-sm font-bold text-[#111111] block truncate">
                {siteConfig.address.formatted}
              </span>
            </div>
          </div>
        </div>

        {/* Business Meta: Hours, Proprietor, and Quote Action */}
        <div className="p-6 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center text-sm font-bold text-[#111111]">
              <User className="w-4 h-4 mr-2 text-[#6B6B6B]" />
              Proprietor: {siteConfig.proprietor}
            </div>
            <div className="flex items-center text-sm text-[#3D3D3D]">
              <Clock className="w-4 h-4 mr-2 text-[#6B6B6B]" />
              Operating Hours: {siteConfig.operatingHours.display}
            </div>
            <div className="text-xs text-[#6B6B6B]">
              {siteConfig.deliveryNote}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/contact"
              className="h-12 px-6 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] text-[#111111] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap active:scale-[0.98] flex items-center justify-center group"
            >
              <span>Full contact details and map</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => openDrawer()}
              className="h-12 px-8 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-base transition-colors whitespace-nowrap active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#111111]"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
