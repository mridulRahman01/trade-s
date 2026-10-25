import fs from "fs";
import path from "path";
import { z } from "zod";
import { allEquipment } from "../src/data/equipment";
import { categories } from "../src/data/categories";
import { heroNeedsConfig } from "../src/config/hero-finder";

const imperialUnitsRegex = /(lb|lbf|hp|ft|in|psi|cu yd|yd³|gal|bpm|vpm|mph|ton|tons)/i;

const equipmentSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  category: z.enum([
    "excavators",
    "bulldozers",
    "construction-machines",
    "safety-equipment",
    "imported-tools-and-supplies",
  ]),
  brand: z.string().min(2),
  summary: z.string().min(20, "Summary must be at least 20 characters"),
  description: z.string().min(40, "Description must be at least 40 characters"),
  images: z
    .array(
      z.object({
        src: z.string().startsWith("/", "Image src must start with /"),
        alt: z.string().min(5, "Alt text must be at least 5 characters"),
      })
    )
    .min(1, "Must have at least one image"),
  specs: z
    .array(
      z.object({
        label: z.string().min(2),
        value: z.string().min(1),
        verified: z.boolean().optional(),
      })
    )
    .min(3, "Must have at least 3 specifications"),
  features: z.array(z.string().min(5)).min(2),
  bestFor: z.array(z.string().min(5)).min(2),
  available: z.boolean(),
  availability: z.enum(["rent", "sale", "rent-or-sale", "unknown"]).optional(),
});

function validateData(): boolean {
  console.log("-----------------------------------------");
  console.log("RUNNING DATA VALIDATION (validate-data.ts)");
  console.log("-----------------------------------------");

  let hasErrors = false;
  const publicDir = path.join(process.cwd(), "public");

  // 1. Validate Equipment
  console.log(`Checking ${allEquipment.length} equipment items...`);
  if (allEquipment.length !== 20) {
    console.error(`[ERROR] Expected exactly 20 equipment items, found ${allEquipment.length}`);
    hasErrors = true;
  }

  const seenSlugs = new Set<string>();

  for (const item of allEquipment) {
    if (seenSlugs.has(item.slug)) {
      console.error(`[ERROR] Duplicate equipment slug detected: "${item.slug}"`);
      hasErrors = true;
    }
    seenSlugs.add(item.slug);

    const parseResult = equipmentSchema.safeParse(item);
    if (!parseResult.success) {
      console.error(`[ERROR] Equipment "${item.slug}" validation failed:`, parseResult.error.format());
      hasErrors = true;
    }

    // Check availability field on new equipment items
    if (
      (item.category === "construction-machines" ||
        item.category === "safety-equipment" ||
        item.category === "imported-tools-and-supplies") &&
      !item.availability
    ) {
      console.error(`[ERROR] Equipment "${item.slug}" is missing required availability field.`);
      hasErrors = true;
    }

    // Verify images exist on disk in public/
    for (const img of item.images) {
      const fullPath = path.join(publicDir, img.src);
      if (!fs.existsSync(fullPath)) {
        console.error(`[ERROR] Missing image file for "${item.slug}": ${img.src} (checked ${fullPath})`);
        hasErrors = true;
      }
    }

    // Verify imperial units in specs
    const hasImperial = item.specs.some((spec) => imperialUnitsRegex.test(spec.value));
    if (!hasImperial) {
      console.error(`[ERROR] Equipment "${item.slug}" has no specifications with imperial units.`);
      hasErrors = true;
    }
  }

  // 2. Validate Categories
  console.log(`Checking ${categories.length} categories...`);
  const categorySlugs = new Set(categories.map((c) => c.slug));
  for (const item of allEquipment) {
    if (!categorySlugs.has(item.category)) {
      console.error(`[ERROR] Equipment "${item.slug}" references unknown category "${item.category}"`);
      hasErrors = true;
    }
  }

  // 3. Validate Hero Finder Config
  console.log("Checking Hero Finder needs configuration...");
  if (!Array.isArray(heroNeedsConfig) || heroNeedsConfig.length !== 5) {
    console.error(`[ERROR] Expected exactly 5 hero finder needs, found ${heroNeedsConfig?.length}`);
    hasErrors = true;
  }

  const allEquipmentSlugs = new Set(allEquipment.map((e) => e.slug));
  for (const need of heroNeedsConfig) {
    if (!need.productSlugs || need.productSlugs.length === 0) {
      console.error(`[ERROR] Hero finder need "${need.id}" lists no products.`);
      hasErrors = true;
      continue;
    }

    for (const slug of need.productSlugs) {
      if (!allEquipmentSlugs.has(slug)) {
        console.error(
          `[ERROR] Hero finder need "${need.id}" references unknown product slug "${slug}"`
        );
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.error("\n❌ Data validation FAILED. Correct the errors above.");
    return false;
  }

  console.log("\n✅ All 20 equipment catalog, category, and hero finder data PASSED validation!");
  console.log("-----------------------------------------\n");
  return true;
}

const success = validateData();
if (!success) {
  process.exit(1);
}
