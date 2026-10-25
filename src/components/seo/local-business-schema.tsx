import * as React from "react";
import { siteConfig } from "@/config/site";
import { JsonLd } from "./json-ld";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    founder: {
      "@type": "Person",
      name: siteConfig.proprietor,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "11:00",
        closes: "23:00",
      },
    ],
  };

  return <JsonLd data={schema} />;
}
