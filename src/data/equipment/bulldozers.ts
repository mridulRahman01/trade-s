import { Equipment } from "@/types/equipment";

export const bulldozers: Equipment[] = [
  {
    slug: "doosan-dx300lc-dx225",
    name: "Doosan DX300LC / DX225",
    brand: "Doosan",
    category: "bulldozers",
    featured: true,
    available: true,
    // TODO: Confirm with client: DX225 and DX300LC are excavator models on the original site, but currently listed under Bulldozers
    dataNote: "Listed under Bulldozers on original site; DX300LC/DX225 are typically crawler excavators. Retained per instructions pending client confirmation.",
    summary:
      "Rugged crawler machinery providing high tractive effort and structural durability for heavy site clearing and bulk ground leveling.",
    description:
      "This heavy crawler machine offers exceptional push capability, robust mechanical reliability, and heavy-duty track stability. Designed for severe earthmoving and rough ground leveling contracts where dependable power is paramount.",
    images: [
      {
        src: "/images/equipment/doosan-dx300lc-dx225/doosan-dx300lc-dx225-main.webp",
        alt: "Doosan DX300LC DX225 earthmoving equipment",
      },
      {
        src: "/images/equipment/doosan-dx300lc-dx225/doosan-dx300lc-dx225-detail.webp",
        alt: "Doosan DX300LC DX225 side view",
      },
    ],
    specs: [
      { label: "Net Power", value: "209 hp (TO CONFIRM)", verified: false },
      { label: "Operating Weight", value: "66,000 lb (TO CONFIRM)", verified: false },
      { label: "Ground Clearance", value: "19.7 in (TO CONFIRM)", verified: false },
      { label: "Track Shoe Width", value: "31.5 in (TO CONFIRM)", verified: false },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Heavy reinforced crawler undercarriage for rough terrain",
      "High tractive effort for pushing dense spoil and rock",
      "Pressurized operator cab with enhanced shock damping",
      "Centralized grease points for streamlined daily servicing",
    ],
    bestFor: [
      "Rough land clearing and tree removal",
      "Subgrade grading and earth shifting",
      "Quarry bench clearing",
      "Heavy industrial site preparation",
    ],
  },
  {
    slug: "shantui-sd16",
    name: "Shantui SD16 (160 HP)",
    brand: "Shantui",
    category: "bulldozers",
    featured: false,
    available: true,
    summary:
      "Reliable 160-horsepower crawler bulldozer equipped with a high-capacity blade and hydraulic power shift transmission.",
    description:
      "The Shantui SD16 is one of the most widely deployed crawler bulldozers for general earthmoving, road building, and agricultural leveling. Powered by a dependable 160 HP diesel engine and planetary power shift transmission, it delivers excellent drawbar pull and ground grading precision.",
    images: [
      {
        src: "/images/equipment/shantui-sd16/shantui-sd16-main.webp",
        alt: "Shantui SD16 160 HP crawler bulldozer",
      },
      {
        src: "/images/equipment/shantui-sd16/shantui-sd16-detail.webp",
        alt: "Shantui SD16 bulldozer front blade detail",
      },
    ],
    specs: [
      { label: "Net Power", value: "160 hp (TO CONFIRM)", verified: false },
      { label: "Operating Weight", value: "37,480 lb (TO CONFIRM)", verified: false },
      { label: "Blade Capacity", value: "5.9 yd³ (TO CONFIRM)", verified: false },
      { label: "Ground Pressure", value: "9.7 psi (TO CONFIRM)", verified: false },
      { label: "Transmission", value: "Power Shift Planetary (TO CONFIRM)", verified: false },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "Semi-U high-capacity earthmoving blade with tilt cylinder",
      "Hydraulic power shift transmission with single-lever speed control",
      "Rigid box-type track roller frames with sealed and lubricated tracks",
      "Rear single or three-shank ripper compatible",
    ],
    bestFor: [
      "Road embankment cutting and bulk spreading",
      "Backfilling deep pipeline trenches",
      "Land reclamation and agricultural leveling",
      "Commercial building pad subgrade preparation",
    ],
  },
  {
    slug: "sd22w-rock-bulldozer",
    name: "SD22W Rock Bulldozer",
    brand: "Shantui",
    category: "bulldozers",
    featured: false,
    available: true,
    // TODO: Confirm with client: Confirm brand (likely Shantui) and exact model for SD22W Rock Bulldozer
    dataNote: "Listed as 'Tractor SD22W rock Bulldozer' on original site. Presumed Shantui SD22W pending confirmation.",
    summary:
      "Heavy-duty reinforced rock bulldozer engineered with heavy rock tracks and wear-resistant blade plates for severe stone and quarry applications.",
    description:
      "Engineered specifically for harsh rock work, quarry stripping, and severe hardpan ripping, the SD22W features reinforced track shoes, heavy wear plates on the blade, and an extreme-duty undercarriage. Its high operating weight provides maximum penetration and ripping traction.",
    images: [
      {
        src: "/images/equipment/sd22w-rock-bulldozer/sd22w-rock-bulldozer-main.webp",
        alt: "SD22W Rock Bulldozer reinforced blade crawler",
      },
      {
        src: "/images/equipment/sd22w-rock-bulldozer/sd22w-rock-bulldozer-detail.webp",
        alt: "SD22W bulldozer track and chassis",
      },
    ],
    specs: [
      { label: "Net Power", value: "220 hp (TO CONFIRM)", verified: false },
      { label: "Operating Weight", value: "51,580 lb (TO CONFIRM)", verified: false },
      { label: "Blade Capacity", value: "8.4 yd³ (TO CONFIRM)", verified: false },
      { label: "Blade Type", value: "Reinforced Heavy Rock Blade (TO CONFIRM)", verified: false },
      { label: "Engine Model", value: "Cummins NT855-C280 (TO CONFIRM)", verified: false },
    ],
    rates: {
      note: "Request a quote for current rates",
    },
    features: [
      "High-strength alloy steel rock blade designed to resist extreme abrasion",
      "Reinforced heavy-duty track roller guards protecting lower rollers",
      "Heavy-duty rear ripper for fracturing rock beds and compacted shale",
      "Cummins turbocharged diesel engine with high torque reserve",
    ],
    bestFor: [
      "Quarry and open-cast rock stripping",
      "Blasted rock pile clearing and grading",
      "Hardpan and shale ripping",
      "Heavy mountain road pioneer cuts",
    ],
  },
];
