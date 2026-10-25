"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithSkeletonProps extends Omit<ImageProps, "onLoad"> {
  containerClassName?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  className = "",
  containerClassName = "",
  priority = false,
  sizes,
  fill = true,
  ...rest
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#F7F7F5] ${containerClassName}`}
      aria-busy={!isLoaded}
    >
      {/* Skeleton Shimmer Loading State */}
      {!isLoaded && !hasError && (
        <div
          data-testid="image-skeleton"
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#F7F7F5] animate-pulse"
        >
          {/* Subtle Shimmer Highlight Gradient */}
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-[#ECECE8]/80 to-transparent"
            style={{
              animation: "shimmer 1.8s infinite",
            }}
          />
          {/* Subtle Equipment Icon Silhouette in Placeholder */}
          <svg
            className="w-10 h-10 text-[#D8D8D3]/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Fallback if Image Fails to Load */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F7F7F5] p-4 text-center">
          <span className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
            Image Preview
          </span>
          <span className="text-xs text-[#888888] mt-1 line-clamp-1">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
}
