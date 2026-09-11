import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  index: string; // e.g. "01"
  title: string; // e.g. "ABOUT"
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  index,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16 space-y-2", className)}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
          {"//"} {index} {"//"}
        </span>
        <div className="h-[1px] w-8 bg-[var(--accent)] opacity-40" />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-[var(--text-primary)] uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
