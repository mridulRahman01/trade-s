import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  spacing?: "none" | "sm" | "default" | "lg" | "xl";
  variant?: "default" | "muted" | "dark" | "surface";
}

export function Section({
  as: Component = "section",
  className,
  spacing = "default",
  variant = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "w-full relative",
        spacing === "none" && "py-0",
        spacing === "sm" && "py-8 md:py-12",
        spacing === "default" && "py-12 md:py-16 lg:py-20",
        spacing === "lg" && "py-16 md:py-24",
        spacing === "xl" && "py-20 md:py-32",
        variant === "default" && "bg-background text-foreground",
        variant === "muted" && "bg-slate-50 text-slate-900 border-y border-slate-200/80",
        variant === "surface" && "bg-slate-100/60 text-slate-900",
        variant === "dark" && "bg-slate-950 text-white border-y border-slate-800",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
