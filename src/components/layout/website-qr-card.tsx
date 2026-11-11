import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Download, ExternalLink, QrCode } from "lucide-react";

interface WebsiteQrCardProps {
  className?: string;
}

export function WebsiteQrCard({ className = "" }: WebsiteQrCardProps) {
  const targetUrl = siteConfig.websiteUrl || "https://www.mirsulaimantradecenter.com/";

  return (
    <div
      className={`bg-white border border-[#E5E5E0] border-t-4 border-t-[#FFC20E] rounded-[6px] p-6 space-y-5 ${className}`}
    >
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
          <QrCode className="w-4 h-4 text-[#111111]" aria-hidden="true" />
          <span>Quick Mobile Access</span>
        </div>
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#111111] uppercase tracking-tight">
          Scan to Visit Website
        </h3>
        <p className="text-sm text-[#3D3D3D] leading-relaxed">
          Scan this QR code with any smartphone camera to open our website directly.
        </p>
      </div>

      <figure className="flex flex-col items-center text-center bg-[#F7F7F5] border border-[#E5E5E0] rounded-[6px] p-4 space-y-3">
        <div className="bg-white p-2.5 rounded-[4px] border border-[#E5E5E0]">
          <Image
            src="/images/brand/website-qr-code.png"
            alt={`QR code linking to ${targetUrl}`}
            width={200}
            height={200}
            sizes="200px"
            loading="lazy"
            className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] block"
          />
        </div>
        <figcaption className="text-xs text-[#3D3D3D] break-all">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#111111] hover:underline"
          >
            <span>www.mirsulaimantradecenter.com</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </a>
        </figcaption>
      </figure>

      <div className="grid grid-cols-2 gap-2.5">
        <a
          href="/images/brand/website-qr-code.png"
          download="mirsulaiman-tradecenter-qr.png"
          className="min-h-[44px] px-3 py-2 rounded-[6px] bg-[#FFC20E] hover:bg-[#E6AC00] text-[#111111] font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111]"
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>PNG</span>
        </a>
        <a
          href="/images/brand/website-qr-code.svg"
          download="mirsulaiman-tradecenter-qr.svg"
          className="min-h-[44px] px-3 py-2 rounded-[6px] border border-[#111111] bg-white hover:bg-[#F7F7F5] text-[#111111] font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111]"
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>SVG (Print)</span>
        </a>
      </div>
    </div>
  );
}

