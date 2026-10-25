import { allEquipment } from "@/data/equipment";
import { categories } from "@/data/categories";
import { Equipment } from "@/types/equipment";

export type HeroNeedId = "dig" | "clear" | "concrete" | "steel" | "safe";

export interface HeroNeedConfig {
  id: HeroNeedId;
  chip: string;
  title: string;
  blurb: string;
  productSlugs: string[];
}

export const heroNeedsConfig: HeroNeedConfig[] = [
  {
    id: "dig",
    chip: "Dig and trench",
    title: "Digging, trenching and demolition",
    blurb: "Excavators in small, medium and wheeled versions.",
    productSlugs: [
      "cat-320-medium-excavator",
      "sany-15-5t-small-excavator",
      "sany-wheel-excavator-sy155w",
    ],
  },
  {
    id: "clear",
    chip: "Level and clear land",
    title: "Land clearing and site preparation",
    blurb: "Bulldozers to push and level, plus rollers and trucks to finish.",
    productSlugs: [
      "shantui-sd16",
      "sd22w-rock-bulldozer",
      "roller-and-dump-trucks",
    ],
  },
  {
    id: "concrete",
    chip: "Mix and pour concrete",
    title: "Mixing and compacting concrete",
    blurb: "Machines for consistent batches and dense, crack-free curing.",
    productSlugs: ["concrete-mixture-machine", "vibrator-machine"],
  },
  {
    id: "steel",
    chip: "Cut and bend steel",
    title: "Cutting and bending reinforcement",
    blurb: "Rod machines and the discs and blades that go with them.",
    productSlugs: [
      "rod-cutter-and-rod-bender-machine",
      "importer-of-cutting-disks",
      "cutting-blades",
    ],
  },
  {
    id: "safe",
    chip: "Safety and tools",
    title: "Safety gear and hand tools",
    blurb: "Protect your crew and equip the site.",
    productSlugs: ["helmets-and-safety-belts", "hardware-tools-from-china"],
  },
];

export interface ResolvedProduct {
  slug: string;
  name: string;
  categoryName: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface ResolvedHeroNeed {
  id: HeroNeedId;
  chip: string;
  title: string;
  blurb: string;
  products: ResolvedProduct[];
  primaryProduct: ResolvedProduct;
}

/**
 * Resolves a hero need configuration by matching slugs to real equipment in the catalog.
 */
export function getResolvedHeroNeed(needConfig: HeroNeedConfig): ResolvedHeroNeed {
  const categoryMap = new Map(categories.map((c) => [c.slug, c.name]));

  const products: ResolvedProduct[] = needConfig.productSlugs.map((slug) => {
    const item: Equipment | undefined = allEquipment.find((e) => e.slug === slug);
    if (!item) {
      return {
        slug,
        name: `Product ${slug}`,
        categoryName: "Equipment",
      };
    }

    const categoryName = categoryMap.get(item.category) || item.category;
    const firstImg = item.images?.[0];

    return {
      slug: item.slug,
      name: item.name,
      categoryName,
      imageSrc: firstImg?.src,
      imageAlt: firstImg?.alt || item.name,
    };
  });

  return {
    id: needConfig.id,
    chip: needConfig.chip,
    title: needConfig.title,
    blurb: needConfig.blurb,
    products,
    primaryProduct: products[0] || {
      slug: "not-found",
      name: "No Equipment Listed",
      categoryName: "Equipment",
    },
  };
}

/**
 * Returns all five resolved needs with their full product details.
 */
export function getAllResolvedHeroNeeds(): ResolvedHeroNeed[] {
  return heroNeedsConfig.map(getResolvedHeroNeed);
}
