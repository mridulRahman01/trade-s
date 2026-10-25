import React from "react";
import { ContactStatusBadge } from "./contact-status-badge";

export function ContactHero() {
  return (
    <section className="bg-white pt-10 pb-6 md:pt-14 md:pb-8 lg:pt-16 lg:pb-10 border-b border-[#E5E5E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="font-heading font-bold text-[#111111] tracking-tight uppercase"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.05,
          }}
        >
          Contact Us
        </h1>
        <div className="w-12 h-1 bg-[#FFC20E] mt-3" />
        <p className="mt-3 text-base text-[#3D3D3D] max-w-[65ch] leading-[1.6]">
          Call, message, or visit us. We are happy to help you choose the right machine or product.
        </p>
        <div>
          <ContactStatusBadge />
        </div>
      </div>
    </section>
  );
}
