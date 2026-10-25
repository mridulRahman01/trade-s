import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { rentalRatesContent } from "@/data/rental-rates-content";
import { RatesHero } from "@/components/rates/rates-hero";
import { RatesJumpBar } from "@/components/rates/rates-jump-bar";
import { RatesOverview } from "@/components/rates/rates-overview";
import { RatesFleetTable } from "@/components/rates/rates-fleet-table";
import { RatesCategorySections } from "@/components/rates/rates-category-sections";
import { RatesPricingSection } from "@/components/rates/rates-pricing-section";
import { RatesServicesAndGuide } from "@/components/rates/rates-services-and-guide";
import { RatesContactBlock } from "@/components/rates/rates-contact-block";
import { RatesMobileActionBar } from "@/components/rates/rates-mobile-action-bar";

export const metadata: Metadata = {
  title: {
    absolute: rentalRatesContent.meta.title,
  },
  description: rentalRatesContent.meta.description,
  alternates: {
    canonical: `${siteConfig.url}/rental-rates`,
  },
  openGraph: {
    title: rentalRatesContent.meta.title,
    description: rentalRatesContent.meta.description,
    url: `${siteConfig.url}/rental-rates`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RentalRatesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: siteConfig.address.country,
    },
    url: `${siteConfig.url}/rental-rates`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "11:00",
        closes: "23:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.proprietor,
    },
    description: rentalRatesContent.meta.description,
    priceRange: "BDT 400 - BDT 1,900,000",
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* 1. Page hero (id: top) */}
        <RatesHero />

        {/* 2. Jump bar: 12 Table of Contents items */}
        <RatesJumpBar />

        {/* 3. Overview (id: overview) */}
        <RatesOverview />

        {/* 4. Fleet at a Glance (id: glance) */}
        <RatesFleetTable />

        {/* 5. Six category sections (ids: earthmoving, lifting, concrete, compaction, powertools, specialized) */}
        <RatesCategorySections />

        {/* 6. Rental Price List (id: pricing) with 6 price tables and live filters */}
        <RatesPricingSection />

        {/* 7 & 8. Services That Keep You Moving (id: services) & Quick Guide (id: guide) */}
        <RatesServicesAndGuide />

        {/* 9. Get in Touch (id: contact) */}
        <RatesContactBlock />

        {/* Licensing Attribution Notice */}
        <section className="bg-white border-t border-[#E5E5E0] py-6 text-xs text-[#6B6B6B]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <p>
              Equipment category photographs are published under Creative Commons (CC BY-SA 3.0 / CC BY-SA 4.0 / CC0 1.0) and owner-supplied catalog licenses. See{" "}
              <span className="font-semibold text-[#111111]">IMAGE_CREDITS.md</span> for full attribution.
            </p>
          </div>
        </section>
      </main>

      {/* Mobile Sticky Bottom Action Bar (< 768px) */}
      <RatesMobileActionBar />
    </div>
  );
}
