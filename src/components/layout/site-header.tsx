"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { Phone, MessageCircle, HardHat, Info, Tag, FileText } from "lucide-react";

export function SiteHeader() {
  const { openDrawer } = useQuoteDrawer();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-[#E5E5E0]">
      <div className="max-w-[1200px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Official Brand Logo on ONE line at every screen width */}
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="flex items-center hover:opacity-90 transition-opacity shrink-0 py-1"
        >
          <Image
            src="/images/logo/logo-primary.svg"
            alt={siteConfig.name}
            className="h-10 lg:h-12 w-auto object-contain block"
            width={192}
            height={48}
            priority
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        {/* Desktop Navigation (1024px+): Visible, on ONE line */}
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 shrink-0">
          <nav aria-label="Main Navigation" className="flex items-center space-x-3 xl:space-x-4">
            {navigationConfig.desktopNav.map((item) => {
              const isRates = item.href === "/rental-rates";
              const isAbout = item.href === "/about";
              const isContact = item.href === "/contact";
              const isHome = item.href === "/";
              const isActive =
                (isRates && pathname === "/rental-rates") ||
                (isAbout && pathname === "/about") ||
                (isContact && pathname === "/contact") ||
                (isHome && pathname === "/");

              const Icon = isRates ? Tag : isAbout ? Info : isContact ? Phone : HardHat;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#111111] border-b-2 border-[#FFC20E] pb-0.5"
                      : "text-[#111111] hover:text-[#6B6B6B]"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1.5 text-[#111111] group-hover:text-[#6B6B6B] transition-colors" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop WhatsApp link */}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center text-sm font-semibold text-[#111111] hover:text-[#6B6B6B] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 mr-1.5 text-[#111111] group-hover:text-[#6B6B6B] transition-colors" />
            WhatsApp
          </a>

          {/* Desktop Phone Number link */}
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="group flex items-center text-sm font-semibold text-[#111111] hover:text-[#6B6B6B] transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4 mr-1.5 text-[#111111] group-hover:text-[#6B6B6B] transition-colors" />
            {siteConfig.contact.phone}
          </a>

          {/* Yellow Request a Quote Button */}
          <button
            type="button"
            onClick={() => {
              if (pathname === "/contact") {
                const formEl = document.getElementById("contact-form");
                if (formEl) {
                  formEl.scrollIntoView({ behavior: "smooth" });
                  const nameInput = document.getElementById("field-name");
                  nameInput?.focus();
                  setTimeout(() => nameInput?.focus(), 100);
                  return;
                }
              }
              openDrawer();
            }}
            className="h-12 px-4 xl:px-5 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-sm transition-all whitespace-nowrap active:scale-[0.98] hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-[#111111] flex items-center"
          >
            <FileText className="w-4 h-4 mr-2 text-[#111111]" />
            Request a Quote
          </button>
        </div>

        {/* Mobile & Tablet (< 1024px): 44px round phone button + 48px accessible hamburger */}
        <div className="flex lg:hidden items-center space-x-2 shrink-0">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            aria-label={`Call ${siteConfig.contact.phone}`}
            className="w-11 h-11 rounded-full bg-[#F7F7F5] border border-[#E5E5E0] text-[#111111] flex items-center justify-center hover:bg-[#FFC20E] active:scale-95 active:bg-[#E6AC00] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC20E]"
          >
            <Phone className="w-5 h-5 text-[#111111]" />
          </a>

          {/* Accessible Hamburger Drawer Trigger */}
          <MobileNavDrawer />
        </div>
      </div>
    </header>
  );
}
