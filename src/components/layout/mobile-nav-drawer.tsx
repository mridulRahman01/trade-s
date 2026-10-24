"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { navigationConfig, NavChildGroup } from "@/config/navigation";
import { useQuoteDrawer } from "@/context/quote-drawer-context";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { X, ChevronDown, Phone, MessageCircle, FileText } from "lucide-react";

export function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openDrawer } = useQuoteDrawer();

  // Reset drawer state when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [equipmentManualToggle, setEquipmentManualToggle] = useState<boolean | null>(null);
  const [categoryManualGroup, setCategoryManualGroup] = useState<string | null>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setEquipmentManualToggle(null);
    setCategoryManualGroup(null);
  }

  const isEquipmentRoute = pathname.startsWith("/equipment");
  const equipmentOpen = equipmentManualToggle ?? isEquipmentRoute;

  // Auto-select category group if on a product slug
  const activeProductGroup = (() => {
    if (!isEquipmentRoute) return null;
    const equipmentItem = navigationConfig.mainNav.find((item) => item.label === "Equipment");
    if (equipmentItem?.childrenGroups) {
      for (const group of equipmentItem.childrenGroups) {
        if (group.items.some((prod) => prod.href === pathname)) {
          return group.categorySlug;
        }
      }
    }
    return null;
  })();

  const openCategoryGroup = categoryManualGroup !== null ? categoryManualGroup : activeProductGroup;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // iOS-safe scroll locking that restores exact scroll position
  useLockScroll(isOpen);

  // Manage body attribute so mobile bottom action bars hide while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("data-mobile-menu-open", "true");
    } else {
      document.body.removeAttribute("data-mobile-menu-open");
    }
    return () => {
      document.body.removeAttribute("data-mobile-menu-open");
    };
  }, [isOpen]);

  // Close menu if window is resized past 1024px (desktop breakpoint)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Move focus to close button on open, and return focus to hamburger on close
  useEffect(() => {
    if (isOpen) {
      const mainContent = document.getElementById("main-content");
      const footer = document.querySelector("footer");
      if (mainContent) mainContent.setAttribute("aria-hidden", "true");
      if (footer) footer.setAttribute("aria-hidden", "true");

      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        if (mainContent) mainContent.removeAttribute("aria-hidden");
        if (footer) footer.removeAttribute("aria-hidden");
      };
    } else {
      // Returned focus to hamburger button
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      // Trap focus inside dialog
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArr = Array.from(focusables).filter(
          (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
        );

        if (focusableArr.length === 0) return;

        const firstElement = focusableArr[0];
        const lastElement = focusableArr[focusableArr.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Swipe right on panel to close (60px threshold) without breaking vertical scroll
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!touchStartRef.current) return;
    const diffX = e.clientX - touchStartRef.current.x;
    const diffY = e.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Detect horizontal swipe to the right (>= 60px) with dominance over vertical scroll
    if (diffX > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      setIsOpen(false);
    }
  };

  // Close and open Quote Drawer without stacking overlays
  const handleQuoteClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      openDrawer();
    }, 60);
  };

  // Handle smooth scroll for anchor links
  const handleNavClick = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("/#") || href.includes("#")) {
      const [path, hash] = href.split("#");
      const isCurrentPage =
        (path === "" || path === "/") ? pathname === "/" : pathname === path;

      if (isCurrentPage && hash) {
        setTimeout(() => {
          const target = document.getElementById(hash);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  const isCurrentRoute = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      if (href.startsWith("/#")) {
        return pathname === "/";
      }
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname]
  );

  return (
    <>
      {/* 48x48px Hamburger Button with 3 dark bars animating into X */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        className="lg:hidden w-12 h-12 flex items-center justify-center rounded-[6px] text-[#111111] hover:bg-[#F7F7F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC20E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] transition-colors relative select-none"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between items-center pointer-events-none">
          <span
            className={`w-6 h-[2px] bg-[#111111] rounded-full transition-transform duration-200 ease-out origin-center motion-reduce:transition-none ${
              isOpen ? "translate-y-[9px] rotate-45" : "translate-y-0 rotate-0"
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#111111] rounded-full transition-opacity duration-200 ease-out motion-reduce:transition-none ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#111111] rounded-full transition-transform duration-200 ease-out origin-center motion-reduce:transition-none ${
              isOpen ? "-translate-y-[9px] -rotate-45" : "translate-y-0 rotate-0"
            }`}
          />
        </div>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#111111]/50 z-50 transition-opacity duration-200 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } motion-reduce:transition-none`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        id="mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className={`fixed top-0 right-0 bottom-0 z-50 w-[min(88vw,400px)] h-[100dvh] min-h-[100dvh] bg-white flex flex-col shadow-2xl border-l border-[#E5E5E0] lg:hidden transition-transform duration-200 ease-out motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Panel Header: wordmark on one line + close button */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#E5E5E0] shrink-0 bg-white">
          <span className="font-heading font-bold text-lg tracking-tight uppercase text-[#111111] whitespace-nowrap truncate pr-2">
            {siteConfig.name}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="w-11 h-11 flex items-center justify-center rounded-[6px] text-[#111111] hover:bg-[#F7F7F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC20E] focus-visible:ring-offset-2 transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-[#111111]" strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Link List */}
        <div className="flex-1 overflow-y-auto overscroll-contain py-2 bg-white">
          <nav aria-label="Mobile Navigation" className="flex flex-col">
            {navigationConfig.mainNav.map((item, idx) => {
              const isActive = isCurrentRoute(item.href);
              const hasSubgroups = Boolean(item.childrenGroups && item.childrenGroups.length > 0);

              return (
                <div
                  key={item.href}
                  className="border-b border-[#E5E5E0] last:border-b-0 transition-opacity duration-200 motion-reduce:transition-none"
                  style={{
                    transitionDelay: isOpen ? `${idx * 30}ms` : "0ms",
                  }}
                >
                  {/* Primary Row (56px tall, Barlow Condensed 28px) */}
                  <div
                    className={`min-h-[56px] flex items-center justify-between relative ${
                      isActive
                        ? "border-l-4 border-[#FFC20E] bg-[#F7F7F5]"
                        : "border-l-4 border-transparent hover:bg-[#F7F7F5]"
                    }`}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex-1 py-3 px-6 font-heading text-[28px] uppercase tracking-tight transition-colors ${
                        isActive
                          ? "font-bold text-[#111111]"
                          : "font-semibold text-[#111111] hover:text-[#6B6B6B]"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {/* Expandable row chevron for Equipment */}
                    {hasSubgroups && (
                      <button
                        type="button"
                        onClick={() => setEquipmentManualToggle(!equipmentOpen)}
                        aria-expanded={equipmentOpen}
                        aria-controls="mobile-equipment-sublist"
                        aria-label={equipmentOpen ? "Collapse equipment list" : "Expand equipment list"}
                        className="w-14 h-14 flex items-center justify-center text-[#111111] hover:bg-[#E5E5E0]/40 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC20E]"
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-[#111111] transition-transform duration-200 ease-out motion-reduce:transition-none ${
                            equipmentOpen ? "rotate-180" : "rotate-0"
                          }`}
                          strokeWidth={2}
                        />
                      </button>
                    )}
                  </div>

                  {/* Equipment Sub-list: Grouped by category, only one group open at a time */}
                  {hasSubgroups && equipmentOpen && (
                    <div
                      id="mobile-equipment-sublist"
                      className="bg-[#F7F7F5] border-t border-[#E5E5E0] pl-6 pr-4 py-2 transition-all duration-200 ease-out motion-reduce:transition-none"
                    >
                      {item.childrenGroups?.map((group: NavChildGroup) => {
                        const isGroupOpen = openCategoryGroup === group.categorySlug;

                        return (
                          <div key={group.categorySlug} className="border-b border-[#E5E5E0] last:border-b-0 py-1">
                            {/* Category Group Header Button */}
                            <button
                              type="button"
                              onClick={() =>
                                setCategoryManualGroup(
                                  isGroupOpen ? null : group.categorySlug
                                )
                              }
                              aria-expanded={isGroupOpen}
                              className="w-full flex items-center justify-between py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC20E]"
                            >
                              <span className="font-heading text-sm font-bold tracking-wider uppercase text-[#3D3D3D]">
                                {group.categoryName}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 text-[#6B6B6B] transition-transform duration-200 ${
                                  isGroupOpen ? "rotate-180" : "rotate-0"
                                }`}
                                strokeWidth={2}
                              />
                            </button>

                            {/* Sub-links (48px tall, Public Sans 16px) */}
                            {isGroupOpen && (
                              <div className="pl-2 pb-1 space-y-0.5">
                                {group.items.map((subItem) => {
                                  const isProductActive = pathname === subItem.href;

                                  return (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={() => handleNavClick(subItem.href)}
                                      aria-current={isProductActive ? "page" : undefined}
                                      className={`h-12 flex items-center px-3 rounded-[4px] font-sans text-base transition-colors ${
                                        isProductActive
                                          ? "font-bold text-[#111111] bg-white border-l-4 border-[#FFC20E] shadow-xs"
                                          : "font-normal text-[#3D3D3D] hover:text-[#111111] hover:bg-white"
                                      }`}
                                    >
                                      <span className="truncate">{subItem.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Panel Footer Pinned to Bottom */}
        <div className="p-6 border-t border-[#E5E5E0] bg-[#FFFFFF] shrink-0 space-y-4">
          {/* Yellow Request a Quote Button */}
          <button
            type="button"
            onClick={handleQuoteClick}
            className="w-full h-12 bg-[#FFC20E] hover:bg-[#E6AC00] active:scale-[0.99] text-[#111111] font-semibold text-base rounded-[6px] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            <FileText className="w-5 h-5 mr-2 text-[#111111]" />
            Request a Quote
          </button>

          {/* Side-by-Side Outline Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="h-11 border border-[#E5E5E0] bg-white hover:bg-[#F7F7F5] active:bg-[#E5E5E0] text-[#111111] font-medium text-xs sm:text-sm rounded-[6px] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC20E]"
            >
              <Phone className="w-4 h-4 mr-1.5 text-[#111111] shrink-0" />
              <span className="truncate">Call {siteConfig.contact.phone}</span>
            </a>

            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 border border-[#E5E5E0] bg-white hover:bg-[#F7F7F5] active:bg-[#E5E5E0] text-[#111111] font-medium text-xs sm:text-sm rounded-[6px] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC20E]"
            >
              <MessageCircle className="w-4 h-4 mr-1.5 text-[#111111] shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Business Details Block */}
          <div className="pt-2 text-xs text-[#3D3D3D] space-y-1">
            <p className="truncate">
              <span className="font-semibold text-[#111111]">Email:</span>{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
            <p className="truncate">
              <span className="font-semibold text-[#111111]">Address:</span> {siteConfig.address.formatted}
            </p>
            <p className="truncate">
              <span className="font-semibold text-[#111111]">Hours:</span> {siteConfig.operatingHours.display}
            </p>
            <p className="font-semibold text-[#111111] pt-1 border-t border-[#E5E5E0]">
              Proprietor: {siteConfig.proprietor}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
