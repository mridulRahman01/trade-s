"use client";

import React from "react";
import { useDhakaBusinessStatus } from "@/lib/business-hours";

export function ContactStatusBadge() {
  const status = useDhakaBusinessStatus();

  // Server-rendered / pre-mount fallback to prevent hydration mismatch
  if (!status) {
    return (
      <div
        className="inline-flex items-center text-sm font-medium text-[#3D3D3D] mt-3"
        aria-live="polite"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#6B6B6B] mr-2 shrink-0" aria-hidden="true" />
        <span>Hours: Saturday to Thursday, 11:00 AM – 11:00 PM (Closed Friday)</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center text-sm font-semibold text-[#111111] mt-3 select-none"
      aria-live="polite"
      aria-label={`Current business status: ${status.statusText}`}
    >
      <span
        className={`w-2.5 h-2.5 rounded-full mr-2 shrink-0 ${
          status.isOpen ? "bg-[#10B981]" : "bg-[#6B6B6B]"
        }`}
        aria-hidden="true"
      />
      <span>{status.statusText}</span>
      <span className="text-xs font-normal text-[#6B6B6B] ml-2 hidden sm:inline">
        (Pabna local time: {status.dhakaTimeFormatted})
      </span>
    </div>
  );
}
