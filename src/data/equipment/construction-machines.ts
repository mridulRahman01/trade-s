import { Equipment } from "@/types/equipment";

export const constructionMachines: Equipment[] = [
  {
    slug: "concrete-mixture-machine",
    name: "Concrete Mixture Machine",
    brand: "Site Machinery",
    category: "construction-machines",
    featured: false,
    available: true,
    availability: "unknown",
    specsTitle: "Typical options. Ask us for what is in stock.",
    summary:
      "On-site concrete mixture machine engineered for uniform mixing of cement, sand, aggregate, and water for foundational pours and structural casting.",
    description:
      "A concrete mixture machine combines cement, sand, gravel aggregate, and water to produce uniform, workable concrete directly on the job site. Designed for rapid batching, it eliminates manual hand-mixing inconsistencies and ensures the correct water-to-cement ratio throughout construction.\n\nAvailable in versatile configurations suitable for small to medium-scale civil and building projects, our units support efficient site mobility, reliable continuous batching, and steady discharge into wheelbarrows, hoppers, or foundation forms.",
    images: [
      {
        src: "/images/equipment/concrete-mixture-machine/concrete-mixture-machine-main.webp",
        alt: "Concrete mixture machine on construction site",
      },
      {
        src: "/images/equipment/concrete-mixture-machine/concrete-mixture-machine-detail.webp",
        alt: "Concrete mixer drum and discharge chute",
      },
    ],
    specs: [
      {
        label: "Drum Capacity",
        value: "TO CONFIRM: 200L to 400L (7 cu ft to 14 cu ft)",
        verified: false,
      },
      {
        label: "Power Source",
        value: "TO CONFIRM: Electric motor or Diesel engine (approx. 5 hp to 10 hp)",
        verified: false,
      },
      {
        label: "Chassis Mobility",
        value: "TO CONFIRM: Towable pneumatic tires or stationary stand",
        verified: false,
      },
      {
        label: "Discharge Clearance",
        value: "TO CONFIRM: Approx. 24 in to 36 in clearance",
        verified: false,
      },
      {
        label: "Drum Rotation Speed",
        value: "TO CONFIRM: 20 to 24 RPM",
        verified: false,
      },
    ],
    features: [
      "Uniform batch mixing of cement, sand, aggregate, and water",
      "Heavy-duty steel drum with reinforced internal mixing blades",
      "Balanced tilting mechanism for controlled, clean discharge",
      "Towable chassis with puncture-resistant wheels for rapid site positioning",
    ],
    bestFor: [
      "Building foundations, footings, and column casting",
      "Concrete slabs, driveways, and pavements",
      "Brick masonry mortar and plaster batching",
      "Residential and commercial structural pours",
    ],
  },
  {
    slug: "vibrator-machine",
    name: "Vibrator Machine",
    brand: "Site Machinery",
    category: "construction-machines",
    featured: false,
    available: true,
    availability: "unknown",
    specsTitle: "Typical options. Ask us for what is in stock.",
    summary:
      "High-frequency internal concrete vibrator machine used to remove entrapped air and consolidate freshly poured concrete for maximum structural density.",
    description:
      "A concrete vibrator machine is an indispensable tool on any reinforced concrete pour, transmitting rapid mechanical vibrations through liquid concrete to consolidate the mix. By releasing trapped air voids and settling aggregate firmly around rebar frameworks, it prevents honeycomb defects and creates a solid, watertight finish.\n\nEquipped with flexible drive shafts and heavy-duty vibrating poker heads, these machines are easily operated across columns, beams, deep slab foundations, and bridge piers to achieve structural compaction standards.",
    images: [
      {
        src: "/images/equipment/vibrator-machine/vibrator-machine-main.webp",
        alt: "Concrete vibrator poker consolidating fresh concrete pour",
      },
      {
        src: "/images/equipment/vibrator-machine/vibrator-machine-detail.webp",
        alt: "Concrete vibrator operator removing air bubbles from wet concrete",
      },
    ],
    specs: [
      {
        label: "Needle Poker Diameter",
        value: "TO CONFIRM: 25 mm to 60 mm (1 in to 2.4 in)",
        verified: false,
      },
      {
        label: "Flexible Shaft Length",
        value: "TO CONFIRM: 4 m to 6 m (13 ft to 20 ft)",
        verified: false,
      },
      {
        label: "Power Source",
        value: "TO CONFIRM: Electric motor (1.5 hp to 3 hp) or Petrol/Diesel drive",
        verified: false,
      },
      {
        label: "Vibration Frequency",
        value: "TO CONFIRM: 10,000 to 12,000 VPM (vibrations per minute)",
        verified: false,
      },
      {
        label: "Coupling Connection",
        value: "TO CONFIRM: Hexagonal or claw quick-connect fitting",
        verified: false,
      },
    ],
    features: [
      "Eliminates entrapped air bubbles and void cavities in wet concrete",
      "Ensures complete concrete encapsulation around dense steel reinforcement",
      "Flexible, heavy-duty drive casing resistant to site abrasion",
      "Interchangeable poker needle heads for diverse pour geometries",
    ],
    bestFor: [
      "Reinforced concrete columns, beams, and lintels",
      "Slab foundations and retaining walls",
      "Pre-cast concrete elements and culverts",
      "Bridge abutments and civil structural footings",
    ],
  },
  {
    slug: "rod-cutter-and-rod-bender-machine",
    name: "Rod Cutter and Rod Bender Machine",
    brand: "Site Machinery",
    category: "construction-machines",
    featured: false,
    available: true,
    availability: "unknown",
    specsTitle: "Typical options. Ask us for what is in stock.",
    summary:
      "Specialized workshop and site machinery designed for precision shearing and accurate angular bending of steel reinforcement bars.",
    description:
      "The rod cutter and rod bender machine streamlines rebar fabrication on construction sites, cutting high-tensile steel bars to specified lengths and bending them into structural stirrups, hooks, and column ties. Powered cutting eliminates laborious manual hacksawing while motorized bending ensures identical bend radii and angles.\n\nBuilt with durable hardened alloy steel tool heads and responsive foot pedal controls, this equipment enhances productivity, reduces material wastage, and improves site safety during structural steel preparation.",
    images: [
      {
        src: "/images/equipment/rod-cutter-and-rod-bender-machine/rod-cutter-and-rod-bender-machine-main.webp",
        alt: "Steel rebar rod cutter and bender machinery in operation",
      },
      {
        src: "/images/equipment/rod-cutter-and-rod-bender-machine/rod-cutter-and-rod-bender-machine-detail.webp",
        alt: "Reinforcement steel bar rods prepared for structural casting",
      },
    ],
    specs: [
      {
        label: "Maximum Rebar Diameter",
        value: "TO CONFIRM: 16 mm to 32 mm (5/8 in to 1-1/4 in rebar)",
        verified: false,
      },
      {
        label: "Machine Configuration",
        value: "TO CONFIRM: Single function or combined cut-and-bend unit",
        verified: false,
      },
      {
        label: "Power Source",
        value: "TO CONFIRM: Electric motor (approx. 3 hp to 5 hp)",
        verified: false,
      },
      {
        label: "Bending Angle Range",
        value: "TO CONFIRM: 0° to 180° adjustable with angle presets",
        verified: false,
      },
      {
        label: "Cutting Cycle Time",
        value: "TO CONFIRM: 2 to 4 seconds per cut",
        verified: false,
      },
    ],
    features: [
      "High-tensile alloy shear blades for clean, burr-free rebar cuts",
      "Adjustable angle stoppers for repeatable 45°, 90°, and 135° bends",
      "Heavy-duty electric drive motor with overload protection",
      "Dual foot pedal or console control for operator efficiency",
    ],
    bestFor: [
      "Rebar stirrup and tie fabrication for columns and beams",
      "Foundation mat and slab steel reinforcement shaping",
      "Prefabrication yards and on-site rebar preparation",
      "High-rise civil frames and bridge deck steelwork",
    ],
  },
  {
    slug: "roller-and-dump-trucks",
    name: "Roller and Dump Trucks",
    brand: "Site Machinery",
    category: "construction-machines",
    featured: false,
    available: true,
    availability: "unknown",
    specsTitle: "Typical options. Ask us for what is in stock.",
    summary:
      "Comprehensive site preparation and earthwork combination offering road compaction rollers alongside heavy dump trucks for hauling soil, sand, and aggregate.",
    description:
      "This combined equipment category pairs heavy compaction road rollers with rugged dump trucks to handle the dual demands of civil earthmoving: hauling bulk materials and consolidating ground surfaces. Road rollers provide high dynamic compaction forces across soil, sub-base gravel, and asphalt, while heavy tipper trucks transport earth, demolition rubble, and aggregates across job sites.\n\nWhether preparing a new road alignment, grading an industrial compound, or managing mass soil export, our fleet equipment provides dependable field performance with configurations tailored to your specific earthmoving scope.",
    images: [
      {
        src: "/images/equipment/roller-and-dump-trucks/roller-and-dump-trucks-main.webp",
        alt: "Vibratory road roller compactor on construction site",
      },
      {
        src: "/images/equipment/roller-and-dump-trucks/roller-and-dump-trucks-truck.webp",
        alt: "Heavy duty earthmoving dump truck hauling aggregate",
      },
    ],
    specs: [
      {
        label: "Roller Operating Weight",
        value: "TO CONFIRM: 3 ton to 12 ton (6,600 lb to 26,400 lb)",
        verified: false,
      },
      {
        label: "Roller Drum Type",
        value: "TO CONFIRM: Smooth drum vibratory or pneumatic multi-tire",
        verified: false,
      },
      {
        label: "Dump Truck Payload Capacity",
        value: "TO CONFIRM: 5 to 15 cu yd (7 to 20 tons payload)",
        verified: false,
      },
      {
        label: "Truck Drive Configuration",
        value: "TO CONFIRM: 4x2 or 6x4 heavy tipper chassis",
        verified: false,
      },
      {
        label: "Tipping Mechanism",
        value: "TO CONFIRM: Underbody hydraulic multi-stage hoist ram",
        verified: false,
      },
    ],
    features: [
      "Combined earthwork capability: bulk material haulage and ground compaction",
      "Vibratory compaction drums delivering deep ground consolidation",
      "High-strength hydraulic tipper bodies for rapid material offloading",
      "Multi-axle chassis and heavy-duty suspension for uneven haul roads",
    ],
    bestFor: [
      "Road base preparation, sub-grade leveling, and asphalt finishing",
      "Mass soil, sand, and aggregate hauling to and from job sites",
      "Site preparation, commercial yard grading, and backfilling",
      "Demolition debris removal and embankment compaction",
    ],
  },
];
