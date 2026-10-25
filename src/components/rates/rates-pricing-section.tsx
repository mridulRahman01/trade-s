"use client";

import React, { useState, useMemo } from "react";
import {
  rentalRatesContent,
  PriceTableCategory,
  PriceRow,
} from "@/data/rental-rates-content";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { siteConfig } from "@/config/site";
import { toast } from "@/components/ui/toaster";
import { Search, Phone, ArrowUpRight } from "lucide-react";

export function RatesPricingSection() {
  const { openDrawer } = useQuoteDrawer();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    return [
      { id: "all", name: "All Categories" },
      ...rentalRatesContent.pricing.tables.map((t) => ({
        id: t.id,
        name: t.name,
      })),
    ];
  }, []);

  const filteredTables = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return rentalRatesContent.pricing.tables
      .map((cat: PriceTableCategory) => {
        // Category filter check
        if (selectedCategory !== "all" && cat.id !== selectedCategory) {
          return null;
        }

        // Row search filter
        const matchedRows = cat.rows.filter((row: PriceRow) => {
          if (!q) return true;
          return (
            row.equipment.toLowerCase().includes(q) ||
            row.sizeOption.toLowerCase().includes(q) ||
            row.notes.toLowerCase().includes(q) ||
            row.daily.toLowerCase().includes(q) ||
            row.weekly.toLowerCase().includes(q) ||
            row.monthly.toLowerCase().includes(q)
          );
        });

        if (matchedRows.length === 0) return null;

        return {
          ...cat,
          rows: matchedRows,
        };
      })
      .filter(Boolean) as PriceTableCategory[];
  }, [searchQuery, selectedCategory]);

  const handleGetQuote = (row: PriceRow) => {
    const sizeDisplay = row.sizeOption !== "—" ? ` (${row.sizeOption})` : "";
    const name = `${row.equipment}${sizeDisplay}`;
    openDrawer({
      machineName: name,
      initialMessage: `I am interested in renting the ${name}. Please provide availability and rate details.`,
    });
    toast.info("Quote Proposal Drawer Opened", {
      description: `Rate proposal inquiry ready for ${name}.`,
    });
  };

  const totalMatchingRows = filteredTables.reduce(
    (acc, t) => acc + t.rows.length,
    0
  );

  return (
    <section
      id="pricing"
      className="scroll-mt-28 bg-[#FFFFFF] border-b border-[#E5E5E0] py-12 md:py-[72px] lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-[65ch] mb-8">
          <h2 className="font-heading font-bold text-[#111111] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight uppercase">
            {rentalRatesContent.pricing.heading}
          </h2>
          <div className="w-12 h-1 bg-[#FFC20E] mt-4 mb-6" aria-hidden="true" />
        </div>

        {/* Text Before Tables in Bordered Callout */}
        <div className="p-4 sm:p-6 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] mb-8 text-[#3D3D3D] text-sm sm:text-base leading-relaxed">
          {rentalRatesContent.pricing.textBefore}
        </div>

        {/* Sticky Controls within Section on Desktop */}
        <div className="md:sticky md:top-28 z-20 bg-white/95 backdrop-blur-none border border-[#E5E5E0] p-4 rounded-[6px] mb-8 shadow-sm space-y-4">
          {/* Search Box */}
          <div className="relative">
            <label htmlFor="rates-search" className="sr-only">
              Search equipment
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6B6B]">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="rates-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment, e.g. excavator, generator"
              className="w-full h-12 pl-11 pr-4 text-base text-[#111111] bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#FFC20E] placeholder:text-[#6B6B6B]"
            />
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter equipment by category"
            className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`h-10 px-4 rounded-[4px] text-xs sm:text-sm font-semibold transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                    isSelected
                      ? "bg-[#FFC20E] text-[#111111] font-bold"
                      : "bg-[#F7F7F5] text-[#3D3D3D] hover:bg-[#EBEBE6] hover:text-[#111111]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State when no matches */}
        {totalMatchingRows === 0 && (
          <div className="p-8 text-center bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] my-8 space-y-4">
            <p className="text-base sm:text-lg font-medium text-[#111111]">
              No equipment found. Call us on {siteConfig.contact.phone}.
            </p>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center justify-center h-12 px-6 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call {siteConfig.contact.phone}
            </a>
          </div>
        )}

        {/* 6 Price Tables */}
        <div className="space-y-12">
          {filteredTables.map((table: PriceTableCategory) => (
            <div key={table.id} className="space-y-4">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#111111] uppercase tracking-wide">
                {table.name}
              </h3>

              {/* Desktop / Tablet Real HTML Table (>= 768px) */}
              <div className="hidden md:block overflow-x-auto border border-[#E5E5E0] rounded-[6px]">
                <table className="w-full text-left border-collapse text-sm">
                  <caption className="sr-only">
                    {table.name} rental price rates in BDT
                  </caption>
                  <thead>
                    <tr className="bg-[#F7F7F5] border-b border-[#E5E5E0] text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      <th scope="col" className="py-3.5 px-4 font-bold">
                        Equipment
                      </th>
                      <th scope="col" className="py-3.5 px-4 font-bold">
                        {table.secondColHeader}
                      </th>
                      <th scope="col" className="py-3.5 px-4 font-bold text-right">
                        Daily (BDT)
                      </th>
                      <th scope="col" className="py-3.5 px-4 font-bold text-right">
                        Weekly (BDT)
                      </th>
                      <th scope="col" className="py-3.5 px-4 font-bold text-right">
                        Monthly (BDT)
                      </th>
                      <th scope="col" className="py-3.5 px-4 font-bold">
                        Notes
                      </th>
                      <th scope="col" className="py-3.5 px-4 font-bold text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E0]">
                    {table.rows.map((row: PriceRow, idx: number) => (
                      <tr
                        key={`${table.id}-${idx}-${row.equipment}-${row.sizeOption}`}
                        className="even:bg-[#F7F7F5] odd:bg-white hover:bg-[#FFC20E]/10 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-semibold text-[#111111] whitespace-nowrap">
                          {row.equipment}
                        </td>
                        <td className="py-3.5 px-4 text-[#3D3D3D] whitespace-nowrap">
                          {row.sizeOption}
                        </td>
                        <td className="py-3.5 px-4 text-right font-medium text-[#111111] [font-variant-numeric:tabular-nums] whitespace-nowrap">
                          {row.daily}
                        </td>
                        <td className="py-3.5 px-4 text-right font-medium text-[#111111] [font-variant-numeric:tabular-nums] whitespace-nowrap">
                          {row.weekly}
                        </td>
                        <td className="py-3.5 px-4 text-right font-medium text-[#111111] [font-variant-numeric:tabular-nums] whitespace-nowrap">
                          {row.monthly}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#6B6B6B]">
                          {row.notes}
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleGetQuote(row)}
                            className="min-h-[44px] min-w-[44px] px-3 py-2 text-xs font-bold text-[#111111] bg-[#FFC20E] hover:bg-[#E6AC00] rounded-[4px] inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111]"
                            aria-label={`Get quote for ${row.equipment} ${row.sizeOption}`}
                          >
                            Get quote
                            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Block View (< 768px) */}
              <div className="md:hidden space-y-3">
                {table.rows.map((row: PriceRow, idx: number) => (
                  <div
                    key={`mobile-${table.id}-${idx}-${row.equipment}-${row.sizeOption}`}
                    data-mobile-price-card
                    className="p-4 bg-white border border-[#E5E5E0] rounded-[6px] space-y-3 shadow-sm"
                  >
                    <div className="border-b border-[#E5E5E0] pb-2">
                      <h4 className="font-heading font-bold text-lg text-[#111111]">
                        {row.equipment}
                      </h4>
                      {row.sizeOption !== "—" && (
                        <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mt-0.5">
                          {table.secondColHeader}: {row.sizeOption}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 text-sm [font-variant-numeric:tabular-nums]">
                      <div className="flex justify-between">
                        <span className="text-[#6B6B6B]">Daily (BDT):</span>
                        <span className="font-semibold text-[#111111]">
                          {row.daily}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6B6B]">Weekly (BDT):</span>
                        <span className="font-semibold text-[#111111]">
                          {row.weekly}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6B6B]">Monthly (BDT):</span>
                        <span className="font-semibold text-[#111111]">
                          {row.monthly}
                        </span>
                      </div>
                    </div>

                    {row.notes && (
                      <p className="text-xs text-[#6B6B6B] italic pt-1 border-t border-[#E5E5E0]">
                        Note: {row.notes}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => handleGetQuote(row)}
                      className="w-full h-11 px-4 text-sm font-bold text-[#111111] bg-[#FFC20E] hover:bg-[#E6AC00] rounded-[4px] flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      aria-label={`Get quote for ${row.equipment} ${row.sizeOption}`}
                    >
                      Get quote
                      <ArrowUpRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note Callout Shown After Tables */}
        <div className="mt-12 p-4 sm:p-6 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] text-[#3D3D3D] text-sm sm:text-base leading-relaxed">
          <p className="font-semibold text-[#111111] mb-1">Note:</p>
          <p>{rentalRatesContent.pricing.textAfter}</p>
        </div>
      </div>
    </section>
  );
}
