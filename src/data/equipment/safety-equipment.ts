import { Equipment } from "@/types/equipment";

export const safetyEquipment: Equipment[] = [
  {
    slug: "helmets-and-safety-belts",
    name: "Helmets and Safety Belts",
    brand: "Site Safety Gear",
    category: "safety-equipment",
    featured: false,
    available: true,
    availability: "unknown",
    specsTitle: "Typical options. Ask us for what is in stock.",
    summary:
      "Essential construction personal safety gear including protective hard hats for head protection and safety harnesses for working safely at height.",
    description:
      "Personal protective equipment is fundamental to job site safety. Safety helmets are used on construction sites to protect the head against falling debris, overhead structural hazards, and accidental impact. Safety belts and full-body harnesses are worn when working at height, scaffolding, or roofing structures to provide secure anchoring and fall restraint.\n\nOur safety equipment range offers adjustable fits, comfortable suspensions, and durable hardware suitable for general site workers and scaffolding crews. Choose the correct safety rating for your work. Ask us for help.",
    images: [
      {
        src: "/images/equipment/helmets-and-safety-belts/helmets-and-safety-belts-main.webp",
        alt: "Construction safety helmets and site hard hats",
      },
      {
        src: "/images/equipment/helmets-and-safety-belts/helmets-and-safety-belts-detail.webp",
        alt: "Full-body safety harness and fall protection belt worn on site",
      },
    ],
    specs: [
      {
        label: "Available Helmet Colors",
        value: "TO CONFIRM: Yellow, White, Blue, Red, Orange",
        verified: false,
      },
      {
        label: "Head Suspension System",
        value: "TO CONFIRM: 4-point or 6-point adjustable ratchet headband",
        verified: false,
      },
      {
        label: "Harness Type",
        value: "TO CONFIRM: Full-body fall arrest harness or work positioning belt",
        verified: false,
      },
      {
        label: "Lanyard & Hook Options",
        value: "TO CONFIRM: Shock-absorbing lanyard with steel scaffold snap hooks",
        verified: false,
      },
      {
        label: "Capacity Sizing",
        value: "TO CONFIRM: Universal adjustable webbing straps (up to 310 lb rated capacity)",
        verified: false,
      },
    ],
    features: [
      "Impact-resistant site helmets with adjustable suspension headbands",
      "Full-body fall arrest harnesses with heavy-duty alloy D-rings",
      "Adjustable shoulder, chest, and thigh straps for ergonomic fit",
      "High-visibility helmet color options for job site crew identification",
      "Choose the correct safety rating for your work. Ask us for help.",
    ],
    bestFor: [
      "General job site head protection for trades and visitors",
      "Scaffolding erection and structural high-work",
      "Roofing, cladding, and elevated steel framing",
      "Excavation trench work and crane lift perimeter zones",
    ],
  },
];
