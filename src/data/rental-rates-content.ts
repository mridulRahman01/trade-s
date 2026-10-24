export interface FleetRow {
  category: string;
  keyEquipment: string;
  capacityOptions: string;
  bestFor: string;
}

export interface PriceRow {
  equipment: string;
  sizeOption: string;
  daily: string;
  weekly: string;
  monthly: string;
  notes: string;
}

export interface PriceTableCategory {
  id: string;
  name: string;
  secondColHeader: "Size/Capacity" | "Option" | "Model/Type";
  rows: PriceRow[];
}

export interface CategoryContentSection {
  id: string;
  heading: string;
  photoCaption: string;
  imageSrc: string;
  imageAlt: string;
  bullets: {
    lead: string;
    text: string;
  }[];
}

export interface TocItem {
  id: string;
  number: string;
  label: string;
  fullTitle: string;
}

export const rentalRatesContent = {
  meta: {
    title: "Rental Price List – M/S Mir Sulaiman Trade Center",
    description:
      "Indicative BDT rental rates for excavators, cranes, concrete equipment, road rollers, generators, and heavy machinery in Tabunia Bazaar, Pabna, Bangladesh.",
    h1: "Rental Price List",
  },
  hero: {
    heading: "Build With Confidence",
    text: "Your complete guide to construction machinery rentals—equipment photos, quick comparisons, transparent pricing, and everything you need to get on site fast.",
    buttonText: "Get a Fast Quote",
  },
  toc: [
    { id: "overview", number: "01", label: "Overview: What We Offer", fullTitle: "01 Overview: What We Offer" },
    { id: "glance", number: "02", label: "Fleet at a Glance", fullTitle: "02 Fleet at a Glance" },
    { id: "earthmoving", number: "03", label: "Earthmoving & Excavation", fullTitle: "03 Earthmoving & Excavation" },
    { id: "lifting", number: "04", label: "Lifting & Transport", fullTitle: "04 Lifting & Transport" },
    { id: "concrete", number: "05", label: "Concrete & Masonry", fullTitle: "05 Concrete & Masonry" },
    { id: "compaction", number: "06", label: "Compaction & Grading", fullTitle: "06 Compaction & Grading" },
    { id: "powertools", number: "07", label: "Power Tools & Small Equipment", fullTitle: "07 Power Tools & Small Equipment" },
    { id: "specialized", number: "08", label: "Specialized Equipment & Attachments", fullTitle: "08 Specialized Equipment & Attachments" },
    { id: "pricing", number: "09", label: "Rental Price List (BDT)", fullTitle: "09 Rental Price List (BDT)" },
    { id: "services", number: "10", label: "Services That Keep You Moving", fullTitle: "10 Services That Keep You Moving" },
    { id: "guide", number: "11", label: "Quick Guide: Choosing the Right Machine", fullTitle: "11 Quick Guide: Choosing the Right Machine" },
    { id: "contact", number: "12", label: "Get in Touch", fullTitle: "12 Get in Touch" },
  ] as TocItem[],
  overview: {
    heading: "What We Offer",
    text: "We rent a wide range of construction machinery tailored for construction, infrastructure, and industrial work—backed by optional operator services, on-site maintenance, and custom project bundles.",
    photoCaption: "A fleet sized for compact sites and major builds alike.",
    imageSrc: "/images/hero/hero-fleet.webp",
    imageAlt: "Heavy construction equipment fleet including excavators and earthmoving machinery",
  },
  fleetAtAGlance: {
    heading: "Fleet at a Glance",
    columns: ["Category", "Key Equipment", "Capacity/Options", "Best For"] as const,
    rows: [
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
    ] as FleetRow[],
  },
  categories: [
    {
      id: "earthmoving",
      heading: "Earthmoving & Excavation",
      photoCaption: "From tight-access digs to deep cuts—excavators for every site.",
      imageSrc: "/images/rates/earthmoving.webp",
      imageAlt: "Heavy crawler excavator performing site earthmoving excavation",
      bullets: [
        {
          lead: "Excavators:",
          text: "Mini (1–3T), Medium (5–10T), Large (15–30T) — ideal for digging, trenching, and demolition.",
        },
        {
          lead: "Backhoe Loaders:",
          text: "Multi-purpose for digging, loading, and grading—perfect for small to mid-sized projects.",
        },
        {
          lead: "Bulldozers:",
          text: "Compact and Heavy-Duty—best for clearing land, leveling surfaces, and pushing debris.",
        },
        {
          lead: "Tilt Rotators:",
          text: "Precision attachments to enhance angles, reach, and lifting accuracy.",
        },
      ],
    },
    {
      id: "lifting",
      heading: "Lifting & Transport",
      photoCaption: "Safe, precise lifting—from mobile to tower cranes.",
      imageSrc: "/images/rates/lifting.webp",
      imageAlt: "Mobile crane performing heavy precision lifting on job site",
      bullets: [
        {
          lead: "Cranes:",
          text: "Mobile Cranes (10–50T) and Tower Cranes for heavy lifts and accurate placement.",
        },
        {
          lead: "Forklifts:",
          text: "Electric & Diesel for pallets, pipes, and material movement on site.",
        },
        {
          lead: "Dump Trucks:",
          text: "Tipper Trucks (10–25T) for hauling soil, sand, aggregate, and debris.",
        },
      ],
    },
    {
      id: "concrete",
      heading: "Concrete & Masonry",
      photoCaption: "Quality concrete starts with the right mixers, pumps, and vibrators.",
      imageSrc: "/images/rates/concrete.webp",
      imageAlt: "Concrete mixer and equipment on commercial job site",
      bullets: [
        {
          lead: "Concrete Mixers:",
          text: "Drum (Electric & Diesel) and Pan Mixers for consistent batching.",
        },
        {
          lead: "Concrete Vibrators:",
          text: "Internal and External Vibrators for dense, crack-free curing.",
        },
        {
          lead: "Concrete Pumps:",
          text: "Trailer-mounted for fast, precise long-distance pours.",
        },
        {
          lead: "Generators:",
          text: "Portable (5–100 KVA) to power tools, lighting, and site essentials.",
        },
      ],
    },
    {
      id: "compaction",
      heading: "Compaction & Grading",
      photoCaption: "Solid bases and smooth gradients for durable surfaces.",
      imageSrc: "/images/rates/compaction.webp",
      imageAlt: "Vibratory road roller compacting soil and asphalt base",
      bullets: [
        {
          lead: "Road Rollers:",
          text: "Smooth Drum and Pneumatic for roads, yards, and foundations.",
        },
        {
          lead: "Compactors:",
          text: "Plate Compactors and Rammers for soil, sand, and gravel—trenches and pads.",
        },
        {
          lead: "Graders:",
          text: "Motor Graders for fine grading, slope smoothing, and road preparation.",
        },
      ],
    },
    {
      id: "powertools",
      heading: "Power Tools & Small Equipment",
      photoCaption: "Professional-grade tools for drilling, cutting, smoothing, and welding.",
      imageSrc: "/images/rates/powertools.webp",
      imageAlt: "Professional power tools and welding equipment on job site",
      bullets: [
        {
          lead: "Drills & Hammer Drills:",
          text: "For concrete, masonry, wood, and steel.",
        },
        {
          lead: "Saws:",
          text: "Circular and Cut-Off for wood, metal, and tiles.",
        },
        {
          lead: "Grinders:",
          text: "Angle grinders for cutting, smoothing, and polishing.",
        },
        {
          lead: "Welding Machines:",
          text: "Inverter and MIG/TIG for on-site fabrication and repair.",
        },
      ],
    },
    {
      id: "specialized",
      heading: "Specialized Equipment & Attachments",
      photoCaption: "Telehandlers, skid steers, pile drivers—special tools for special tasks.",
      imageSrc: "/images/rates/specialized.webp",
      imageAlt: "Rough terrain telehandler and versatile machine attachments",
      bullets: [
        {
          lead: "Pile Drivers:",
          text: "For driving foundation piles with precision and stability.",
        },
        {
          lead: "Skid Steers & Loaders:",
          text: "Compact, agile machines for tight sites.",
        },
        {
          lead: "Telehandlers:",
          text: "Combine crane, forklift, and loader functions.",
        },
        {
          lead: "Attachments & Accessories:",
          text: "Buckets, Grapple Claws, Hydraulic Hammers, Augers, Loader Buckets, Dust Suppression Systems.",
        },
      ],
    },
  ] as CategoryContentSection[],
  pricing: {
    heading: "Rental Price List (Indicative, BDT)",
    textBefore:
      "Daily rates assume an 8-hour shift. Weekly = 7 days, Monthly = 28 days. Fuel, operators, transport, and taxes billed as applicable.",
    textAfter:
      "Operator services, fuel, delivery/pickup, mobilization for cranes/pumps, overtime, deposits, and insurance are quoted as needed.",
    tables: [
      {
        id: "earthmoving",
        name: "Earthmoving & Excavation",
        secondColHeader: "Size/Capacity",
        rows: [
          {
            equipment: "Excavator",
            sizeOption: "Mini 1–3T",
            daily: "9,500",
            weekly: "55,000",
            monthly: "200,000",
            notes: "Compact sites, trenching",
          },
          {
            equipment: "Excavator",
            sizeOption: "Medium 5–10T",
            daily: "15,000",
            weekly: "90,000",
            monthly: "330,000",
            notes: "General earthworks",
          },
          {
            equipment: "Excavator",
            sizeOption: "Large 15–30T",
            daily: "28,000",
            weekly: "175,000",
            monthly: "640,000",
            notes: "Heavy digging, demolition",
          },
          {
            equipment: "Backhoe Loader",
            sizeOption: "—",
            daily: "14,000",
            weekly: "85,000",
            monthly: "310,000",
            notes: "Multi-purpose utility",
          },
          {
            equipment: "Bulldozer",
            sizeOption: "Compact",
            daily: "20,000",
            weekly: "120,000",
            monthly: "440,000",
            notes: "Land clearing, leveling",
          },
          {
            equipment: "Bulldozer",
            sizeOption: "Heavy-Duty",
            daily: "32,000",
            weekly: "195,000",
            monthly: "720,000",
            notes: "Major push/grade work",
          },
          {
            equipment: "Tilt Rotator",
            sizeOption: "Attachment",
            daily: "4,000",
            weekly: "22,000",
            monthly: "80,000",
            notes: "Increases precision/control",
          },
        ],
      },
      {
        id: "lifting",
        name: "Lifting & Transport",
        secondColHeader: "Size/Capacity",
        rows: [
          {
            equipment: "Mobile Crane",
            sizeOption: "10–25T",
            daily: "35,000",
            weekly: "210,000",
            monthly: "780,000",
            notes: "Rigger on request",
          },
          {
            equipment: "Mobile Crane",
            sizeOption: "30–50T",
            daily: "55,000",
            weekly: "330,000",
            monthly: "1,250,000",
            notes: "Mobilization applies",
          },
          {
            equipment: "Tower Crane",
            sizeOption: "—",
            daily: "—",
            weekly: "—",
            monthly: "From 1,900,000",
            notes: "Erection/dismantling 450k–750k",
          },
          {
            equipment: "Forklift",
            sizeOption: "2–3T (Elec/Diesel)",
            daily: "6,500",
            weekly: "38,000",
            monthly: "140,000",
            notes: "Warehouse/site",
          },
          {
            equipment: "Forklift",
            sizeOption: "5T (Diesel)",
            daily: "10,500",
            weekly: "62,000",
            monthly: "230,000",
            notes: "Heavy pallets/pipes",
          },
          {
            equipment: "Tipper Truck",
            sizeOption: "10–16T",
            daily: "12,000",
            weekly: "70,000",
            monthly: "260,000",
            notes: "Haul soil/sand/aggregate",
          },
          {
            equipment: "Tipper Truck",
            sizeOption: "20–25T",
            daily: "18,000",
            weekly: "105,000",
            monthly: "390,000",
            notes: "High-volume hauling",
          },
        ],
      },
      {
        id: "concrete",
        name: "Concrete & Masonry",
        secondColHeader: "Option",
        rows: [
          {
            equipment: "Concrete Mixer",
            sizeOption: "Drum (Electric)",
            daily: "2,500",
            weekly: "14,000",
            monthly: "50,000",
            notes: "Small/medium batches",
          },
          {
            equipment: "Concrete Mixer",
            sizeOption: "Drum (Diesel 10/7)",
            daily: "4,500",
            weekly: "26,000",
            monthly: "95,000",
            notes: "Site batching",
          },
          {
            equipment: "Concrete Mixer",
            sizeOption: "Pan",
            daily: "6,000",
            weekly: "35,000",
            monthly: "130,000",
            notes: "Uniform mix",
          },
          {
            equipment: "Concrete Vibrator",
            sizeOption: "Internal",
            daily: "800",
            weekly: "4,500",
            monthly: "16,000",
            notes: "Dense curing",
          },
          {
            equipment: "Concrete Vibrator",
            sizeOption: "External",
            daily: "1,500",
            weekly: "8,500",
            monthly: "30,000",
            notes: "Precast/formwork",
          },
          {
            equipment: "Concrete Pump",
            sizeOption: "Trailer-Mounted",
            daily: "18,000",
            weekly: "105,000",
            monthly: "380,000",
            notes: "Pipeline: 150/m extra",
          },
          {
            equipment: "Generator",
            sizeOption: "5–10 KVA",
            daily: "2,500",
            weekly: "14,000",
            monthly: "48,000",
            notes: "Tools, lighting",
          },
          {
            equipment: "Generator",
            sizeOption: "20–40 KVA",
            daily: "5,500",
            weekly: "32,000",
            monthly: "118,000",
            notes: "Medium site power",
          },
          {
            equipment: "Generator",
            sizeOption: "60–100 KVA",
            daily: "8,500",
            weekly: "49,000",
            monthly: "180,000",
            notes: "Heavy loads",
          },
        ],
      },
      {
        id: "compaction",
        name: "Compaction & Grading",
        secondColHeader: "Size/Capacity",
        rows: [
          {
            equipment: "Plate Compactor",
            sizeOption: "—",
            daily: "1,200",
            weekly: "6,500",
            monthly: "24,000",
            notes: "Trenches, pads",
          },
          {
            equipment: "Rammer Compactor",
            sizeOption: "—",
            daily: "1,500",
            weekly: "8,500",
            monthly: "30,000",
            notes: "Tight spaces",
          },
          {
            equipment: "Road Roller",
            sizeOption: "Smooth Drum 3–5T",
            daily: "8,500",
            weekly: "50,000",
            monthly: "185,000",
            notes: "Base layers",
          },
          {
            equipment: "Road Roller",
            sizeOption: "Pneumatic 9–12T",
            daily: "12,000",
            weekly: "70,000",
            monthly: "260,000",
            notes: "Asphalt, finish",
          },
          {
            equipment: "Motor Grader",
            sizeOption: "12–14 ft",
            daily: "28,000",
            weekly: "170,000",
            monthly: "620,000",
            notes: "Final grading",
          },
        ],
      },
      {
        id: "powertools",
        name: "Power Tools & Small Equipment",
        secondColHeader: "Model/Type",
        rows: [
          {
            equipment: "Drill",
            sizeOption: "Hammer Drill",
            daily: "500",
            weekly: "2,800",
            monthly: "10,000",
            notes: "Concrete/masonry",
          },
          {
            equipment: "Saw",
            sizeOption: "Cut-Off Saw",
            daily: "1,500",
            weekly: "8,500",
            monthly: "30,000",
            notes: "Concrete/metal",
          },
          {
            equipment: "Saw",
            sizeOption: "Circular Saw",
            daily: "400",
            weekly: "2,200",
            monthly: "8,000",
            notes: "Wood panels",
          },
          {
            equipment: "Grinder",
            sizeOption: "Angle Grinder",
            daily: "400",
            weekly: "2,200",
            monthly: "8,000",
            notes: "Cutting/polishing",
          },
          {
            equipment: "Welding Machine",
            sizeOption: "Inverter 200A",
            daily: "800",
            weekly: "4,500",
            monthly: "16,000",
            notes: "Site fabrication",
          },
          {
            equipment: "Welding Machine",
            sizeOption: "MIG/TIG",
            daily: "1,800",
            weekly: "10,500",
            monthly: "38,000",
            notes: "Precision welding",
          },
        ],
      },
      {
        id: "specialized",
        name: "Specialized Equipment & Attachments",
        secondColHeader: "Size/Capacity",
        rows: [
          {
            equipment: "Pile Driver",
            sizeOption: "Hydraulic",
            daily: "65,000",
            weekly: "390,000",
            monthly: "1,450,000",
            notes: "Mobilization extra",
          },
          {
            equipment: "Skid Steer",
            sizeOption: "—",
            daily: "12,000",
            weekly: "70,000",
            monthly: "260,000",
            notes: "Tight-site all-rounder",
          },
          {
            equipment: "Wheel Loader",
            sizeOption: "1.5–3 m³",
            daily: "16,000",
            weekly: "96,000",
            monthly: "360,000",
            notes: "Material handling",
          },
          {
            equipment: "Telehandler",
            sizeOption: "7–12 m",
            daily: "24,000",
            weekly: "145,000",
            monthly: "540,000",
            notes: "Reach & lift",
          },
          {
            equipment: "Hydraulic Hammer",
            sizeOption: "Excavator Attachment",
            daily: "8,000",
            weekly: "47,000",
            monthly: "175,000",
            notes: "Breaker hire",
          },
          {
            equipment: "Auger",
            sizeOption: "Excavator Attachment",
            daily: "3,500",
            weekly: "20,000",
            monthly: "72,000",
            notes: "Piles/footings",
          },
          {
            equipment: "Grapple",
            sizeOption: "Excavator Attachment",
            daily: "1,800",
            weekly: "10,500",
            monthly: "38,000",
            notes: "Sorting/debris",
          },
          {
            equipment: "Dust Suppression",
            sizeOption: "Cannon/System",
            daily: "2,500",
            weekly: "14,000",
            monthly: "50,000",
            notes: "Demolition, dry sites",
          },
        ],
      },
    ] as PriceTableCategory[],
  },
  services: {
    heading: "Services That Keep You Moving",
    photoCaption: "Operators on demand, and support that keeps your site running.",
    imageSrc: "/images/rates/services.webp",
    imageAlt: "Certified equipment operator and maintenance support on site",
    bullets: [
      {
        lead: "Operator Services:",
        text: "Certified, skilled operators for safe, efficient machine operation (extra charges apply).",
      },
      {
        lead: "Maintenance & Repairs:",
        text: "On-site servicing during rental periods to minimize downtime.",
      },
      {
        lead: "Project-Specific Packages:",
        text: "Custom bundles for large or long-term projects—matched to scope, budget, and timeline.",
      },
    ],
  },
  quickGuide: {
    heading: "Quick Guide: Choosing the Right Machine",
    photoCaption: "Match machine to mission: access, load, terrain, and power.",
    imageSrc: "/images/rates/guide.webp",
    imageAlt: "Construction machine planning and site access assessment",
    bullets: [
      {
        lead: "Site Access & Space:",
        text: "Tight site? Choose mini excavators, skid steers, and electric forklifts.",
      },
      {
        lead: "Load, Reach & Height:",
        text: "Check lift weight and boom height for cranes/telehandlers; excavator size by depth/volume.",
      },
      {
        lead: "Material Volume & Terrain:",
        text: "Size tipper trucks to haul cycle; pick rollers/compactors for soil type and layers.",
      },
      {
        lead: "Power Needs:",
        text: "Total tool load + 20% headroom for generator selection (5–100 KVA).",
      },
    ],
  },
  contact: {
    heading: "Get in Touch",
    subheading: "For rentals, pricing, and bookings:",
  },
};
