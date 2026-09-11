"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Record<string, unknown>) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const isReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If reduced motion is requested, do not run Lenis smooth scroll
    if (isReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isReducedMotion]);

  const scrollTo = (target: string | HTMLElement | number, options?: Record<string, unknown>) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      if (typeof target === "string") {
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: isReducedMotion ? "auto" : "smooth" });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ getLenis: () => lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
