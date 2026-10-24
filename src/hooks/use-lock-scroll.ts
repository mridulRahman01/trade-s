import { useEffect } from "react";

/**
 * Robust scroll lock hook supporting iOS Safari and desktop browsers.
 * Preserves scroll position and prevents layout shifts / background bounce.
 */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked || typeof window === "undefined") return;

    const scrollY = window.scrollY;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalOverflow = document.body.style.overflow;

    // Apply fixed positioning with negative top offset
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore previous styles
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;

      // Restore exact scroll position
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
