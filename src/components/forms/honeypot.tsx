import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export function HoneypotField({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        opacity: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <label htmlFor="website">Website</label>
      <input
        id="website"
        type="text"
        autoComplete="off"
        tabIndex={-1}
        {...registration}
      />
    </div>
  );
}
