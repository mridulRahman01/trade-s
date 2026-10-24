import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { HardHat, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Section spacing="xl" className="bg-slate-50 min-h-[65vh] flex items-center">
      <Container size="narrow">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto">
            <HardHat className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              404 · Page Not Found
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Equipment or Page Not Found
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The equipment model, category, or page you requested could not be located. It may have been updated or moved in our catalog.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold min-h-[44px]">
              <Link href="/equipment">
                <span>Browse Fleet Catalog</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
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
