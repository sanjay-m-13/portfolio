import React from "react";
import { cn } from "@/lib/utils/cn";

interface TechBadgeProps {
  name: string;
  category?: string;
  highlight?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TechBadge({
  name,
  category,
  highlight = false,
  className,
  onClick,
}: TechBadgeProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded border transition-all duration-150",
        highlight
          ? "border-[rgba(0,240,255,0.4)] text-[var(--accent)] bg-[rgba(0,240,255,0.08)] shadow-[0_0_8px_rgba(0,240,255,0.15)]"
          : "border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.2)] hover:text-[var(--text-primary)]",
        onClick && "cursor-pointer active:scale-95",
        className
      )}
    >
      {category && (
        <span className="text-[9px] text-[var(--text-muted)] tracking-wider uppercase">
          {category}:
        </span>
      )}
      <span>{name}</span>
    </Component>
  );
}
