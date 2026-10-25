import React from "react";
import { HeroProductFinder } from "@/components/sections/hero-product-finder";
import { getAllResolvedHeroNeeds } from "@/config/hero-finder";
import { ProductCatalogSection } from "@/components/sections/product-catalog-section";
import { ContactStrip } from "@/components/sections/contact-strip";

export default function HomePage() {
  const needs = getAllResolvedHeroNeeds();

  return (
    <>
      <HeroProductFinder needs={needs} />
      <ProductCatalogSection />
      <ContactStrip />
    </>
  );
}
