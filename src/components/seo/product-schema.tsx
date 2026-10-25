import * as React from "react";
import { Equipment } from "@/types/equipment";
import { siteConfig } from "@/config/site";
import { JsonLd } from "./json-ld";

export function ProductSchema({
  equipment,
  machine,
}: {
  equipment?: Equipment;
  machine?: Equipment;
}) {
  const item = equipment || machine;
  if (!item) return null;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.summary,
    image: item.images[0]?.src ? `${siteConfig.url}${item.images[0].src}` : undefined,
    category: item.category,
    brand: {
      "@type": "Brand",
      name: item.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      description: "Request a quote for current rates and availability",
      availability: item.available
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `${siteConfig.url}/equipment/${item.slug}`,
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };

  return <JsonLd data={schema} />;
}
