"use client";

import React from "react";

export function ThreeFallback({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center bg-[var(--background)]"
      aria-hidden="true"
    >
      {/* Subtle radial glow representing the core */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.08)_0%,rgba(5,7,13,0)_70%)]" />

      {/* Concentric orbital rings rendered in SVG */}
      <svg
        className="absolute w-[680px] h-[680px] text-[var(--accent)] opacity-20"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle
          cx="300"
          cy="300"
          r="140"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="300"
          cy="300"
          r="220"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 12"
        />
        <circle
          cx="300"
          cy="300"
          r="280"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.5"
        />
        {/* Cardinal HUD ticks */}
        <line x1="300" y1="10" x2="300" y2="35" stroke="currentColor" strokeWidth="1.5" />
        <line x1="300" y1="565" x2="300" y2="590" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="300" x2="35" y2="300" stroke="currentColor" strokeWidth="1.5" />
        <line x1="565" y1="300" x2="590" y2="300" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Central Geometric Glyph */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 border border-[var(--accent)] opacity-40 rotate-45" />
        <div className="absolute inset-3 border border-[rgba(255,255,255,0.15)] -rotate-12" />
        <div className="w-3 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]" />
      </div>

      {isLoading && (
        <div className="absolute bottom-10 right-10 text-[11px] font-mono text-[var(--text-secondary)] tracking-widest uppercase flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          <span>INITIALIZING CORE TELEMETRY...</span>
        </div>
      )}
    </div>
  );
}
