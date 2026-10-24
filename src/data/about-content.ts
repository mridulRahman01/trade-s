export interface FleetTableRow {
  category: string;
  keyEquipment: string;
  capacity: string;
  bestFor: string;
}

export interface CategorySection {
  id: string;
  heading: string;
  items: Array<{
    term: string;
    details: string;
    fullText: string;
  }>;
}

export interface BulletListSection {
  heading: string;
  items: Array<{
    term: string;
    details: string;
    fullText: string;
  }>;
}

export const aboutContent = {
  hero: {
    pageTitle: "About M/S Mir Sulaiman Trade Center",
    subtitle:
      "Construction machinery rental | Excavators, Backhoe Loaders, Bulldozers, Concrete Mixers, Vibrators.",
  },
  intro: {
    heading:
      "Build With Confidence: The Construction Machinery Rental Guide by M/S Mir Sulaiman Trade Center",
    paragraph:
      "From first dig to final finish, the right machine at the right time changes everything. At M/S Mir Sulaiman Trade Center, our rental fleet is curated for construction, infrastructure, and industrial projects—reliable, well-maintained, and ready to work. Explore our lineup, discover what fits your site, and get moving faster.",
  },
  overview: {
    heading: "Overview: What We Offer",
    paragraph:
      "We provide a comprehensive range of construction machinery for rent—backed by skilled operators (optional), on-site maintenance support, and tailored project bundles for large jobs. Whether you're trenching, grading, lifting, pouring, or finishing, we've got the right tools on call.",
  },
  fleetTable: {
    heading: "Fleet at a Glance (Quick Table)",
    columns: ["Category", "Key Equipment", "Capacity/Options", "Best For"] as const,
    rows: [
      {
        category: "Earthmoving & Excavation",
        keyEquipment: "Excavators; Backhoe Loaders; Bulldozers; Tilt Rotators",
        capacity:
          "Excavators: Mini (1–3T), Medium (5–10T), Large (15–30T); Dozers: Compact, Heavy-Duty",
        bestFor: "Digging, trenching, grading, demolition, land clearing",
      },
      {
        category: "Lifting & Transport",
        keyEquipment: "Cranes; Forklifts; Dump Trucks",
        capacity:
          "Mobile Cranes (10–50T), Tower Cranes; Forklifts (Electric/Diesel); Tipper Trucks (10–25T)",
        bestFor: "Heavy lifts, pallet handling, material hauling",
      },
      {
        category: "Concrete & Masonry",
        keyEquipment: "Mixers; Vibrators; Pumps; Generators",
        capacity:
          "Drum (Electric/Diesel), Pan; Internal/External Vibrators; Trailer-Mounted Pumps; Generators (5–100 KVA)",
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
        capacity:
          "Hammer Drills; Circular & Cut-Off Saws; Angle Grinders; Inverter, MIG/TIG Welders",
        bestFor: "Drilling, cutting, smoothing, fabrication",
      },
      {
        category: "Specialized & Attachments",
        keyEquipment:
          "Pile Drivers; Skid Steers & Loaders; Telehandlers; Attachments",
        capacity:
          "Buckets, Grapple Claws, Hydraulic Hammers, Augers, Loader Buckets, Dust Suppression Systems",
        bestFor:
          "Foundations, tight-space handling, reach & lift, machine upgrades",
      },
    ] as FleetTableRow[],
  },
  categories: [
    {
      id: "earthmoving-excavation",
      heading: "Earthmoving & Excavation Equipment",
      items: [
        {
          term: "Excavators:",
          details:
            "Mini (1–3 Ton), Medium (5–10 Ton), Large (15–30 Ton). Ideal for digging, trenching, and demolition—choose size based on site access, depth, and volume.",
          fullText:
            "Excavators: Mini (1–3 Ton), Medium (5–10 Ton), Large (15–30 Ton). Ideal for digging, trenching, and demolition—choose size based on site access, depth, and volume.",
        },
        {
          term: "Backhoe Loaders:",
          details:
            "Multi-purpose machines for digging, loading, and grading—perfect for small to mid-sized projects.",
          fullText:
            "Backhoe Loaders: Multi-purpose machines for digging, loading, and grading—perfect for small to mid-sized projects.",
        },
        {
          term: "Bulldozers:",
          details:
            "Compact and Heavy-Duty options for clearing land, leveling surfaces, and pushing debris.",
          fullText:
            "Bulldozers: Compact and Heavy-Duty options for clearing land, leveling surfaces, and pushing debris.",
        },
        {
          term: "Tilt Rotators:",
          details:
            "Precision attachments that increase reach angles and control—great for fine trenching and lifting.",
          fullText:
            "Tilt Rotators: Precision attachments that increase reach angles and control—great for fine trenching and lifting.",
        },
      ],
    },
    {
      id: "lifting-transport",
      heading: "Lifting & Transport Equipment",
      items: [
        {
          term: "Cranes:",
          details:
            "Mobile Cranes (10–50 Ton capacity) and Tower Cranes for heavy material lifting and accurate placement at height.",
          fullText:
            "Cranes: Mobile Cranes (10–50 Ton capacity) and Tower Cranes for heavy material lifting and accurate placement at height.",
        },
        {
          term: "Forklifts:",
          details:
            "Electric & Diesel units to move pallets, pipes, and materials efficiently on-site or in the yard.",
          fullText:
            "Forklifts: Electric & Diesel units to move pallets, pipes, and materials efficiently on-site or in the yard.",
        },
        {
          term: "Dump Trucks:",
          details:
            "Tipper Trucks (10–25 Ton capacity) for hauling soil, sand, aggregates, and demolition waste.",
          fullText:
            "Dump Trucks: Tipper Trucks (10–25 Ton capacity) for hauling soil, sand, aggregates, and demolition waste.",
        },
      ],
    },
    {
      id: "concrete-masonry",
      heading: "Concrete & Masonry Equipment",
      items: [
        {
          term: "Concrete Mixers:",
          details:
            "Drum Mixers (Electric & Diesel) and Pan Mixers for consistent, on-time batching.",
          fullText:
            "Concrete Mixers: Drum Mixers (Electric & Diesel) and Pan Mixers for consistent, on-time batching.",
        },
        {
          term: "Concrete Vibrators:",
          details:
            "Internal and External Vibrators to achieve dense, crack-free curing.",
          fullText:
            "Concrete Vibrators: Internal and External Vibrators to achieve dense, crack-free curing.",
        },
        {
          term: "Concrete Pumps:",
          details:
            "Trailer-Mounted Concrete Pumps for fast, precise pouring over long distances or hard-to-reach forms.",
          fullText:
            "Concrete Pumps: Trailer-Mounted Concrete Pumps for fast, precise pouring over long distances or hard-to-reach forms.",
        },
        {
          term: "Generators:",
          details:
            "Portable Generators (5KVA–100KVA) to power tools, lighting, and site essentials.",
          fullText:
            "Generators: Portable Generators (5KVA–100KVA) to power tools, lighting, and site essentials.",
        },
      ],
    },
    {
      id: "compaction-grading",
      heading: "Compaction & Grading Equipment",
      items: [
        {
          term: "Road Rollers:",
          details:
            "Smooth Drum and Pneumatic Rollers for roads, yards, and foundations.",
          fullText:
            "Road Rollers: Smooth Drum and Pneumatic Rollers for roads, yards, and foundations.",
        },
        {
          term: "Compactors:",
          details:
            "Plate Compactors and Rammers ideal for soil, sand, and gravel—especially trenches and pads.",
          fullText:
            "Compactors: Plate Compactors and Rammers ideal for soil, sand, and gravel—especially trenches and pads.",
        },
        {
          term: "Graders:",
          details:
            "Motor Graders for fine grading, slope smoothing, and road preparation.",
          fullText:
            "Graders: Motor Graders for fine grading, slope smoothing, and road preparation.",
        },
      ],
    },
    {
      id: "power-tools",
      heading: "Power Tools & Small Equipment",
      items: [
        {
          term: "Drills & Hammer Drills:",
          details: "For concrete, masonry, wood, and steel.",
          fullText:
            "Drills & Hammer Drills: For concrete, masonry, wood, and steel.",
        },
        {
          term: "Saws:",
          details:
            "Circular Saws and Cut-Off Saws for clean, accurate cuts in wood, metal, and tiles.",
          fullText:
            "Saws: Circular Saws and Cut-Off Saws for clean, accurate cuts in wood, metal, and tiles.",
        },
        {
          term: "Grinders:",
          details: "Angle Grinders for cutting, smoothing, and polishing.",
          fullText: "Grinders: Angle Grinders for cutting, smoothing, and polishing.",
        },
        {
          term: "Welding Machines:",
          details:
            "Inverter Welders and MIG/TIG Welders for on-site fabrication and repair.",
          fullText:
            "Welding Machines: Inverter Welders and MIG/TIG Welders for on-site fabrication and repair.",
        },
      ],
    },
    {
      id: "specialized-attachments",
      heading: "Specialized Equipment & Attachments",
      items: [
        {
          term: "Pile Drivers:",
          details:
            "For driving foundation piles with precision and stability.",
          fullText:
            "Pile Drivers: For driving foundation piles with precision and stability.",
        },
        {
          term: "Skid Steers & Loaders:",
          details:
            "Compact, agile, and versatile for loading, digging, and material handling—especially in tight sites.",
          fullText:
            "Skid Steers & Loaders: Compact, agile, and versatile for loading, digging, and material handling—especially in tight sites.",
        },
        {
          term: "Telehandlers:",
          details:
            "Combine the functions of a crane, forklift, and loader—ideal for reach, height, and versatility.",
          fullText:
            "Telehandlers: Combine the functions of a crane, forklift, and loader—ideal for reach, height, and versatility.",
        },
        {
          term: "Attachments & Accessories:",
          details:
            "Bucket Attachments, Grapple Claws, Hydraulic Hammers, Augers, Loader Buckets, Dust Suppression Systems.",
          fullText:
            "Attachments & Accessories: Bucket Attachments, Grapple Claws, Hydraulic Hammers, Augers, Loader Buckets, Dust Suppression Systems.",
        },
      ],
    },
  ] as CategorySection[],
  services: {
    heading: "Services That Keep You Moving",
    items: [
      {
        term: "Operator Services:",
        details:
          "Certified, skilled operators available for safe, efficient machine operation (extra charges apply).",
        fullText:
          "Operator Services: Certified, skilled operators available for safe, efficient machine operation (extra charges apply).",
      },
      {
        term: "Maintenance & Repairs:",
        details:
          "On-site servicing and repairs during rental periods to minimize downtime.",
        fullText:
          "Maintenance & Repairs: On-site servicing and repairs during rental periods to minimize downtime.",
      },
      {
        term: "Project-Specific Packages:",
        details:
          "Customized equipment bundles for large or long-term projects—matched to scope, budget, and timeline.",
        fullText:
          "Project-Specific Packages: Customized equipment bundles for large or long-term projects—matched to scope, budget, and timeline.",
      },
    ],
  } as BulletListSection,
  quickGuide: {
    heading: "Quick Guide: Choosing the Right Machine",
    items: [
      {
        term: "Site Access and Space:",
        details:
          "Tight site? Consider mini excavators, skid steers, and electric forklifts.",
        fullText:
          "Site Access and Space: Tight site? Consider mini excavators, skid steers, and electric forklifts.",
      },
      {
        term: "Load, Reach, and Height:",
        details:
          "Check lift weight and boom height for cranes and telehandlers; choose excavator size by dig depth and bucket volume.",
        fullText:
          "Load, Reach, and Height: Check lift weight and boom height for cranes and telehandlers; choose excavator size by dig depth and bucket volume.",
      },
      {
        term: "Material Volume and Terrain:",
        details:
          "Use tipper trucks sized to your haul cycle; choose rollers and compactors based on base layers and soil type.",
        fullText:
          "Material Volume and Terrain: Use tipper trucks sized to your haul cycle; choose rollers and compactors based on base layers and soil type.",
      },
      {
        term: "Power Needs:",
        details:
          "Calculate total tool loads and add headroom when selecting generators (5–100 KVA range).",
        fullText:
          "Power Needs: Calculate total tool loads and add headroom when selecting generators (5–100 KVA range).",
      },
    ],
  } as BulletListSection,
  contact: {
    heading: "Let's Get Your Project Moving",
    sentence: "For rentals, pricing, and bookings:",
  },
};
