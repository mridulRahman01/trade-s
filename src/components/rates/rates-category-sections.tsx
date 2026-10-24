import React from "react";
import Image from "next/image";
import Link from "next/link";
import { rentalRatesContent, CategoryContentSection } from "@/data/rental-rates-content";
import { ArrowRight } from "lucide-react";

export function RatesCategorySections() {
  return (
    <>
      {rentalRatesContent.categories.map((cat: CategoryContentSection, idx: number) => {
        const isAlternate = idx % 2 === 1;

        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`scroll-mt-28 border-b border-[#E5E5E0] py-12 md:py-[72px] lg:py-24 ${
              isAlternate ? "bg-[#F7F7F5]" : "bg-white"
            }`}
          >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h2 className="font-heading font-bold text-[#111111] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight uppercase">
                      {cat.heading}
                    </h2>
                    <div className="w-12 h-1 bg-[#FFC20E] mt-4" aria-hidden="true" />
                  </div>

                  {/* Bullet list */}
                  <ul className="space-y-4 pt-2">
                    {cat.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start">
                        <span
                          className="w-2 h-2 rounded-full bg-[#FFC20E] mt-2 mr-3 shrink-0"
                          aria-hidden="true"
                        />
                        <p className="text-base leading-[1.6] text-[#3D3D3D]">
                          <strong className="text-[#111111] font-semibold">
                            {bullet.lead}{" "}
                          </strong>
                          {bullet.text}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Quick link to this category's pricing table */}
                  <div className="pt-2">
                    <Link
                      href={`/rental-rates#pricing`}
                      className="inline-flex items-center text-sm font-semibold text-[#111111] hover:text-[#6B6B6B] transition-colors"
                    >
                      View {cat.heading} Rates in Pricing Table
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>
                </div>

                {/* Photo Column */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="relative aspect-[3/2] w-full rounded-[6px] overflow-hidden border border-[#E5E5E0] bg-[#E5E5E0]">
                    <Image
                      src={cat.imageSrc}
                      alt={cat.imageAlt}
                      width={1600}
                      height={1067}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] italic">
                    {cat.photoCaption}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
