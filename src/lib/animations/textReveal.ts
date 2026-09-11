"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useTextReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || isReducedMotion) return;

    const ctx = gsap.context(() => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 24,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            delay,
            ease: "power3.out",
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [delay, isReducedMotion]);

  return ref;
}
