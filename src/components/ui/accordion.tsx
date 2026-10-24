"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
}

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      if (prev.includes(value)) {
        if (!collapsible && prev.length === 1) return prev;
        return prev.filter((item) => item !== value);
      } else {
        if (type === "single") return [value];
        return [...prev, value];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("divide-y divide-slate-100", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <div
      data-value={value}
      className={cn("border-b border-slate-100 last:border-none", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ itemValue?: string }>, {
            itemValue: value,
          });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemValue?: string;
}

export function AccordionTrigger({
  itemValue = "",
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used inside Accordion");

  const isOpen = context.openItems.includes(itemValue);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => context.toggleItem(itemValue)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium transition-all text-sm sm:text-base",
        isOpen && "text-amber-600 font-bold",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ml-2",
          isOpen && "rotate-180 text-amber-600"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  itemValue?: string;
}

export function AccordionContent({
  itemValue = "",
  className,
  children,
  ...props
}: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used inside Accordion");

  const isOpen = context.openItems.includes(itemValue);

  if (!isOpen) return null;

  return (
    <div
      className={cn("pb-4 pt-1 text-sm text-slate-600 leading-relaxed animate-in fade-in duration-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}
