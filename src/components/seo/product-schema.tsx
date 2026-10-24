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
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      price: "0",
      description: "Request a quote for current rental rates",
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
