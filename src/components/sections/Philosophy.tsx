"use client";

import React from "react";
import { philosophyPrinciples } from "@/data/socials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative min-h-[70vh] py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
      aria-label="Engineering Philosophy"
    >
      <SectionHeading
        index="05"
        title="HOW I BUILD"
        subtitle="Core principles governing my system design, automation workflows, and code craftsmanship."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {philosophyPrinciples.map((principle) => (
          <div
            key={principle.number}
            className="border border-[var(--border)] bg-[var(--surface-elevated)] p-6 rounded-2xl space-y-4 hover:border-[rgba(0,240,255,0.45)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,240,255,0.12)] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="font-mono text-2xl font-bold text-[var(--accent)] tracking-wider">
                {principle.number}
              </div>

              <h3 className="font-mono text-lg font-bold text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent)] transition-colors">
                {principle.title}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                {principle.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[var(--text-muted)] italic">
              &gt; {principle.keyRule}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
