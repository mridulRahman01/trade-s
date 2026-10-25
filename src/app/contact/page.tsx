import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactHero } from "@/components/contact/contact-hero";
import { QuickActionRow } from "@/components/contact/quick-action-row";
import { ContactDetailsBlock } from "@/components/contact/contact-details-block";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMapSection } from "@/components/contact/contact-map-section";
import { ContactClosingStrip } from "@/components/contact/contact-closing-strip";
import { ContactMobileActionBar } from "@/components/contact/contact-mobile-action-bar";

export const metadata: Metadata = {
  title: {
    absolute: `Contact | ${siteConfig.name}, Pabna`,
  },
  description: `Contact ${siteConfig.name} in Tabunia Bazaar, Pabna. Call ${siteConfig.contact.phone} or chat on WhatsApp for construction machinery rentals, equipment delivery, and technical inquiries.`,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}, Pabna`,
    description: `Direct machinery dispatch, rental inquiries, and location map for ${siteConfig.name} at Tabunia Bazaar, Pabna.`,
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Contact and Machinery Yard`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}, Pabna`,
    description: `Call ${siteConfig.contact.phone} or visit our equipment yard at Tabunia Bazaar, Pabna, Bangladesh.`,
    images: ["/images/logo/og-image.png"],
  },
};

interface ContactPageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { product } = await searchParams;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteConfig.url}/contact#webpage`,
        url: `${siteConfig.url}/contact`,
        name: `Contact | ${siteConfig.name}, Pabna`,
        description: `Contact and machinery yard dispatch details for ${siteConfig.name}.`,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteConfig.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact",
              item: `${siteConfig.url}/contact`,
            },
          ],
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        telephone: "+8801711269863",
        email: siteConfig.contact.email,
        url: siteConfig.url,
        founder: {
          "@type": "Person",
          name: siteConfig.proprietor,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressCountry: "BD",
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
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* 1. Page Hero */}
        <ContactHero />

        {/* 2. Quick Action Row */}
        <QuickActionRow />

        {/* 3. Two-Column Section (Stacked on mobile, 5/7 split from 1024px; Form comes FIRST on mobile) */}
        <section
          aria-label="Direct message and yard details"
          className="bg-white py-12 md:py-[72px] lg:py-24 border-b border-[#E5E5E0]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Form Column: FIRST on mobile (order-1), Right on desktop (order-2, 7 cols) */}
              <div className="w-full order-1 lg:order-2 lg:col-span-7">
                <ContactForm initialProduct={product} />
              </div>

              {/* Details Column: SECOND on mobile (order-2), Left on desktop (order-1, 5 cols) */}
              <div className="w-full order-2 lg:order-1 lg:col-span-5">
                <ContactDetailsBlock />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Map Section */}
        <ContactMapSection />

        {/* 5. Closing Strip */}
        <ContactClosingStrip />
      </main>

      {/* 6. Mobile Sticky Bottom Action Bar (< 768px) */}
      <ContactMobileActionBar />
    </div>
  );
}
