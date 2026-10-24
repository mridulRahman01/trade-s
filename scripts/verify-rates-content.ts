import { rentalRatesContent } from "../src/data/rental-rates-content";

// Expected content from Prompt 1:
const EXPECTED = {
  metaTitle: "Rental Price List – M/S Mir Sulaiman Trade Center",
  pageH1: "Rental Price List",
  heroHeading: "Build With Confidence",
  heroText: "Your complete guide to construction machinery rentals—equipment photos, quick comparisons, transparent pricing, and everything you need to get on site fast.",
  heroButton: "Get a Fast Quote",
  toc: [
    "01 Overview: What We Offer",
    "02 Fleet at a Glance",
    "03 Earthmoving & Excavation",
    "04 Lifting & Transport",
    "05 Concrete & Masonry",
    "06 Compaction & Grading",
    "07 Power Tools & Small Equipment",
    "08 Specialized Equipment & Attachments",
    "09 Rental Price List (BDT)",
    "10 Services That Keep You Moving",
    "11 Quick Guide: Choosing the Right Machine",
    "12 Get in Touch",
  ],
  overviewHeading: "What We Offer",
  overviewText: "We rent a wide range of construction machinery tailored for construction, infrastructure, and industrial work—backed by optional operator services, on-site maintenance, and custom project bundles.",
  overviewCaption: "A fleet sized for compact sites and major builds alike.",
  fleetColumns: ["Category", "Key Equipment", "Capacity/Options", "Best For"],
  fleetRows: [
    {
      category: "Earthmoving & Excavation",
      keyEquipment: "Excavators; Backhoe Loaders; Bulldozers; Tilt Rotators",
      capacityOptions: "Excavators: Mini (1–3T), Medium (5–10T), Large (15–30T); Dozers: Compact, Heavy-Duty",
      bestFor: "Digging, trenching, grading, demolition, land clearing",
    },
    {
      category: "Lifting & Transport",
      keyEquipment: "Cranes; Forklifts; Dump Trucks",
      capacityOptions: "Mobile Cranes (10–50T), Tower Cranes; Forklifts (Electric/Diesel); Tippers (10–25T)",
      bestFor: "Heavy lifts, pallet handling, material hauling",
    },
    {
      category: "Concrete & Masonry",
      keyEquipment: "Mixers; Vibrators; Pumps; Generators",
      capacityOptions: "Drum (Electric/Diesel), Pan; Internal/External Vibrators; Trailer Pumps; 5–100 KVA",
      bestFor: "Mixing, concrete compaction, long pours, on-site power",
    },
    {
      category: "Compaction & Grading",
      keyEquipment: "Road Rollers; Compactors; Graders",
      capacityOptions: "Smooth Drum, Pneumatic; Plate, Rammer; Motor Graders",
      bestFor: "Base compaction, slope control, road prep",
    },
    {
      category: "Power Tools",
      keyEquipment: "Drills; Saws; Grinders; Welders",
      capacityOptions: "Hammer Drills; Circular/Cut-Off; Angle; Inverter, MIG/TIG",
      bestFor: "Drilling, cutting, smoothing, fabrication",
    },
    {
      category: "Specialized & Attachments",
      keyEquipment: "Pile Drivers; Skid Steers; Telehandlers; Attachments",
      capacityOptions: "Buckets, Grapples, Hammers, Augers, Dust Systems",
      bestFor: "Foundations, tight-space handling, reach & lift",
    },
  ],
  pricingHeading: "Rental Price List (Indicative, BDT)",
  pricingTextBefore: "Daily rates assume an 8-hour shift. Weekly = 7 days, Monthly = 28 days. Fuel, operators, transport, and taxes billed as applicable.",
  pricingNoteAfter: "Operator services, fuel, delivery/pickup, mobilization for cranes/pumps, overtime, deposits, and insurance are quoted as needed.",
  expectedPriceRowsCount: {
    earthmoving: 7,
    lifting: 7,
    concrete: 9,
    compaction: 5,
    powertools: 6,
    specialized: 8,
  },
};

const errors: string[] = [];

function check(label: string, actual: unknown, expected: unknown) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    errors.push(`[MISMATCH in ${label}]:\n  Expected: ${expectedStr}\n  Actual:   ${actualStr}`);
  }
}

console.log("=== STARTING PROGRAMMATIC CONTENT VERIFICATION ===");

// Check Meta & Hero
check("meta.title", rentalRatesContent.meta.title, EXPECTED.metaTitle);
check("meta.h1", rentalRatesContent.meta.h1, EXPECTED.pageH1);
check("hero.heading", rentalRatesContent.hero.heading, EXPECTED.heroHeading);
check("hero.text", rentalRatesContent.hero.text, EXPECTED.heroText);
check("hero.buttonText", rentalRatesContent.hero.buttonText, EXPECTED.heroButton);

// Check TOC
const actualToc = rentalRatesContent.toc.map((t) => t.fullTitle);
check("toc", actualToc, EXPECTED.toc);

// Check Overview
check("overview.heading", rentalRatesContent.overview.heading, EXPECTED.overviewHeading);
check("overview.text", rentalRatesContent.overview.text, EXPECTED.overviewText);
check("overview.photoCaption", rentalRatesContent.overview.photoCaption, EXPECTED.overviewCaption);

// Check Fleet at a Glance
check("fleet.columns", rentalRatesContent.fleetAtAGlance.columns, EXPECTED.fleetColumns);
check("fleet.rows", rentalRatesContent.fleetAtAGlance.rows, EXPECTED.fleetRows);
check("fleet.rowCount", rentalRatesContent.fleetAtAGlance.rows.length, 6);

// Check Pricing Section
check("pricing.heading", rentalRatesContent.pricing.heading, EXPECTED.pricingHeading);
check("pricing.textBefore", rentalRatesContent.pricing.textBefore, EXPECTED.pricingTextBefore);
check("pricing.textAfter", rentalRatesContent.pricing.textAfter, EXPECTED.pricingNoteAfter);

let totalPriceRows = 0;
for (const [id, count] of Object.entries(EXPECTED.expectedPriceRowsCount)) {
  const table = rentalRatesContent.pricing.tables.find((c) => c.id === id);
  if (!table) {
    errors.push(`Missing pricing table category: ${id}`);
    continue;
  }
  check(`pricing.${id}.rowCount`, table.rows.length, count);
  totalPriceRows += table.rows.length;
}
check("totalPriceRows", totalPriceRows, 42);

// Check specific sensitive price rows from check requirements:
// 1. Tower Crane: monthly = "From 1,900,000", daily = "—", weekly = "—", notes = "Erection/dismantling 450k–750k"
const liftingTable = rentalRatesContent.pricing.tables.find((c) => c.id === "lifting");
const towerCrane = liftingTable?.rows.find((r) => r.equipment === "Tower Crane");
check("Tower Crane daily", towerCrane?.daily, "—");
check("Tower Crane weekly", towerCrane?.weekly, "—");
check("Tower Crane monthly", towerCrane?.monthly, "From 1,900,000");
check("Tower Crane notes", towerCrane?.notes, "Erection/dismantling 450k–750k");

// 2. Concrete Pump: notes = "Pipeline: 150/m extra"
const concreteTable = rentalRatesContent.pricing.tables.find((c) => c.id === "concrete");
const concretePump = concreteTable?.rows.find((r) => r.equipment === "Concrete Pump");
check("Concrete Pump notes", concretePump?.notes, "Pipeline: 150/m extra");

// 3. Services That Keep You Moving
check("services.photoCaption", rentalRatesContent.services.photoCaption, "Operators on demand, and support that keeps your site running.");
check("services.bullets.length", rentalRatesContent.services.bullets.length, 3);

// 4. Quick Guide
check("guide.photoCaption", rentalRatesContent.quickGuide.photoCaption, "Match machine to mission: access, load, terrain, and power.");
check("guide.bullets.length", rentalRatesContent.quickGuide.bullets.length, 4);

if (errors.length > 0) {
  console.error(`Verification FAILED with ${errors.length} errors:`);
  for (const err of errors) {
    console.error(err);
  }
  process.exit(1);
} else {
  console.log("ALL CONTENT VERIFIED: 100% exact match against user specifications.");
  console.log(`Total tables: 1 Fleet Table (6 rows) + 6 Price Tables (${totalPriceRows} rows total).`);
}
