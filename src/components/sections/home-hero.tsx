"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { siteConfig } from "@/config/site";

export function HomeHero() {
  const { openDrawer } = useQuoteDrawer();

  return (
    <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-[#111111] font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              Heavy equipment rental, delivered to your job site
            </h1>

            <p className="text-[#3D3D3D] text-base sm:text-lg leading-relaxed max-w-[65ch]">
              {siteConfig.deliveryNote}. Complete fleet of crawler excavators, wheeled excavators, and rock bulldozers maintained for dependable contractor performance.
            </p>

            {/* CTA Buttons: stacked full-width on mobile (12px gap), side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="#equipment"
                className="w-full sm:w-auto h-12 px-6 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] text-[#111111] font-semibold text-base flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98]"
              >
                View Equipment
              </Link>
              <button
                type="button"
                onClick={() => openDrawer()}
                className="w-full sm:w-auto h-12 px-6 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-base flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#111111]"
              >
                Request a Quote
              </button>
            </div>
          </div>

          {/* Machine Photo: 4:3 ratio, below buttons on mobile, no text/cards on top */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full aspect-[4/3] rounded-[6px] overflow-hidden border border-[#E5E5E0] bg-[#F7F7F5]">
              <Image
                src="/images/hero/hero-fleet.webp"
                alt="Construction machinery fleet including excavators and earthmoving equipment"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
