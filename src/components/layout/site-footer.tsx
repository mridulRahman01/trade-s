"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F7F7F5] border-t border-[#E5E5E0] py-8 text-[#6B6B6B] text-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Main Footer Line */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Link href="/" aria-label={siteConfig.name} className="inline-block hover:opacity-90 transition-opacity">
              <Image
                src="/images/logo/logo-primary.svg"
                alt={siteConfig.name}
                className="h-10 w-auto object-contain block"
                width={160}
                height={40}
              />
            </Link>
            <p className="text-xs text-[#3D3D3D]">
              Proprietor: {siteConfig.proprietor} · {siteConfig.address.formatted}
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
            {navigationConfig.footerNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-[#111111] hover:underline transition-colors ${
                    isActive
                      ? "font-bold underline decoration-[#FFC20E] decoration-2 underline-offset-4"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="text-[#111111] hover:underline"
            >
              Phone: {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-[#111111] hover:underline"
            >
              {siteConfig.contact.email}
            </a>
            <Link
              href={navigationConfig.privacyHref}
              className="text-[#3D3D3D] hover:text-[#111111] underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        {/* Disclaimer, Image Licensing, & Copyright */}
        <div className="pt-4 border-t border-[#E5E5E0] flex flex-col md:flex-row md:items-center justify-between text-xs text-[#6B6B6B] gap-2">
          <div className="space-y-1">
            <p>{siteConfig.disclaimer}</p>
            <p className="text-[11px] text-[#6B6B6B]">
              Equipment photographs licensed under CC BY-SA 3.0 / CC BY-SA 4.0 / CC0 1.0 (authors: Morio, ClemRutter, Biswarup Ganguly, Su-May, Peter O&apos;Connor, Roy Luck). Complete records in IMAGE_CREDITS.md.
            </p>
          </div>
          <p className="sm:whitespace-nowrap">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
