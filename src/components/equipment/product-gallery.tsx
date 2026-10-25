"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { EquipmentImage } from "@/types/equipment";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ProductGalleryProps {
  images: EquipmentImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If no images provided, fallback to fleet hero image
  const galleryImages = images.length > 0 ? images : [
    { src: "/images/hero/hero-fleet.webp", alt: productName }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container with Skeleton Loader */}
      <div className="relative aspect-[3/2] sm:aspect-[4/3] w-full bg-[#F7F7F5] rounded-[6px] overflow-hidden border border-[#E5E5E0] group">
        <ImageWithSkeleton
          src={galleryImages[activeIndex].src}
          alt={galleryImages[activeIndex].alt || `${productName} view`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
          containerClassName="w-full h-full"
        />

        {/* Expand / Fullscreen Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="View full size image"
          className="absolute top-3 right-3 w-10 h-10 rounded-[6px] bg-white/90 border border-[#E5E5E0] text-[#111111] flex items-center justify-center hover:bg-white transition-colors"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Prev / Next controls if multiple images */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E5E5E0] text-[#111111] flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E5E5E0] text-[#111111] flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Mobile Swipe / Dot Indicators */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    activeIndex === idx ? "bg-[#FFC20E]" : "bg-white/80 border border-[#E5E5E0]"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Row (horizontally scrollable) */}
      {galleryImages.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar py-1">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-16 rounded-[4px] overflow-hidden shrink-0 border-2 transition-all ${
                activeIndex === idx
                  ? "border-[#FFC20E] ring-1 ring-[#FFC20E]"
                  : "border-[#E5E5E0] opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal View */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#111111]/95 flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full h-[60vh] sm:h-[80vh]">
            <Image
              src={galleryImages[activeIndex].src}
              alt={galleryImages[activeIndex].alt || productName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
