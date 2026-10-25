"use client";

import React, { useState, useRef, useCallback, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { siteConfig } from "@/config/site";
import {
  HeroNeedId,
  ResolvedHeroNeed,
  heroNeedsConfig,
  getAllResolvedHeroNeeds,
} from "@/config/hero-finder";
import { Phone } from "lucide-react";

interface HeroProductFinderProps {
  needs?: ResolvedHeroNeed[];
  initialNeedId?: HeroNeedId;
}

function HeroProductFinderInner({
  needs = getAllResolvedHeroNeeds(),
  initialNeedId = "dig",
}: {
  needs: ResolvedHeroNeed[];
  initialNeedId?: string | null;
}) {
  const { openDrawer } = useQuoteDrawer();
  const chooserLabelId = useId();

  // Validate initial selection from URL or fallback
  const getValidNeedId = useCallback(
    (targetId: string | null | undefined): HeroNeedId => {
      if (
        targetId &&
        heroNeedsConfig.some((config) => config.id === targetId)
      ) {
        return targetId as HeroNeedId;
      }
      return "dig";
    },
    []
  );

  const [prevInitialNeedId, setPrevInitialNeedId] = useState(initialNeedId);
  const [selectedNeedId, setSelectedNeedId] = useState<HeroNeedId>(() =>
    getValidNeedId(initialNeedId)
  );

  if (initialNeedId !== prevInitialNeedId) {
    setPrevInitialNeedId(initialNeedId);
    setSelectedNeedId(getValidNeedId(initialNeedId));
  }

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedIndex = needs.findIndex((n) => n.id === selectedNeedId);
  const currentNeed = needs[selectedIndex] || needs[0];

  const handleSelectNeed = (id: HeroNeedId, focus = false, index?: number) => {
    setSelectedNeedId(id);

    // Scroll chip into view on mobile horizontally
    const targetIdx = index ?? needs.findIndex((n) => n.id === id);
    if (targetIdx >= 0 && chipRefs.current[targetIdx]) {
      const el = chipRefs.current[targetIdx];
      el?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      if (focus) {
        el?.focus();
      }
    }
  };

  // Keyboard navigation for roving tabIndex radio group
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % needs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + needs.length) % needs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = needs.length - 1;
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleSelectNeed(needs[index].id, true, index);
      return;
    }

    if (nextIndex !== null) {
      const nextNeed = needs[nextIndex];
      handleSelectNeed(nextNeed.id, true, nextIndex);
    }
  };

  const handleQuoteClick = (need: ResolvedHeroNeed) => {
    const productNamesList = need.products.map((p) => p.name).join(", ");
    openDrawer({
      machineName: productNamesList,
      initialMessage: `I need to: ${need.chip}. Interested in: ${productNamesList}.`,
    });
  };

  return (
    <section
      id="hero-product-finder"
      aria-label="Product Finder Hero"
      className="bg-white border-b border-[#E5E5E0] py-6 sm:py-8 lg:py-8"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-stretch">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Need Chooser & Result Panel                  */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {/* Top Branding & Heading Area */}
            <div className="space-y-2">
              {/* 1. Accent bar */}
              <div
                className="w-12 h-1 bg-[#FFC20E] shrink-0 mb-2"
                aria-hidden="true"
              />

              {/* 2. Top Label */}
              <p className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#3D3D3D]">
                EQUIPMENT RENTAL AND SUPPLY · PABNA
              </p>

              {/* 3. Main Heading */}
              <h1 className="font-heading font-bold text-[#111111] leading-[1.04] tracking-[-0.01em] text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.85rem]">
                Machines and tools for your next project.
              </h1>

              {/* 4. Paragraph */}
              <p className="text-sm sm:text-base leading-[1.5] text-[#3D3D3D] max-w-[48ch]">
                Tell us what you need to do. We will show you the equipment that
                fits.
              </p>
            </div>

            {/* 5. The Chooser (Radio Group) */}
            <div className="space-y-1.5 pt-0.5">
              <span
                id={chooserLabelId}
                className="block text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#3D3D3D]"
              >
                I NEED TO
              </span>

              {/* Scrollable on phone (-mx-4 bleed), wrapping on tablet & desktop */}
              <div
                ref={scrollContainerRef}
                role="radiogroup"
                aria-label="What do you need to do?"
                className="-mx-4 px-4 sm:mx-0 sm:px-0 flex flex-nowrap overflow-x-auto sm:flex-wrap gap-2 snap-x snap-mandatory scrollbar-none py-0.5"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {needs.map((need, index) => {
                  const isSelected = selectedNeedId === need.id;
                  return (
                    <button
                      key={need.id}
                      ref={(el) => {
                        chipRefs.current[index] = el;
                      }}
                      type="button"
                      role="radio"
                      id={`chip-${need.id}`}
                      aria-checked={isSelected}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => handleSelectNeed(need.id, false, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`h-10 sm:h-11 min-h-[40px] px-3.5 sm:px-4 rounded-[6px] text-sm sm:text-[15px] font-semibold whitespace-nowrap snap-start shrink-0 transition-colors flex items-center justify-center relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                        isSelected
                          ? "bg-[#FFC20E] border border-[#FFC20E] text-[#111111] border-b-2 border-b-[#111111]"
                          : "bg-white border border-[#C9C8C2] text-[#111111] hover:border-[#111111]"
                      }`}
                    >
                      <span>{need.chip}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Result Panel (CSS Grid Stack to eliminate layout shifts / CLS) */}
            <div
              id="hero-finder-result-panel"
              aria-live="polite"
              className="relative pt-0.5"
            >
              <div className="grid grid-cols-1 grid-rows-1">
                {needs.map((need) => {
                  const isSelected = selectedNeedId === need.id;

                  return (
                    <div
                      key={need.id}
                      id={`hero-panel-${need.id}`}
                      aria-hidden={!isSelected}
                      className={`col-start-1 row-start-1 w-full bg-white border border-[#E5E5E0] border-t-4 border-t-[#FFC20E] p-4 sm:p-5 space-y-3 transition-opacity duration-200 ${
                        isSelected
                          ? "opacity-100 z-10 pointer-events-auto"
                          : "opacity-0 z-0 pointer-events-none invisible"
                      }`}
                    >
                      {/* Result Title & Blurb */}
                      <div className="space-y-0.5">
                        <h2 className="text-xl sm:text-2xl font-heading font-semibold text-[#111111] leading-[1.15]">
                          {need.title}
                        </h2>
                        <p className="text-sm sm:text-[15px] leading-[1.4] text-[#3D3D3D]">
                          {need.blurb}
                        </p>
                      </div>

                      {/* Product Rows List */}
                      <div
                        role="list"
                        aria-label={`Equipment for ${need.chip}`}
                        className="divide-y divide-[#E5E5E0] border-b border-[#E5E5E0]"
                      >
                        {need.products.map((product) => (
                          <div key={product.slug} role="listitem">
                            <Link
                              href={`/equipment/${product.slug}`}
                              className="group min-h-[48px] py-2 sm:py-2.5 flex items-center justify-between gap-3 transition-colors hover:bg-[#F7F7F5] -mx-2 px-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111]"
                            >
                              <div className="space-y-0.5 min-w-0 pr-2">
                                <span className="text-sm sm:text-base font-semibold text-[#111111] group-hover:underline block truncate">
                                  {product.name}
                                </span>
                                <span className="text-xs sm:text-sm text-[#6B6B6B] block">
                                  {product.categoryName}
                                </span>
                              </div>
                              <span
                                className="text-xs sm:text-sm font-semibold text-[#111111] shrink-0 group-hover:translate-x-0.5 transition-transform"
                                aria-hidden="true"
                              >
                                View →
                              </span>
                            </Link>
                          </div>
                        ))}
                      </div>

                      {/* CTA Buttons Row */}
                      <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleQuoteClick(need)}
                          className="w-full sm:w-auto h-11 min-h-[44px] px-5 sm:px-6 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] active:scale-[0.98] text-[#111111] font-semibold text-sm sm:text-base flex items-center justify-center transition-colors shadow-none whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#111111]"
                        >
                          Request a Quote
                        </button>

                        <a
                          id="hero-panel-call-link"
                          href={`tel:${siteConfig.contact.phoneRaw}`}
                          className="hidden sm:inline-flex h-11 min-h-[44px] px-4 sm:px-5 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] active:scale-[0.98] text-[#111111] font-semibold text-sm sm:text-base items-center justify-center transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#111111]"
                        >
                          <Phone className="w-4 h-4 mr-2 text-[#111111] shrink-0" />
                          <span>Call {siteConfig.contact.phone}</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Machine Photo & Full-Width Caption Bar      */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col rounded-none border border-[#E5E5E0] bg-[#ECEBE6] overflow-hidden lg:self-stretch">
            {/* 7. Machine Photo Area */}
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:flex-1 min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] bg-[#ECEBE6] overflow-hidden">
              {needs.map((need, index) => {
                const isSelected = selectedNeedId === need.id;
                const primary = need.primaryProduct;
                const img = primary.imageSrc;

                return (
                  <div
                    key={need.id}
                    aria-hidden={!isSelected}
                    className={`absolute inset-0 transition-opacity duration-200 motion-reduce:transition-none ${
                      isSelected
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    {img ? (
                      <Image
                        src={img}
                        alt={primary.imageAlt || primary.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-center text-[#6B6B6B] bg-[#ECEBE6] text-sm font-medium">
                        Photo needed: {primary.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 8. Caption Bar */}
            <Link
              id="hero-product-caption-link"
              href={`/equipment/${currentNeed.primaryProduct.slug}`}
              className="group w-full bg-[#111111] py-3.5 px-4 sm:px-5 flex items-center justify-between gap-3 shrink-0 transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#FFC20E]"
            >
              <span className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-[#FFC20E] transition-colors">
                {currentNeed.primaryProduct.name}
              </span>
              <span
                className="text-xs sm:text-sm font-semibold text-[#FFC20E] shrink-0 group-hover:underline flex items-center gap-1"
                aria-hidden="true"
              >
                View machine →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroProductFinderWithParams({
  needs,
}: {
  needs: ResolvedHeroNeed[];
}) {
  const searchParams = useSearchParams();
  const needParam = searchParams?.get("need");
  return (
    <HeroProductFinderInner needs={needs} initialNeedId={needParam || "dig"} />
  );
}

export function HeroProductFinder({
  needs,
}: HeroProductFinderProps) {
  const resolvedNeeds = needs || getAllResolvedHeroNeeds();

  return (
    <React.Suspense
      fallback={
        <HeroProductFinderInner
          needs={resolvedNeeds}
          initialNeedId="dig"
        />
      }
    >
      <HeroProductFinderWithParams needs={resolvedNeeds} />
    </React.Suspense>
  );
}

