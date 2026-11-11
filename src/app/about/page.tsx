import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/data/about-content";
import { AboutAccordion } from "@/components/about/about-accordion";
import { AboutContactBlock } from "@/components/about/about-contact-block";
import { AboutMobileActionBar } from "@/components/about/about-mobile-action-bar";
import { WebsiteQrCard } from "@/components/layout/website-qr-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Mail, MapPin, Phone } from "lucide-react";

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
      jobTitle: aboutContent.owner.role,
      image: `${siteConfig.url}${aboutContent.owner.imageSrc}`,
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

      {/* 2. Business Owner / Proprietor Section */}
      <section className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Portrait Column */}
            <div className="md:col-span-5 lg:col-span-4">
              <figure className="bg-white border border-[#E5E5E0] border-t-4 border-t-[#FFC20E] rounded-[6px] p-3 max-w-[320px] mx-auto md:mx-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-[#F7F7F5]">
                  <Image
                    src={aboutContent.owner.imageSrc}
                    alt={aboutContent.owner.imageAlt}
                    width={640}
                    height={807}
                    priority
                    sizes="(max-width: 768px) 280px, 320px"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <figcaption className="pt-3 pb-1 px-1">
                  <span className="block font-heading font-bold text-lg text-[#111111] leading-tight">
                    {aboutContent.owner.name}
                  </span>
                  <span className="block text-xs font-medium text-[#6B6B6B] mt-0.5">
                    {aboutContent.owner.role} · {siteConfig.name}
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* Owner Bio & Direct Details */}
            <div className="md:col-span-7 lg:col-span-8 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B6B6B] mb-1.5">
                  {aboutContent.owner.eyebrow}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
                  {aboutContent.owner.name}
                </h2>
                <div className="w-12 h-1 bg-[#FFC20E] mt-3 mb-3" />
                <p className="text-sm font-semibold text-[#111111]">
                  {aboutContent.owner.role}, {siteConfig.name}
                </p>
              </div>

              <p className="text-base text-[#3D3D3D] leading-relaxed max-w-[65ch]">
                {aboutContent.owner.bio}
              </p>

              <ul className="space-y-2.5 max-w-[65ch]">
                {aboutContent.owner.highlights.map((item) => (
                  <li key={item} className="flex items-start text-sm sm:text-base text-[#3D3D3D]">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#FFC20E] mt-2.5 mr-3 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="min-h-[52px] px-3.5 py-2.5 bg-white border border-[#E5E5E0] hover:border-[#111111] rounded-[6px] flex items-center gap-2.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Phone / WhatsApp
                    </span>
                    <span className="block text-sm font-semibold text-[#111111] truncate">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="min-h-[52px] px-3.5 py-2.5 bg-white border border-[#E5E5E0] hover:border-[#111111] rounded-[6px] flex items-center gap-2.5 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Email
                    </span>
                    <span className="block text-sm font-semibold text-[#111111] truncate">
                      {siteConfig.contact.email}
                    </span>
                  </div>
                </a>

                <div className="min-h-[52px] px-3.5 py-2.5 bg-white border border-[#E5E5E0] rounded-[6px] flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Location
                    </span>
                    <span className="block text-sm font-semibold text-[#111111] truncate">
                      {siteConfig.address.city}, {siteConfig.address.countryName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Intro Section */}
      <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
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

      {/* 4. Overview: What We Offer */}
      <section className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
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

      {/* 5. Fleet at a Glance (Quick Table) */}
      <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
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

      {/* 6. Six Category Sections in Accordion */}
      <section className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
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

      {/* 7. Services & Quick Guide */}
      <section className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
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

      {/* 8. Contact Block & Website QR Code */}
      <section className="bg-[#F7F7F5] py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#111111] tracking-tight leading-[1.1]">
              {aboutContent.contact.heading}
            </h2>
            <div className="w-12 h-1 bg-[#FFC20E] mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <AboutContactBlock />
            </div>
            <div className="lg:col-span-4">
              <WebsiteQrCard />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Action Bar under 768px */}
      <AboutMobileActionBar />
    </div>
  );
}
