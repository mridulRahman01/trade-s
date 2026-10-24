"use client";

import React from "react";
import { rentalRatesContent, FleetRow } from "@/data/rental-rates-content";

export function RatesFleetTable() {
  return (
    <section
      id="glance"
      className="scroll-mt-28 bg-[#FFFFFF] border-b border-[#E5E5E0] py-12 md:py-[72px] lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[65ch] mb-8">
          <h2 className="font-heading font-bold text-[#111111] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight uppercase">
            {rentalRatesContent.fleetAtAGlance.heading}
          </h2>
          <div className="w-12 h-1 bg-[#FFC20E] mt-4 mb-6" aria-hidden="true" />
        </div>

        {/* Real Table for Desktop / Tablet (>= 768px) */}
        <div className="hidden md:block overflow-x-auto border border-[#E5E5E0] rounded-[6px]">
          <table className="w-full text-left border-collapse text-sm">
            <caption className="sr-only">Fleet equipment summary and capacities</caption>
            <thead>
              <tr className="bg-[#F7F7F5] border-b border-[#E5E5E0] text-xs font-semibold uppercase tracking-wider text-[#111111]">
                {rentalRatesContent.fleetAtAGlance.columns.map((col) => (
                  <th key={col} scope="col" className="py-4 px-4 font-bold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E0]">
              {rentalRatesContent.fleetAtAGlance.rows.map((row: FleetRow) => (
                <tr
                  key={row.category}
                  className="even:bg-[#F7F7F5] odd:bg-white hover:bg-[#FFC20E]/10 transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-[#111111] whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="py-4 px-4 text-[#3D3D3D]">{row.keyEquipment}</td>
                  <td className="py-4 px-4 text-[#3D3D3D]">{row.capacityOptions}</td>
                  <td className="py-4 px-4 text-[#3D3D3D]">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stacked Cards for Mobile (< 768px) */}
        <div className="md:hidden space-y-4">
          {rentalRatesContent.fleetAtAGlance.rows.map((row: FleetRow) => (
            <div
              key={`card-${row.category}`}
              className="p-5 bg-white border border-[#E5E5E0] rounded-[6px] space-y-3 shadow-sm"
            >
              <h3 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E5E5E0] pb-2">
                {row.category}
              </h3>
              <div className="space-y-2 text-sm text-[#3D3D3D]">
                <div>
                  <span className="font-semibold text-[#111111] block text-xs uppercase tracking-wider mb-0.5">
                    Key Equipment:
                  </span>
                  {row.keyEquipment}
                </div>
                <div>
                  <span className="font-semibold text-[#111111] block text-xs uppercase tracking-wider mb-0.5">
                    Capacity/Options:
                  </span>
                  {row.capacityOptions}
                </div>
                <div>
                  <span className="font-semibold text-[#111111] block text-xs uppercase tracking-wider mb-0.5">
                    Best For:
                  </span>
                  {row.bestFor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
