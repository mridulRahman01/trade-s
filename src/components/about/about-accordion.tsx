"use client";

import React, { useState, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import { CategorySection } from "@/data/about-content";

interface AboutAccordionProps {
  sections: CategorySection[];
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(min-width: 768px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getServerSnapshot() {
  return false;
}

export function AboutAccordion({ sections }: AboutAccordionProps) {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  const isSectionOpen = (id: string, index: number) => {
    if (toggled[id] !== undefined) {
      return toggled[id];
    }
    // Default: first item (index 0) open on desktop, all closed on mobile
    return isDesktop && index === 0;
  };

  const toggleSection = (id: string, index: number) => {
    const current = isSectionOpen(id, index);
    setToggled((prev) => ({
      ...prev,
      [id]: !current,
    }));
  };

  return (
    <div className="border border-[#E5E5E0] rounded-[6px] divide-y divide-[#E5E5E0] bg-white overflow-hidden">
      {sections.map((section, idx) => {
        const isOpen = isSectionOpen(section.id, idx);
        const triggerId = `accordion-trigger-${section.id}`;
        const panelId = `accordion-panel-${section.id}`;

        return (
          <div key={section.id} className="transition-colors">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleSection(section.id, idx)}
                className="w-full min-h-[56px] py-4 px-5 sm:px-6 flex items-center justify-between text-left font-heading font-bold text-lg sm:text-xl text-[#111111] hover:bg-[#F7F7F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC20E] focus:ring-inset"
              >
                <span>{section.heading}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#111111] shrink-0 ml-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={`px-5 sm:px-6 pb-6 pt-2 bg-white border-t border-[#E5E5E0]/60 ${
                !isOpen ? "hidden" : "block"
              }`}
            >
              <ul className="space-y-3 text-base text-[#3D3D3D] leading-relaxed">
                {section.items.map((item) => (
                  <li key={item.term} className="flex items-start">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#FFC20E] mt-2.5 mr-3 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-[#111111]">
                        {item.term}
                      </strong>{" "}
                      {item.details}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
