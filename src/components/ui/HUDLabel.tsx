import React from "react";
import { cn } from "@/lib/utils/cn";

interface HUDLabelProps {
  children: React.ReactNode;
  variant?: "accent" | "muted" | "success";
  size?: "sm" | "md";
  className?: string;
  withDot?: boolean;
}

export function HUDLabel({
  children,
  variant = "accent",
  size = "sm",
  className,
  withDot = true,
}: HUDLabelProps) {
  const variantStyles = {
    accent: "text-[var(--accent)] border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.06)]",
    muted: "text-[var(--text-secondary)] border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)]",
    success: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
  };

  const dotColors = {
    accent: "bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]",
    muted: "bg-[var(--text-secondary)]",
    success: "bg-emerald-400 shadow-[0_0_8px_rgb(52,211,153)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono tracking-wider uppercase rounded border select-none transition-colors",
        size === "sm" ? "text-[11px] px-2.5 py-1" : "text-xs px-3.5 py-1.5",
        variantStyles[variant],
        className
      )}
    >
      {withDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full inline-block shrink-0", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
}
