import { aboutContent } from "../src/data/about-content";

// Exact text from user prompt CONTENT section
const expectedContent = {
  pageTitle: "About M/S Mir Sulaiman Trade Center",
  subtitle: "Construction machinery rental | Excavators, Backhoe Loaders, Bulldozers, Concrete Mixers, Vibrators.",
  introHeading: "Build With Confidence: The Construction Machinery Rental Guide by M/S Mir Sulaiman Trade Center",
  introParagraph: "From first dig to final finish, the right machine at the right time changes everything. At M/S Mir Sulaiman Trade Center, our rental fleet is curated for construction, infrastructure, and industrial projects—reliable, well-maintained, and ready to work. Explore our lineup, discover what fits your site, and get moving faster.",
  overviewHeading: "Overview: What We Offer",
  overviewParagraph: "We provide a comprehensive range of construction machinery for rent—backed by skilled operators (optional), on-site maintenance support, and tailored project bundles for large jobs. Whether you're trenching, grading, lifting, pouring, or finishing, we've got the right tools on call.",
  fleetHeading: "Fleet at a Glance (Quick Table)",
  fleetRows: [
    {
      category: "Earthmoving & Excavation",
      keyEquipment: "Excavators; Backhoe Loaders; Bulldozers; Tilt Rotators",
      capacity: "Excavators: Mini (1–3T), Medium (5–10T), Large (15–30T); Dozers: Compact, Heavy-Duty",
      bestFor: "Digging, trenching, grading, demolition, land clearing",
    },
    {
      category: "Lifting & Transport",
      keyEquipment: "Cranes; Forklifts; Dump Trucks",
      capacity: "Mobile Cranes (10–50T), Tower Cranes; Forklifts (Electric/Diesel); Tipper Trucks (10–25T)",
      bestFor: "Heavy lifts, pallet handling, material hauling",
    },
    {
      category: "Concrete & Masonry",
      keyEquipment: "Mixers; Vibrators; Pumps; Generators",
      capacity: "Drum (Electric/Diesel), Pan; Internal/External Vibrators; Trailer-Mounted Pumps; Generators (5–100 KVA)",
      bestFor: "Mixing, compacting concrete, long-distance pours, on-site power",
    },
    {
      category: "Compaction & Grading",
      keyEquipment: "Road Rollers; Compactors; Graders",
      capacity: "Smooth Drum, Pneumatic; Plate, Rammer; Motor Graders",
      bestFor: "Base compaction, slope control, road prep",
    },
    {
      category: "Power Tools & Small Equipment",
      keyEquipment: "Drills; Saws; Grinders; Welding Machines",
      capacity: "Hammer Drills; Circular & Cut-Off Saws; Angle Grinders; Inverter, MIG/TIG Welders",
      bestFor: "Drilling, cutting, smoothing, fabrication",
    },
    {
      category: "Specialized & Attachments",
      keyEquipment: "Pile Drivers; Skid Steers & Loaders; Telehandlers; Attachments",
      capacity: "Buckets, Grapple Claws, Hydraulic Hammers, Augers, Loader Buckets, Dust Suppression Systems",
      bestFor: "Foundations, tight-space handling, reach & lift, machine upgrades",
    },
  ],
  categoryItems: [
    {
      heading: "Earthmoving & Excavation Equipment",
      items: [
        "Excavators: Mini (1–3 Ton), Medium (5–10 Ton), Large (15–30 Ton). Ideal for digging, trenching, and demolition—choose size based on site access, depth, and volume.",
        "Backhoe Loaders: Multi-purpose machines for digging, loading, and grading—perfect for small to mid-sized projects.",
        "Bulldozers: Compact and Heavy-Duty options for clearing land, leveling surfaces, and pushing debris.",
        "Tilt Rotators: Precision attachments that increase reach angles and control—great for fine trenching and lifting.",
      ],
    },
    {
      heading: "Lifting & Transport Equipment",
      items: [
        "Cranes: Mobile Cranes (10–50 Ton capacity) and Tower Cranes for heavy material lifting and accurate placement at height.",
        "Forklifts: Electric & Diesel units to move pallets, pipes, and materials efficiently on-site or in the yard.",
        "Dump Trucks: Tipper Trucks (10–25 Ton capacity) for hauling soil, sand, aggregates, and demolition waste.",
      ],
    },
    {
      heading: "Concrete & Masonry Equipment",
      items: [
        "Concrete Mixers: Drum Mixers (Electric & Diesel) and Pan Mixers for consistent, on-time batching.",
        "Concrete Vibrators: Internal and External Vibrators to achieve dense, crack-free curing.",
        "Concrete Pumps: Trailer-Mounted Concrete Pumps for fast, precise pouring over long distances or hard-to-reach forms.",
        "Generators: Portable Generators (5KVA–100KVA) to power tools, lighting, and site essentials.",
      ],
    },
    {
      heading: "Compaction & Grading Equipment",
      items: [
        "Road Rollers: Smooth Drum and Pneumatic Rollers for roads, yards, and foundations.",
        "Compactors: Plate Compactors and Rammers ideal for soil, sand, and gravel—especially trenches and pads.",
        "Graders: Motor Graders for fine grading, slope smoothing, and road preparation.",
      ],
    },
    {
      heading: "Power Tools & Small Equipment",
      items: [
        "Drills & Hammer Drills: For concrete, masonry, wood, and steel.",
        "Saws: Circular Saws and Cut-Off Saws for clean, accurate cuts in wood, metal, and tiles.",
        "Grinders: Angle Grinders for cutting, smoothing, and polishing.",
        "Welding Machines: Inverter Welders and MIG/TIG Welders for on-site fabrication and repair.",
      ],
    },
    {
      heading: "Specialized Equipment & Attachments",
      items: [
        "Pile Drivers: For driving foundation piles with precision and stability.",
        "Skid Steers & Loaders: Compact, agile, and versatile for loading, digging, and material handling—especially in tight sites.",
        "Telehandlers: Combine the functions of a crane, forklift, and loader—ideal for reach, height, and versatility.",
        "Attachments & Accessories: Bucket Attachments, Grapple Claws, Hydraulic Hammers, Augers, Loader Buckets, Dust Suppression Systems.",
      ],
    },
  ],
  servicesHeading: "Services That Keep You Moving",
  servicesItems: [
    "Operator Services: Certified, skilled operators available for safe, efficient machine operation (extra charges apply).",
    "Maintenance & Repairs: On-site servicing and repairs during rental periods to minimize downtime.",
    "Project-Specific Packages: Customized equipment bundles for large or long-term projects—matched to scope, budget, and timeline.",
  ],
  quickGuideHeading: "Quick Guide: Choosing the Right Machine",
  quickGuideItems: [
    "Site Access and Space: Tight site? Consider mini excavators, skid steers, and electric forklifts.",
    "Load, Reach, and Height: Check lift weight and boom height for cranes and telehandlers; choose excavator size by dig depth and bucket volume.",
    "Material Volume and Terrain: Use tipper trucks sized to your haul cycle; choose rollers and compactors based on base layers and soil type.",
    "Power Needs: Calculate total tool loads and add headroom when selecting generators (5–100 KVA range).",
  ],
  contactHeading: "Let's Get Your Project Moving",
  contactSentence: "For rentals, pricing, and bookings:",
};

function verify() {
  const errors: string[] = [];

  function assertEqual(actual: string, expected: string, label: string) {
    if (actual !== expected) {
      errors.push(
        `[MISMATCH] ${label}:\n  Expected: "${expected}"\n  Actual:   "${actual}"`
      );
    }
  }

  // 1. Hero
  assertEqual(aboutContent.hero.pageTitle, expectedContent.pageTitle, "Hero Page Title");
  assertEqual(aboutContent.hero.subtitle, expectedContent.subtitle, "Hero Subtitle");

  // 2. Intro
  assertEqual(aboutContent.intro.heading, expectedContent.introHeading, "Intro Heading");
  assertEqual(aboutContent.intro.paragraph, expectedContent.introParagraph, "Intro Paragraph");

  // 3. Overview
  assertEqual(aboutContent.overview.heading, expectedContent.overviewHeading, "Overview Heading");
  assertEqual(aboutContent.overview.paragraph, expectedContent.overviewParagraph, "Overview Paragraph");

  // 4. Fleet table
  assertEqual(aboutContent.fleetTable.heading, expectedContent.fleetHeading, "Fleet Table Heading");
  expectedContent.fleetRows.forEach((row, i) => {
    const actual = aboutContent.fleetTable.rows[i];
    assertEqual(actual.category, row.category, `Fleet Row ${i} Category`);
    assertEqual(actual.keyEquipment, row.keyEquipment, `Fleet Row ${i} Key Equipment`);
    assertEqual(actual.capacity, row.capacity, `Fleet Row ${i} Capacity`);
    assertEqual(actual.bestFor, row.bestFor, `Fleet Row ${i} Best For`);
  });

  // 5. Category Accordion items
  expectedContent.categoryItems.forEach((cat, i) => {
    const actualCat = aboutContent.categories[i];
    assertEqual(actualCat.heading, cat.heading, `Category ${i} Heading`);
    cat.items.forEach((itemText, j) => {
      const actualItem = actualCat.items[j];
      assertEqual(actualItem.fullText, itemText, `Category ${i} Item ${j}`);
    });
  });

  // 6. Services
  assertEqual(aboutContent.services.heading, expectedContent.servicesHeading, "Services Heading");
  expectedContent.servicesItems.forEach((itemText, i) => {
    assertEqual(aboutContent.services.items[i].fullText, itemText, `Services Item ${i}`);
  });

  // 7. Quick Guide
  assertEqual(aboutContent.quickGuide.heading, expectedContent.quickGuideHeading, "Quick Guide Heading");
  expectedContent.quickGuideItems.forEach((itemText, i) => {
    assertEqual(aboutContent.quickGuide.items[i].fullText, itemText, `Quick Guide Item ${i}`);
  });

  // 8. Contact
  assertEqual(aboutContent.contact.heading, expectedContent.contactHeading, "Contact Heading");
  assertEqual(aboutContent.contact.sentence, expectedContent.contactSentence, "Contact Sentence");

  if (errors.length > 0) {
    console.error("Text verification FAILED with errors:\n" + errors.join("\n\n"));
    process.exit(1);
  } else {
    console.log("All About page content perfectly matches the user CONTENT specification word-for-word!");
  }
}

verify();
