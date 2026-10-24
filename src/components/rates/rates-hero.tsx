"use client";

import React from "react";
import { rentalRatesContent } from "@/data/rental-rates-content";
import { useQuoteDrawer } from "@/context/quote-drawer-context";

export function RatesHero() {
  const { openDrawer } = useQuoteDrawer();

  return (
    <section
      id="top"
      className="scroll-mt-28 bg-white border-b border-[#E5E5E0] py-12 md:py-[72px] lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[65ch]">
          {/* Main Page H1 */}
          <h1 className="font-heading font-bold text-[#111111] text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight uppercase">
            {rentalRatesContent.meta.h1}
          </h1>

          <div className="w-12 h-1 bg-[#FFC20E] mt-4 mb-6" aria-hidden="true" />

          {/* Subheading */}
          <h2 className="font-heading font-bold text-[#111111] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight uppercase mb-4">
            {rentalRatesContent.hero.heading}
          </h2>

          {/* Hero Description */}
          <p className="text-[#3D3D3D] text-base leading-[1.6] mb-8">
            {rentalRatesContent.hero.text}
          </p>

          {/* Fast Quote CTA Button */}
          <button
            type="button"
            onClick={() => openDrawer()}
            className="h-12 px-8 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-base transition-colors whitespace-nowrap active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#111111]"
          >
            {rentalRatesContent.hero.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
