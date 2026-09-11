"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isReducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine) and (hover: hover)");
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!isFinePointer || isReducedMotion || typeof window === "undefined") return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement | null;
      if (
        targetEl?.closest("a, button, [role='button'], input, textarea, select")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    let animId: number;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isFinePointer, isReducedMotion]);

  if (!isFinePointer || isReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Central accent dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-opacity duration-150"
      />
      {/* Outer subtle targeting reticle */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-3 -mt-3 rounded-full border border-[var(--accent)] transition-all duration-200 ${
          isHovered
            ? "w-10 h-10 -ml-5 -mt-5 opacity-40 bg-[rgba(0,240,255,0.06)]"
            : "w-6 h-6 opacity-25"
        }`}
      />
    </div>
  );
}
