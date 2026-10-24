"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log unexpected errors internally if needed
  }, [error]);

  return (
    <Section spacing="xl" className="bg-slate-50 min-h-[65vh] flex items-center">
      <Container size="narrow">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Application Notice
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Temporary Display Error
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We encountered an unexpected issue while loading this page. Please try refreshing or reach out directly to dispatch.
            </p>
          </div>

          <div className="pt-2 text-xs text-slate-500">
            Need equipment urgently? Call dispatch directly at{" "}
            <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-bold text-amber-700 hover:underline">
              {siteConfig.contact.phone}
            </a>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => reset()}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              <span>Retry Page</span>
            </Button>

            <Button asChild variant="outline" className="w-full sm:w-auto min-h-[44px]">
              <Link href="/">
                <Home className="w-4 h-4 mr-1.5" />
                <span>Return to Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
