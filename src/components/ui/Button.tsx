"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase transition-all duration-200 select-none group cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-xs md:text-sm px-5 py-2.5 gap-2",
    lg: "text-sm md:text-base px-7 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[var(--accent)] text-[#05070D] font-semibold hover:bg-[#38E8FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-[0.98]",
    secondary:
      "bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[rgba(0,240,255,0.06)] active:scale-[0.98]",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-[rgba(255,255,255,0.18)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]",
  };

  const innerContent = (
    <>
      <span>{children}</span>
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        >
          {innerContent}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {innerContent}
    </button>
  );
}
