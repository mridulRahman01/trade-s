import React from "react";
import { HomeHero } from "@/components/sections/home-hero";
import { ProductCatalogSection } from "@/components/sections/product-catalog-section";
import { ContactStrip } from "@/components/sections/contact-strip";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProductCatalogSection />
      <ContactStrip />
    </>
  );
}
