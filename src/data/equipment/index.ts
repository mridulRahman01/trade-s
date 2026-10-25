import { Equipment, CategorySlug } from "@/types/equipment";
import { excavators } from "./excavators";
import { bulldozers } from "./bulldozers";
import { constructionMachines } from "./construction-machines";
import { safetyEquipment } from "./safety-equipment";
import { importedTools } from "./imported-tools";

export const allEquipment: Equipment[] = [
  ...excavators,
  ...bulldozers,
  ...constructionMachines,
  ...safetyEquipment,
  ...importedTools,
];

export function getEquipmentBySlug(slug: string): Equipment | undefined {
  return allEquipment.find((item) => item.slug === slug);
}

export function getEquipmentByCategory(category: CategorySlug): Equipment[] {
  return allEquipment.filter((item) => item.category === category);
}

export function getFeaturedEquipment(): Equipment[] {
  return allEquipment.filter((item) => item.featured);
}

export function getRelatedEquipment(
  currentSlug: string,
  category: CategorySlug,
  limit = 3
): Equipment[] {
  const sameCategory = allEquipment.filter(
    (item) => item.slug !== currentSlug && item.category === category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = allEquipment.filter(
    (item) => item.slug !== currentSlug && item.category !== category
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function searchEquipment(query: string, category?: string): Equipment[] {
  const cleanQuery = query.toLowerCase().trim();

  return allEquipment.filter((item) => {
    const matchesCategory = !category || category === "all" || item.category === category;
    if (!matchesCategory) return false;

    if (!cleanQuery) return true;

    const matchesName = item.name.toLowerCase().includes(cleanQuery);
    const matchesBrand = item.brand.toLowerCase().includes(cleanQuery);
    const matchesSummary = item.summary.toLowerCase().includes(cleanQuery);
    const matchesDescription = item.description.toLowerCase().includes(cleanQuery);
    const matchesSpecs = item.specs.some(
      (s) => s.label.toLowerCase().includes(cleanQuery) || s.value.toLowerCase().includes(cleanQuery)
    );
    const matchesBestFor = item.bestFor.some((b) => b.toLowerCase().includes(cleanQuery));

    return matchesName || matchesBrand || matchesSummary || matchesDescription || matchesSpecs || matchesBestFor;
  });
}
