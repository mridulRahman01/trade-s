"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

export function ContactMapSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <section
      id="find-us"
      aria-labelledby="map-section-heading"
      className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Heading & Address */}
        <div>
          <h2
            id="map-section-heading"
            className="font-heading font-bold text-[#111111] uppercase tracking-tight"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.1,
            }}
          >
            Find Us
          </h2>
          <div className="w-12 h-1 bg-[#FFC20E] mt-2" />
          <p className="mt-2 text-base text-[#3D3D3D] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#111111] shrink-0" />
            <span className="font-semibold">{siteConfig.address.formatted}</span>
          </p>
        </div>

        {/* Map Frame Container (4:3 mobile, 16:9 desktop, rounded 8px, 1px border) */}
        <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[8px] border border-[#E5E5E0] bg-white overflow-hidden shadow-xs">
          {!isMapLoaded ? (
            /* Privacy & Performance Placeholder */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#F7F7F5]">
              <div className="w-14 h-14 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center text-[#111111] mb-3 shadow-xs">
                <MapPin className="w-7 h-7 text-[#FFC20E]" strokeWidth={2.5} />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-1">
                Tabunia Bazaar Machinery Yard
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-[48ch] mb-4">
                Click below to load the Google Maps embed. Map assets load only when requested to preserve your privacy and mobile bandwidth.
              </p>

              <button
                type="button"
                onClick={() => setIsMapLoaded(true)}
                className="h-12 px-6 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] active:scale-[0.98] text-[#111111] font-bold text-sm sm:text-base flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-xs"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Load map
              </button>
            </div>
          ) : (
            /* Google Maps Embed iframe */
            <iframe
              src={siteConfig.map.embedUrl}
              title="Google Maps location of M/S Mir Sulaiman Trade Center in Tabunia Bazaar, Pabna, Bangladesh"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0 rounded-[8px]"
              allowFullScreen
            />
          )}
        </div>

        {/* Action Buttons Below Map */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <a
            href={siteConfig.map.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] active:bg-[#E5E5E0] text-[#111111] font-semibold text-sm sm:text-base flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.99]"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Google Maps
          </a>

          <a
            href={siteConfig.map.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 rounded-[6px] bg-[#111111] hover:bg-[#222222] active:bg-black text-white font-semibold text-sm sm:text-base flex items-center justify-center transition-colors whitespace-nowrap active:scale-[0.99]"
          >
            <Navigation className="w-4 h-4 mr-2 text-[#FFC20E]" />
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}
