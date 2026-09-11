"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsDesktop } from "@/hooks/useIsMobile";

export function useProjectHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    // Only enable pinned horizontal scroll on desktop without reduced motion
    if (!containerRef.current || !trackRef.current || !isDesktop || isReducedMotion) {
      return;
    }

    const container = containerRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isDesktop, isReducedMotion]);

  return { containerRef, trackRef, isDesktop: isDesktop && !isReducedMotion };
}
