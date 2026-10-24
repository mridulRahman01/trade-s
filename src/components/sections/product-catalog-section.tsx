"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { allEquipment } from "@/data/equipment";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { Search } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Equipment" },
  { id: "excavators", label: "Excavators" },
  { id: "bulldozers", label: "Bulldozers" },
] as const;

export function ProductCatalogSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { openDrawer } = useQuoteDrawer();

  const filteredEquipment = useMemo(() => {
    return allEquipment.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.specs.some((s) => s.value.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="equipment" className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#111111] tracking-tight">
            Equipment Fleet
          </h2>
          {/* Thin yellow accent line under section title */}
          <div className="w-12 h-1 bg-[#FFC20E] mt-3" />
          <p className="mt-3 text-base text-[#3D3D3D] max-w-[65ch]">
            Browse our complete machinery inventory. Select any unit to view technical specifications or request an immediate rate proposal.
          </p>
        </div>

        {/* Filter Controls Row: Category Chips + Quiet Search Box */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Horizontally scrolling category chips on mobile with fade */}
          <div className="relative w-full sm:w-auto">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1 pr-6">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`h-11 px-5 rounded-[6px] text-sm font-semibold whitespace-nowrap transition-colors shrink-0 snap-start border ${
                      isActive
                        ? "bg-[#FFC20E] text-[#111111] border-[#FFC20E]"
                        : "bg-white text-[#3D3D3D] border-[#E5E5E0] hover:border-[#111111]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
            {/* Visual fade at right edge to indicate scrollability on mobile */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F7F7F5] to-transparent sm:hidden" />
          </div>

          {/* Visually Quiet Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model, brand..."
              className="w-full h-11 pl-9 pr-3 text-sm text-[#111111] bg-white border border-[#E5E5E0] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#FFC20E]"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredEquipment.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#E5E5E0] rounded-[6px]">
            <p className="text-base text-[#6B6B6B]">
              No machinery found matching your filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-sm font-semibold text-[#111111] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <div
                key={item.slug}
                data-testid="equipment-card"
                className="bg-white border border-[#E5E5E0] rounded-[6px] overflow-hidden flex flex-col justify-between hover:border-[#111111] transition-colors"
              >
                <div>
                  {/* Fixed 4:3 Image Container */}
                  <Link
                    href={`/equipment/${item.slug}`}
                    className="block relative aspect-[4/3] w-full bg-[#F7F7F5] overflow-hidden border-b border-[#E5E5E0]"
                  >
                    <Image
                      src={item.images[0]?.src || "/images/hero/hero-fleet.webp"}
                      alt={item.images[0]?.alt || item.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  {/* Text Block with 20px padding */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                      <span className="font-semibold uppercase tracking-wider">
                        {item.brand}
                      </span>
                      <span className="capitalize">{item.category}</span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-[#111111] leading-tight line-clamp-2">
                      <Link
                        href={`/equipment/${item.slug}`}
                        className="hover:text-[#6B6B6B] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </h3>

                    <p className="text-sm text-[#3D3D3D] line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Key Specs Preview */}
                    <div className="pt-2 border-t border-[#E5E5E0] grid grid-cols-2 gap-2 text-xs">
                      {item.specs.slice(0, 2).map((spec, idx) => (
                        <div key={idx} className="truncate">
                          <span className="text-[#6B6B6B] block truncate">{spec.label}</span>
                          <span className="font-semibold text-[#111111] truncate">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-1 text-xs font-semibold text-[#6B6B6B]">
                      Request a quote for current rates
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons pinned to bottom */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/equipment/${item.slug}`}
                    className="h-12 px-3 rounded-[6px] border border-[#E5E5E0] hover:border-[#111111] text-[#111111] text-xs font-semibold flex items-center justify-center transition-colors whitespace-nowrap"
                  >
                    View Specs
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      openDrawer({ machineName: item.name, machineSlug: item.slug })
                    }
                    className="h-12 px-3 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] text-xs font-semibold flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.98]"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
