"use client";

import React from "react";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#FFFFFF",
          color: "#111111",
          border: "1px solid #E5E5E0",
          borderRadius: "6px",
          fontFamily: "var(--font-public-sans), -apple-system, sans-serif",
          boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          padding: "14px 16px",
        },
        className: "group toast",
        actionButtonStyle: {
          background: "#FFC20E",
          color: "#111111",
          fontWeight: "700",
          fontSize: "12px",
          borderRadius: "4px",
          padding: "6px 12px",
          border: "none",
          cursor: "pointer",
        },
        cancelButtonStyle: {
          background: "#F7F7F5",
          color: "#3D3D3D",
          fontWeight: "600",
          fontSize: "12px",
          borderRadius: "4px",
          padding: "6px 10px",
          border: "1px solid #E5E5E0",
          cursor: "pointer",
        },
      }}
      closeButton
      richColors
    />
  );
}

export { toast } from "sonner";
