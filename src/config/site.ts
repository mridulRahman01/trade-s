export const siteConfig = {
  name: "M/S Mir Sulaiman Trade Center",
  shortName: "Mir Sulaiman Trade Center",
  proprietor: "Mir Sabbir Hossain",
  tagline: "Heavy Equipment Rental & Contractor Machinery",
  description:
    "Direct rental and delivery of heavy construction machinery including crawler excavators, wheeled excavators, and crawler rock bulldozers. Contact us for delivery to your site.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://msmirsulaimantradecenter.com",
  deliveryNote: "Contact us for delivery to your site",
  contact: {
    phone: "01711-269863",
    phoneRaw: "+8801711269863",
    whatsapp: "01711-269863",
    whatsappRaw: "+8801711269863",
    whatsappUrl: "https://wa.me/8801711269863",
    email: "info@msmirsulaimantradecenter.com",
  },
  address: {
    street: "Tabunia Bazaar",
    city: "Pabna",
    state: "Rajshahi Division",
    country: "BD",
    countryName: "Bangladesh",
    formatted: "Tabunia Bazaar, Pabna, Bangladesh",
  },
  operatingHours: {
    display: "Saturday to Thursday, 11:00 AM to 11:00 PM. Friday: Closed.",
    weekdays: "Saturday to Thursday: 11:00 AM – 11:00 PM",
    weekend: "Friday: Closed",
    friday: "Friday: Closed",
    note: "Closed on Friday",
  },
  map: {
    query: "Tabunia Bazaar, Pabna, Bangladesh",
    embedUrl:
      "https://www.google.com/maps?q=Tabunia+Bazaar,+Pabna,+Bangladesh&output=embed",
    searchUrl:
      "https://www.google.com/maps/search/?api=1&query=Tabunia+Bazaar+Pabna+Bangladesh",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Tabunia+Bazaar+Pabna+Bangladesh",
  },
  disclaimer:
    "Brand names are trademarks of their respective owners. M/S Mir Sulaiman Trade Center is not affiliated with the manufacturers.",
  colors: {
    background: "#FFFFFF",
    surfaceAlt: "#F7F7F5",
    primaryYellow: "#FFC20E",
    primaryYellowHover: "#E6AC00",
    textHeading: "#111111",
    textBody: "#3D3D3D",
    textMuted: "#6B6B6B",
    border: "#E5E5E0",
  },
};

export type SiteConfig = typeof siteConfig;
