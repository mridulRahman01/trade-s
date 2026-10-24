"use client";

import React, { useEffect, useState, useRef } from "react";
import { rentalRatesContent, TocItem } from "@/data/rental-rates-content";

export function RatesJumpBar() {
  const [activeId, setActiveId] = useState<string>("overview");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = rentalRatesContent.toc.map((t) => t.id);
    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav
      id="jump-bar"
      aria-label="Table of contents"
      className="sticky top-16 z-30 w-full h-12 bg-white border-b border-[#E5E5E0] shadow-sm select-none"
    >
      <div className="relative max-w-[1200px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Scrollable Container */}
        <div
          ref={navRef}
          className="w-full h-full flex items-center overflow-x-auto scroll-smooth whitespace-nowrap snap-x snap-mandatory gap-2 sm:gap-4 text-xs sm:text-sm font-semibold [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {rentalRatesContent.toc.map((item: TocItem) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`snap-start shrink-0 px-2.5 py-1.5 rounded-[4px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                  isActive
                    ? "bg-[#FFC20E] text-[#111111] font-bold"
                    : "text-[#3D3D3D] hover:text-[#111111] hover:bg-[#F7F7F5]"
                }`}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="opacity-70 mr-1">{item.number}</span>
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right fade hint on mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent md:hidden"
        />
      </div>
    </nav>
  );
}
