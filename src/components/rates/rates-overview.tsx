import React from "react";
import Image from "next/image";
import { rentalRatesContent } from "@/data/rental-rates-content";

export function RatesOverview() {
  return (
    <section
      id="overview"
      className="scroll-mt-28 bg-[#F7F7F5] border-b border-[#E5E5E0] py-12 md:py-[72px] lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-heading font-bold text-[#111111] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight uppercase">
              {rentalRatesContent.overview.heading}
            </h2>
            <div className="w-12 h-1 bg-[#FFC20E] my-4" aria-hidden="true" />
            <p className="text-[#3D3D3D] text-base leading-[1.6] max-w-[65ch]">
              {rentalRatesContent.overview.text}
            </p>
          </div>

          {/* Photo */}
          <div className="lg:col-span-5 space-y-2">
            <div className="relative aspect-[3/2] w-full rounded-[6px] overflow-hidden border border-[#E5E5E0] bg-[#E5E5E0]">
              <Image
                src={rentalRatesContent.overview.imageSrc}
                alt={rentalRatesContent.overview.imageAlt}
                width={1600}
                height={1067}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#6B6B6B] italic">
              {rentalRatesContent.overview.photoCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
