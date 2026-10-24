import React from "react";
import Image from "next/image";
import { rentalRatesContent } from "@/data/rental-rates-content";

export function RatesServicesAndGuide() {
  return (
    <>
      {/* Services That Keep You Moving */}
      <section
        id="services"
        className="scroll-mt-28 bg-[#F7F7F5] border-b border-[#E5E5E0] py-12 md:py-[72px] lg:py-24"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="font-heading font-bold text-[#111111] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight uppercase">
                  {rentalRatesContent.services.heading}
                </h2>
                <div className="w-12 h-1 bg-[#FFC20E] mt-4" aria-hidden="true" />
              </div>

              <ul className="space-y-4 pt-2">
                {rentalRatesContent.services.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full bg-[#FFC20E] mt-2 mr-3 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-base leading-[1.6] text-[#3D3D3D]">
                      <strong className="text-[#111111] font-semibold">
                        {b.lead}{" "}
                      </strong>
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 space-y-2">
              <div className="relative aspect-[3/2] w-full rounded-[6px] overflow-hidden border border-[#E5E5E0] bg-[#E5E5E0]">
                <Image
                  src={rentalRatesContent.services.imageSrc}
                  alt={rentalRatesContent.services.imageAlt}
                  width={1600}
                  height={1067}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs sm:text-sm text-[#6B6B6B] italic">
                {rentalRatesContent.services.photoCaption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Guide: Choosing the Right Machine */}
      <section
        id="guide"
        className="scroll-mt-28 bg-[#FFFFFF] border-b border-[#E5E5E0] py-12 md:py-[72px] lg:py-24"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="font-heading font-bold text-[#111111] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight uppercase">
                  {rentalRatesContent.quickGuide.heading}
                </h2>
                <div className="w-12 h-1 bg-[#FFC20E] mt-4" aria-hidden="true" />
              </div>

              <ul className="space-y-4 pt-2">
                {rentalRatesContent.quickGuide.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start">
                    <span
                      className="w-2 h-2 rounded-full bg-[#FFC20E] mt-2 mr-3 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-base leading-[1.6] text-[#3D3D3D]">
                      <strong className="text-[#111111] font-semibold">
                        {b.lead}{" "}
                      </strong>
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 space-y-2">
              <div className="relative aspect-[3/2] w-full rounded-[6px] overflow-hidden border border-[#E5E5E0] bg-[#E5E5E0]">
                <Image
                  src={rentalRatesContent.quickGuide.imageSrc}
                  alt={rentalRatesContent.quickGuide.imageAlt}
                  width={1600}
                  height={1067}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs sm:text-sm text-[#6B6B6B] italic">
                {rentalRatesContent.quickGuide.photoCaption}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
