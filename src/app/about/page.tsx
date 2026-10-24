import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/data/about-content";
import { AboutAccordion } from "@/components/about/about-accordion";
import { AboutContactBlock } from "@/components/about/about-contact-block";
import { AboutMobileActionBar } from "@/components/about/about-mobile-action-bar";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "About M/S Mir Sulaiman Trade Center",
  description:
    "Construction machinery rental | Excavators, Backhoe Loaders, Bulldozers, Concrete Mixers, Vibrators. Rental fleet curated for construction, infrastructure, and industrial projects.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About M/S Mir Sulaiman Trade Center",
    description:
      "Construction machinery rental | Excavators, Backhoe Loaders, Bulldozers, Concrete Mixers, Vibrators. Reliable, well-maintained, and ready to work.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: `${siteConfig.url}/about`,
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    founder: {
      "@type": "Person",
      name: siteConfig.proprietor,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "23:00",
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen pb-20 md:pb-0">
      <JsonLd data={localBusinessSchema} />

      {/* 1. Page Hero */}
      <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#111111] tracking-tight leading-[1.05]">
            {aboutContent.hero.pageTitle}
          </h1>
          <div className="w-12 h-1 bg-[#FFC20E] mt-4 mb-4" />
          <p className="text-base sm:text-lg text-[#3D3D3D] leading-relaxed max-w-[65ch]">
            {aboutContent.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
            {aboutContent.intro.heading}
          </h2>
          <div className="w-12 h-1 bg-[#FFC20E] mt-3 mb-4" />
          <p className="text-base text-[#3D3D3D] leading-relaxed max-w-[65ch]">
            {aboutContent.intro.paragraph}
          </p>
        </div>
      </section>

      {/* 3. Overview: What We Offer */}
      <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
            {aboutContent.overview.heading}
          </h2>
          <div className="w-12 h-1 bg-[#FFC20E] mt-3 mb-4" />
          <p className="text-base text-[#3D3D3D] leading-relaxed max-w-[65ch]">
            {aboutContent.overview.paragraph}
          </p>
        </div>
      </section>

      {/* 4. Fleet at a Glance (Quick Table) */}
      <section className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
              {aboutContent.fleetTable.heading}
            </h2>
            <div className="w-12 h-1 bg-[#FFC20E] mt-3" />
          </div>

          {/* Desktop Table: visible from 768px up */}
          <div className="hidden md:block overflow-hidden border border-[#E5E5E0] rounded-[6px] bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#F7F7F5] text-[#111111] font-heading font-bold text-base border-b border-[#E5E5E0]">
                  <th scope="col" className="py-3.5 px-4 font-semibold w-1/5">
                    Category
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold w-1/4">
                    Key Equipment
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold w-1/3">
                    Capacity/Options
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E0]">
                {aboutContent.fleetTable.rows.map((row, idx) => (
                  <tr
                    key={row.category}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F7F7F5]/60"}
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#111111] align-top">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4 text-[#3D3D3D] align-top">
                      {row.keyEquipment}
                    </td>
                    <td className="py-3.5 px-4 text-[#3D3D3D] align-top">
                      {row.capacity}
                    </td>
                    <td className="py-3.5 px-4 text-[#3D3D3D] align-top">
                      {row.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards: visible under 768px */}
          <div className="space-y-4 md:hidden">
            {aboutContent.fleetTable.rows.map((row) => (
              <div
                key={row.category}
                className="border border-[#E5E5E0] rounded-[6px] p-5 bg-white space-y-3"
              >
                <h3 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E5E5E0] pb-2">
                  {row.category}
                </h3>
                <div className="text-sm space-y-2.5">
                  <div>
                    <span className="font-semibold text-[#111111] block mb-0.5">
                      Key Equipment:
                    </span>
                    <span className="text-[#3D3D3D] leading-relaxed">
                      {row.keyEquipment}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#111111] block mb-0.5">
                      Capacity/Options:
                    </span>
                    <span className="text-[#3D3D3D] leading-relaxed">
                      {row.capacity}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#111111] block mb-0.5">
                      Best For:
                    </span>
                    <span className="text-[#3D3D3D] leading-relaxed">
                      {row.bestFor}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Six Category Sections in Accordion */}
      <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
              Equipment Categories
            </h2>
            <div className="w-12 h-1 bg-[#FFC20E] mt-3" />
          </div>

          <AboutAccordion sections={aboutContent.categories} />
        </div>
      </section>

      {/* 6. Services & Quick Guide */}
      <section className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Services That Keep You Moving */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
              {aboutContent.services.heading}
            </h2>
            <div className="w-12 h-1 bg-[#FFC20E] mt-3 mb-6" />
            <ul className="space-y-4 max-w-[65ch]">
              {aboutContent.services.items.map((item) => (
                <li key={item.term} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC20E] mt-2.5 mr-3 shrink-0" aria-hidden="true" />
                  <span className="text-base text-[#3D3D3D] leading-relaxed">
                    <strong className="font-semibold text-[#111111]">
                      {item.term}
                    </strong>{" "}
                    {item.details}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Guide: Choosing the Right Machine */}
          <div className="pt-8 border-t border-[#E5E5E0]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
              {aboutContent.quickGuide.heading}
            </h2>
            <div className="w-12 h-1 bg-[#FFC20E] mt-3 mb-6" />
            <ul className="space-y-4 max-w-[65ch]">
              {aboutContent.quickGuide.items.map((item) => (
                <li key={item.term} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC20E] mt-2.5 mr-3 shrink-0" aria-hidden="true" />
                  <span className="text-base text-[#3D3D3D] leading-relaxed">
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
      </section>

      {/* 7. Contact Block */}
      <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
              {aboutContent.contact.heading}
            </h2>
            <div className="w-12 h-1 bg-[#FFC20E] mt-3" />
          </div>

          <AboutContactBlock />
        </div>
      </section>

      {/* Sticky Bottom Action Bar under 768px */}
      <AboutMobileActionBar />
    </div>
  );
}
