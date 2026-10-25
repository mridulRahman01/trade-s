import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { allEquipment, getEquipmentBySlug, getRelatedEquipment } from "@/data/equipment";
import { categories } from "@/data/categories";
import { ProductGallery } from "@/components/equipment/product-gallery";
import { ProductMobileActionBar } from "@/components/equipment/product-mobile-action-bar";
import { ProductDetailActions } from "@/components/equipment/product-detail-actions";
import { ProductSchema } from "@/components/seo/product-schema";
import { Check } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allEquipment.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getEquipmentBySlug(slug);

  if (!item) {
    return { title: "Equipment Not Found" };
  }

  return {
    title: `${item.name} Rental | ${siteConfig.name}`,
    description: `${item.summary} ${siteConfig.deliveryNote}. Heavy contractor equipment rentals by ${siteConfig.name}.`,
    openGraph: {
      title: `${item.name} | ${siteConfig.name}`,
      description: item.summary,
      images: [
        {
          url: item.images[0]?.src || "/images/hero/hero-fleet.webp",
          width: 1200,
          height: 630,
          alt: item.name,
        },
      ],
    },
  };
}

export default async function EquipmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getEquipmentBySlug(slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedEquipment(item.slug, item.category, 3);
  const whatsappMessage = encodeURIComponent(
    `Hello, I would like a quote for ${item.name}.`
  );
  const whatsappUrl = `https://wa.me/8801711269863?text=${whatsappMessage}`;

  return (
    <>
      <ProductSchema equipment={item} />

      <div className="bg-white py-8 md:py-12 border-b border-[#E5E5E0] pb-24 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb: Equipment / Product Name */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-sm text-[#6B6B6B]">
            <Link href="/#equipment" className="hover:text-[#111111] transition-colors">
              Equipment
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#111111] font-medium truncate max-w-[240px] sm:max-w-none">
              {item.name}
            </span>
          </nav>

          {/* Main Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery images={item.images} productName={item.name} />
            </div>

            {/* Right Column: Name, Short Summary, Key Specs, Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] block mb-1">
                  {item.brand &&
                  item.brand !== "Direct Import" &&
                  item.brand !== "Site Machinery" &&
                  item.brand !== "Site Safety Gear"
                    ? `${item.brand} · `
                    : ""}
                  {categories.find((c) => c.slug === item.category)?.name || item.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#111111] leading-tight">
                  {item.name}
                </h1>
                <div className="w-12 h-1 bg-[#FFC20E] mt-3" />
              </div>

              <p className="text-base text-[#3D3D3D] leading-relaxed">
                {item.summary}
              </p>

              {/* Rates / Availability Status */}
              <div className="p-4 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px]">
                <span className="block text-xs uppercase font-semibold text-[#6B6B6B]">
                  Pricing & Availability
                </span>
                <span className="text-lg font-bold text-[#111111]">
                  Request a quote
                </span>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Contact us for immediate rates, options, and direct site dispatch from Tabunia Bazaar, Pabna.
                </p>
              </div>

              {/* Key Specs Highlights (2-column grid on mobile) */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
                  {item.specsTitle ? "Typical Options" : "Key Specifications"}
                </h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {item.specs.slice(0, 4).map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px]"
                    >
                      <span className="block text-xs text-[#6B6B6B] truncate">
                        {spec.label}
                      </span>
                      <span className="font-bold text-[#111111] text-sm truncate block mt-0.5">
                        {spec.value.replace(/^TO CONFIRM:\s*/i, "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Actions: Large Request a Quote button + Call + WhatsApp */}
              <ProductDetailActions
                productName={item.name}
                productSlug={item.slug}
                phone={siteConfig.contact.phone}
                phoneRaw={siteConfig.contact.phoneRaw}
                whatsappUrl={whatsappUrl}
              />

              {/* How to Order Box */}
              <div className="p-4 bg-white border border-[#E5E5E0] rounded-[6px] space-y-1.5 text-xs text-[#3D3D3D]">
                <span className="font-bold text-sm text-[#111111] block">
                  How to order
                </span>
                <p className="leading-relaxed">
                  Click <strong>Request a Quote</strong>, call our team at{" "}
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="font-semibold text-[#111111] hover:underline"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  , or message us directly on{" "}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#111111] hover:underline"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
                <p className="text-[#6B6B6B] pt-1.5 border-t border-[#E5E5E0]">
                  Proprietor: {siteConfig.proprietor} · Operating Hours: {siteConfig.operatingHours.display}
                </p>
              </div>
            </div>
          </div>

          {/* Full Specs Table (stacked label/value rows on mobile) */}
          <div className="mt-12 pt-8 border-t border-[#E5E5E0]">
            <h2 className="text-2xl font-bold font-heading text-[#111111] mb-6">
              {item.specsTitle || "Complete Technical Specifications"}
            </h2>
            <div className="border border-[#E5E5E0] rounded-[6px] overflow-hidden">
              <div className="divide-y divide-[#E5E5E0]">
                {item.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#F7F7F5]"
                    }`}
                  >
                    <span className="text-sm font-medium text-[#6B6B6B]">
                      {spec.label}
                    </span>
                    <span className="text-sm font-bold text-[#111111] mt-1 sm:mt-0">
                      {spec.value.replace(/^TO CONFIRM:\s*/i, "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Machine Description & "Best For" Short List */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-[#E5E5E0]">
            <div className="md:col-span-7 space-y-4">
              <h2 className="text-2xl font-bold font-heading text-[#111111]">
                Equipment Overview
              </h2>
              <p className="text-base text-[#3D3D3D] leading-relaxed">
                {item.description}
              </p>
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
                  Standard Equipment Features
                </h3>
                <ul className="space-y-2">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#3D3D3D]">
                      <Check className="w-4 h-4 text-[#FFC20E] shrink-0 mr-2 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="p-6 bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] space-y-4">
                <h2 className="text-xl font-bold font-heading text-[#111111]">
                  Best For
                </h2>
                <ul className="space-y-3">
                  {item.bestFor.map((app, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#3D3D3D]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC20E] shrink-0 mr-2.5 mt-2" />
                      <span className="font-medium">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* "Other Equipment" row of 3 to 4 related products */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#E5E5E0]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-[#111111]">
                    Other Equipment
                  </h2>
                  <div className="w-12 h-1 bg-[#FFC20E] mt-2" />
                </div>
                <Link
                  href="/#equipment"
                  className="text-sm font-semibold text-[#111111] hover:underline"
                >
                  View Full Fleet →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <div
                    key={rel.slug}
                    className="bg-white border border-[#E5E5E0] rounded-[6px] overflow-hidden flex flex-col justify-between hover:border-[#111111] transition-colors"
                  >
                    <div>
                      <Link
                        href={`/equipment/${rel.slug}`}
                        className="block relative aspect-[4/3] w-full bg-[#F7F7F5] overflow-hidden border-b border-[#E5E5E0]"
                      >
                        <Image
                          src={rel.images[0]?.src || "/images/hero/hero-fleet.webp"}
                          alt={rel.images[0]?.alt || rel.name}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </Link>
                      <div className="p-4 space-y-2">
                        <span className="text-xs uppercase font-semibold text-[#6B6B6B]">
                          {rel.brand}
                        </span>
                        <h3 className="text-lg font-bold font-heading text-[#111111] line-clamp-1">
                          <Link href={`/equipment/${rel.slug}`}>
                            {rel.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-[#3D3D3D] line-clamp-2">
                          {rel.summary}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <Link
                        href={`/equipment/${rel.slug}`}
                        className="w-full h-10 rounded-[6px] border border-[#E5E5E0] hover:border-[#111111] text-[#111111] text-xs font-semibold flex items-center justify-center transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Action Bar on Mobile */}
      <ProductMobileActionBar productName={item.name} productSlug={item.slug} />
    </>
  );
}
