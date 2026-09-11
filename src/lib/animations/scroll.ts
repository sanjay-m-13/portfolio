"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useScrollAnimation<T extends HTMLElement>(
  animationCreator: (element: T, ctx: gsap.Context) => void,
  deps: unknown[] = []
) {
  const elementRef = useRef<T>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!elementRef.current || isReducedMotion) return;

    const ctx = gsap.context(() => {
      if (elementRef.current) {
        animationCreator(elementRef.current, ctx);
      }
    }, elementRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReducedMotion, ...deps]);

  return elementRef;
}

export function createFadeUp(
  target: gsap.DOMTarget,
  trigger?: gsap.DOMTarget,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 35,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: trigger
        ? {
            trigger,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        : undefined,
      ...options,
    }
  );
}
