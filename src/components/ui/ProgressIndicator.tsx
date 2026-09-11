"use client";

import React, { useEffect, useState } from "react";
import { worldState, WorldSnapshot } from "@/lib/animations/worldState";

const TOTAL_SECTIONS = 6;

export function ProgressIndicator() {
  const [snapshot, setSnapshot] = useState<WorldSnapshot>(worldState.getState());

  useEffect(() => {
    return worldState.subscribe((next) => {
      setSnapshot(next);
    });
  }, []);

  const activeIndex = Math.min(TOTAL_SECTIONS, snapshot.currentCheckpoint + 1);
  const formattedIndex = activeIndex.toString().padStart(2, "0");
  const formattedTotal = TOTAL_SECTIONS.toString().padStart(2, "0");
  const percent = Math.round(snapshot.progress * 100);

  return (
    <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-secondary)] select-none">
      <span className="text-[var(--accent)] font-semibold">{formattedIndex}</span>
      <span className="text-[var(--text-muted)]">/</span>
      <span>{formattedTotal}</span>

      {/* Progress track */}
      <div
        className="w-16 h-1 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden relative"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className="h-full bg-[var(--accent)] transition-all duration-100 ease-out shadow-[0_0_6px_var(--accent)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
