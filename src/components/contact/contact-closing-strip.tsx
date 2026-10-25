import React from "react";
import Link from "next/link";
import { ArrowRight, Tag, HardHat } from "lucide-react";

export function ContactClosingStrip() {
  return (
    <section className="bg-white py-12 md:py-16 border-b border-[#E5E5E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2
              className="font-heading font-bold text-[#111111] uppercase tracking-tight"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: 1.1,
              }}
            >
              Need a price?
            </h2>
            <div className="w-10 h-1 bg-[#FFC20E]" />
            <p className="text-sm sm:text-base text-[#3D3D3D] max-w-[55ch]">
              View transparent daily, weekly, and monthly rates across our entire Pabna machinery inventory, or inspect full equipment specs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/rental-rates"
              className="h-12 px-6 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] active:scale-[0.98] text-[#111111] font-bold text-sm sm:text-base flex items-center justify-center transition-colors whitespace-nowrap shadow-xs"
            >
              <Tag className="w-4 h-4 mr-2" />
              <span>View Rental Rates</span>
            </Link>

            <Link
              href="/#equipment"
              className="h-12 px-6 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] active:scale-[0.98] text-[#111111] font-semibold text-sm sm:text-base flex items-center justify-center transition-colors whitespace-nowrap group"
            >
              <HardHat className="w-4 h-4 mr-2" />
              <span>Browse Equipment</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
