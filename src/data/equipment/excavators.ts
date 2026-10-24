import { Equipment } from "@/types/equipment";

export const excavators: Equipment[] = [
  {
    slug: "cat-350-large-excavator",
    name: "CAT Large Excavator 350 (Tier 4 / Stage V)",
    brand: "CAT",
    category: "excavators",
    featured: true,
    available: true,
    summary:
      "Heavy-capacity 50-ton class excavator engineered for deep mass-excavation, quarry operations, and high-volume earthmoving projects.",
    description:
      "The CAT 350 delivers exceptional digging force, rapid cycle times, and fuel-efficient electro-hydraulic controls. Built for severe construction sites and high-production mass excavation, this machine handles oversized buckets and heavy attachments with rock-solid stability.",
    images: [
      {
        src: "/images/equipment/cat-350-large-excavator/cat-350-large-excavator-main.webp",
        alt: "CAT Large Excavator 350 heavy earthmoving equipment",
      },
      {
        src: "/images/equipment/cat-350-large-excavator/cat-350-large-excavator-detail.webp",
        alt: "CAT 350 excavator side profile and boom",
      },
    ],
    specs: [
      { label: "Net Power", value: "413 hp", verified: true },
      { label: "Operating Weight", value: "105,400 lb", verified: true },
      { label: "Max Digging Depth", value: "27 ft 1 in", verified: true },
      { label: "Bucket Capacity", value: "4.2 yd³", verified: true },
      { label: "Engine Model", value: "Cat C9.3B Tier 4 Final / Stage V", verified: true },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Heavy-duty undercarriage designed for severe ground impact",
      "Factory electro-hydraulic control with customizable operator modes",
      "Tier 4 Final / Stage V emission compliant engine",
      "High-pressure hydraulic auxiliary lines for heavy hammer and shear operation",
    ],
    bestFor: [
      "Quarry and aggregate extraction",
      "Deep mass basement and civil excavation",
      "High-volume bulk truck loading",
      "Heavy infrastructure and bridge foundations",
    ],
  },
  {
    slug: "cat-395-front-shovel",
    name: "CAT Large Excavator 395 Front Shovel (FS) (Tier 4 / Stage V)",
    brand: "CAT",
    category: "excavators",
    featured: true,
    available: true,
    summary:
      "High-production 95-ton heavy excavator and front shovel workhorse engineered for maximum breakout force and bulk haul-truck loading.",
    description:
      "Engineered for the most demanding mining, quarrying, and bulk excavation duties, the CAT 395 delivers industry-leading structural strength and hydraulic breakout force. Its massive boom geometry and high-flow pump system enable continuous, reliable productivity under severe duty cycles.",
    images: [
      {
        src: "/images/equipment/cat-395-front-shovel/cat-395-front-shovel-main.webp",
        alt: "CAT Large Excavator 395 Front Shovel mining and bulk production machine",
      },
      {
        src: "/images/equipment/cat-395-front-shovel/cat-395-front-shovel-detail.webp",
        alt: "CAT 395 heavy front shovel boom and bucket",
      },
    ],
    specs: [
      { label: "Net Power", value: "543 hp", verified: true },
      { label: "Operating Weight", value: "207,300 lb", verified: true },
      { label: "Max Digging Depth", value: "31 ft 8 in", verified: true },
      { label: "Bucket Capacity", value: "8.5 yd³", verified: true },
      { label: "Engine Model", value: "Cat C18 Tier 4 Final / Stage V", verified: true },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Massive reinforced carbody and heavy track roller frames",
      "Extreme-duty front shovel and mass excavator geometry",
      "Dedicated hydrostatic swing circuit for rapid truck loading cycles",
      "Advanced cab with ROPS/FOPS operator impact protection",
    ],
    bestFor: [
      "Open-pit mining and quarry face loading",
      "Heavy overburden removal",
      "Large-scale embankment rock placement",
      "Severe rock excavation contracts",
    ],
  },
  {
    slug: "cat-320-medium-excavator",
    name: "CAT Medium Excavator 320 (Tier 4 / Stage V)",
    brand: "CAT",
    category: "excavators",
    featured: true,
    available: true,
    summary:
      "Versatile 20-ton industry standard excavator delivering low operating cost, exceptional fuel efficiency, and precise grading balance.",
    description:
      "The CAT 320 sets the benchmark for medium-class earthmoving equipment. Equipped with an efficient electro-hydraulic system and a responsive Cat C4.4 engine, it provides contractors with unmatched versatility across utility trenching, site development, and foundation works.",
    images: [
      {
        src: "/images/equipment/cat-320-medium-excavator/cat-320-medium-excavator-main.webp",
        alt: "CAT Medium Excavator 320 on job site",
      },
      {
        src: "/images/equipment/cat-320-medium-excavator/cat-320-medium-excavator-detail.webp",
        alt: "CAT 320 excavator side profile and tracks",
      },
    ],
    specs: [
      { label: "Net Power", value: "172 hp", verified: true },
      { label: "Operating Weight", value: "49,800 lb", verified: true },
      { label: "Max Digging Depth", value: "22 ft", verified: true },
      { label: "Bucket Capacity", value: "1.56 yd³ (1.19 m³)", verified: true },
      { label: "Engine Model", value: "Cat C4.4 Tier 4 Final / Stage V", verified: true },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Factory-integrated electro-hydraulic controls for precise trenching",
      "Standard ground-level maintenance access for daily inspections",
      "Low-fuel-consumption Tier 4 Final / Stage V Cat C4.4 engine",
      "Automatic hydraulic warmup and power boost capability",
    ],
    bestFor: [
      "Commercial site preparation and grading",
      "Deep utility pipeline trenching",
      "Footing and basement excavation",
      "Retention pond and drainage construction",
    ],
  },
  {
    slug: "cat-326-medium-excavator",
    name: "CAT Medium Excavator 326 (Tier 4 / Stage V)",
    brand: "CAT",
    category: "excavators",
    featured: false,
    available: true,
    summary:
      "Balanced 26-ton medium crawler excavator offering strong swing torque and enhanced lift capacity for demanding construction contracts.",
    description:
      "Stepping up from the 20-ton class, the CAT 326 delivers higher hydraulic breakout force and superior lifting stability. It is an ideal solution for contractors installing large-diameter concrete drainage pipe or handling dense rocky fill materials.",
    images: [
      {
        src: "/images/equipment/cat-326-medium-excavator/cat-326-medium-excavator-main.webp",
        alt: "CAT Medium Excavator 326 hydraulic crawler excavator",
      },
      {
        src: "/images/equipment/cat-326-medium-excavator/cat-326-medium-excavator-detail.webp",
        alt: "CAT 326 excavator hydraulic arm",
      },
    ],
    specs: [
      { label: "Net Power", value: "202 hp", verified: true },
      { label: "Operating Weight", value: "57,500 lb", verified: true },
      { label: "Max Digging Depth", value: "22 ft 4 in", verified: true },
      { label: "Bucket Capacity", value: "1.96 yd³", verified: true },
      { label: "Engine Model", value: "Cat C7.1 Tier 4 Final / Stage V", verified: true },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Higher displacement Cat C7.1 engine for tough continuous digging",
      "Reinforced heavy-duty boom and stick structure",
      "High swing torque for rapid uphill cycle loading",
      "Sound-suppressed pressurized operator cab",
    ],
    bestFor: [
      "Highway widening and overpass foundation work",
      "Heavy culvert and stormwater pipe placement",
      "Tough subgrade rocky excavation",
      "Demolition sorting and structural breaking",
    ],
  },
  {
    slug: "cat-330-gc-medium-excavator",
    name: "CAT Medium Excavator 330 GC (Tier 4 / Stage V)",
    brand: "CAT",
    category: "excavators",
    featured: false,
    available: true,
    summary:
      "Dependable 30-ton workhorse built for rugged reliability, low fuel consumption, and heavy-duty utility earthwork.",
    description:
      "The CAT 330 GC strikes the optimal balance of productivity and low operating expense in the 30-ton machine category. Its robust mechanical platform and proven hydraulic architecture deliver maximum reliability across regional earthmoving, utility, and civil engineering contracts.",
    images: [
      {
        src: "/images/equipment/cat-330-gc-medium-excavator/cat-330-gc-medium-excavator-main.webp",
        alt: "CAT Medium Excavator 330 GC heavy-duty crawler machine",
      },
      {
        src: "/images/equipment/cat-330-gc-medium-excavator/cat-330-gc-medium-excavator-detail.webp",
        alt: "CAT 330 GC machine cab and tracks",
      },
    ],
    specs: [
      { label: "Net Power", value: "204 hp", verified: true },
      { label: "Operating Weight", value: "65,900 lb", verified: true },
      { label: "Max Digging Depth", value: "23 ft 9 in", verified: true },
      { label: "Bucket Capacity", value: "2.3 yd³", verified: true },
      { label: "Engine Model", value: "Cat C7.1 Tier 4 Final / Stage V", verified: true },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Robust 30-ton crawler frame with heavy-duty track rollers",
      "Fuel-saving electro-hydraulic system with smart power management",
      "Large-capacity standard bucket for fast truck cycling",
      "Simplified service points to minimize job-site downtime",
    ],
    bestFor: [
      "Bulk earthmoving and general site preparation",
      "Demolition material handling",
      "Commercial industrial park site cuts",
      "Subdivision water and sewer trunk lines",
    ],
  },
  {
    slug: "sany-15-5t-small-excavator",
    name: "SANY 15.5T Small Excavator",
    brand: "SANY",
    category: "excavators",
    featured: false,
    available: true,
    summary:
      "Agile 15.5-ton compact crawler excavator designed for tight-space urban operations, residential development, and roadway maintenance.",
    description:
      "The SANY 15.5-ton compact excavator delivers the digging capability of a full-size machine within a compact footprint. Its reduced tail-swing profile and responsive controls allow operators to work safely alongside live traffic or between tight property lines.",
    images: [
      {
        src: "/images/equipment/sany-15-5t-small-excavator/sany-15-5t-small-excavator-main.webp",
        alt: "SANY 15.5T Small Excavator compact crawler",
      },
      {
        src: "/images/equipment/sany-15-5t-small-excavator/sany-15-5t-small-excavator-detail.webp",
        alt: "SANY 15.5T excavator arm and bucket",
      },
    ],
    specs: [
      { label: "Net Power", value: "105 hp (TO CONFIRM)", verified: false },
      { label: "Operating Weight", value: "34,170 lb (TO CONFIRM)", verified: false },
      { label: "Max Digging Depth", value: "18 ft (TO CONFIRM)", verified: false },
      { label: "Bucket Capacity", value: "0.78 yd³ (TO CONFIRM)", verified: false },
      { label: "Engine Model", value: "Isuzu 4JJ1X Tier 4 Final (TO CONFIRM)", verified: false },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Compact tail-swing configuration for tight job sites",
      "Dozer blade attachment for backfilling and machine stabilization",
      "Auxiliary hydraulic lines for hydraulic breakers and augers",
      "Comfortable air-conditioned cabin with high all-around visibility",
    ],
    bestFor: [
      "Urban utility installation and pipe repair",
      "Residential foundation digging and swimming pools",
      "Roadway shoulder repair and ditch maintenance",
      "Small-to-medium lot clearing",
    ],
  },
  {
    slug: "sany-22-35t-medium-excavator",
    name: "SANY 22-35T Medium Excavator",
    brand: "SANY",
    category: "excavators",
    featured: false,
    available: true,
    summary:
      "Versatile medium-tonnage crawler excavator fleet offering dependable digging depth and cycle times for regional earthmoving contracts.",
    description:
      "Covering the core 22 to 35-ton medium excavator weight range, this machine provides heavy breakout power combined with fast, fluid multifunction hydraulics. Designed to work continuously in hot and demanding conditions with low maintenance requirements.",
    images: [
      {
        src: "/images/equipment/sany-22-35t-medium-excavator/sany-22-35t-medium-excavator-main.webp",
        alt: "SANY 22-35T Medium Excavator crawler machine",
      },
      {
        src: "/images/equipment/sany-22-35t-medium-excavator/sany-22-35t-medium-excavator-detail.webp",
        alt: "SANY medium excavator boom profile",
      },
    ],
    specs: [
      { label: "Net Power", value: "163 hp (TO CONFIRM)", verified: false },
      { label: "Operating Weight", value: "54,000 lb (TO CONFIRM)", verified: false },
      { label: "Max Digging Depth", value: "21 ft 8 in (TO CONFIRM)", verified: false },
      { label: "Bucket Capacity", value: "1.57 yd³ (TO CONFIRM)", verified: false },
      { label: "Engine Model", value: "Cummins QSB6.7 (TO CONFIRM)", verified: false },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Reinforced heavy-duty boom and arm weldments",
      "Kawasaki hydraulic pump system for responsive controls",
      "Positive flow hydraulic architecture to reduce fuel loss",
      "Heavy steel belly guards and undercarriage protection",
    ],
    bestFor: [
      "Commercial site grading and excavation",
      "Water main and sewer trunk construction",
      "Retention basin and canal excavation",
      "Material handling and truck loading",
    ],
  },
  {
    slug: "sany-long-reach-excavator-sy215c",
    name: "SANY Long-Reach Excavator SY215C",
    brand: "SANY",
    category: "excavators",
    featured: false,
    available: true,
    summary:
      "Extended front boom and arm configuration tailored for long-distance river dredging, deep embankment work, and canal excavation.",
    description:
      "The SY215C Long Reach excavator features a purpose-built extended front boom and stick assembly with a reach exceeding 50 feet. It is engineered specifically for deep canal dredging, waterway embankment stabilization, and slope shaping where standard excavators cannot reach.",
    images: [
      {
        src: "/images/equipment/sany-long-reach-excavator-sy215c/sany-long-reach-excavator-sy215c-main.webp",
        alt: "SANY Long-Reach Excavator SY215C extended boom",
      },
      {
        src: "/images/equipment/sany-long-reach-excavator-sy215c/sany-long-reach-excavator-sy215c-detail.webp",
        alt: "SANY long reach boom extending over embankment",
      },
    ],
    specs: [
      { label: "Net Power", value: "163 hp (TO CONFIRM)", verified: false },
      { label: "Operating Weight", value: "57,320 lb (TO CONFIRM)", verified: false },
      { label: "Max Reach Along Ground", value: "50 ft 10 in (TO CONFIRM)", verified: false },
      { label: "Max Digging Depth", value: "38 ft 9 in (TO CONFIRM)", verified: false },
      { label: "Bucket Capacity", value: "0.59 yd³ (TO CONFIRM)", verified: false },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Factory-engineered 50+ foot reach front attachment",
      "Heavy counterweight for extended reach stability",
      "Wide track shoes for reduced ground pressure near soft embankments",
      "Specialized ditch cleaning and shaping bucket options",
    ],
    bestFor: [
      "Canal and drainage channel dredging",
      "River bank and flood embankment reinforcement",
      "Deep foundation slot cutting and lake clearing",
      "Bridge pier sediment removal",
    ],
  },
  {
    slug: "sany-wheel-excavator-sy155w",
    name: "SANY Wheel Excavator SY155W",
    brand: "SANY",
    category: "excavators",
    featured: false,
    available: true,
    summary:
      "Highly mobile wheeled excavator capable of fast road travel between job sites without damaging paved municipal surfaces.",
    description:
      "The SANY SY155W wheeled excavator gives contractors the freedom to travel quickly between municipal and roadway job sites under its own power. Featuring robust dual pneumatic tires, front dozer blade, and rear outriggers, it combines high lifting capacity with pavement-friendly mobility.",
    images: [
      {
        src: "/images/equipment/sany-wheel-excavator-sy155w/sany-wheel-excavator-sy155w-main.webp",
        alt: "SANY Wheel Excavator SY155W road-ready machine",
      },
      {
        src: "/images/equipment/sany-wheel-excavator-sy155w/sany-wheel-excavator-sy155w-detail.webp",
        alt: "SANY wheel excavator tire and stabilizer detail",
      },
    ],
    specs: [
      { label: "Net Power", value: "161 hp (TO CONFIRM)", verified: false },
      { label: "Operating Weight", value: "33,070 lb (TO CONFIRM)", verified: false },
      { label: "Max Travel Speed", value: "23 mph (TO CONFIRM)", verified: false },
      { label: "Max Digging Depth", value: "15 ft 9 in (TO CONFIRM)", verified: false },
      { label: "Bucket Capacity", value: "0.76 yd³ (TO CONFIRM)", verified: false },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Hydrostatic four-wheel drive with road travel speeds up to 23 mph",
      "Independent hydraulic stabilizers and front dozer blade",
      "Two-piece articulating boom option for close-quarters utility work",
      "Heavy dual pneumatic road tires safe for finished asphalt",
    ],
    bestFor: [
      "Municipal road maintenance and asphalt repair",
      "Utility repairs in developed city neighborhoods",
      "Shoulder grading and guardrail installation",
      "Multi-location utility emergency dispatch",
    ],
  },
];
