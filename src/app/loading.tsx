import * as React from "react";
import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-12 bg-slate-50 min-h-[50vh]">
      <Container>
        <div className="space-y-6 max-w-4xl mx-auto">
          <Skeleton className="h-10 w-2/3 bg-slate-200" />
          <Skeleton className="h-6 w-full bg-slate-200" />
          <Skeleton className="h-6 w-4/5 bg-slate-200" />
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-2xl bg-slate-200" />
            <Skeleton className="h-64 rounded-2xl bg-slate-200" />
            <Skeleton className="h-64 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </Container>
    </div>
  );
}
