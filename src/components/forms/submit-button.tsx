import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
  loadingLabel?: string;
  className?: string;
}

export function SubmitButton({
  isSubmitting,
  label,
  loadingLabel = "Submitting...",
  className,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={`w-full min-h-[48px] bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-base shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-amber-600 disabled:opacity-70 ${
        className || ""
      }`}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          <span>{loadingLabel}</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span>{label}</span>
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </span>
      )}
    </Button>
  );
}
