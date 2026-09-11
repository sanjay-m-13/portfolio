"use client";

import React, { useRef, useEffect } from "react";
import { profileData } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { HUDLabel } from "@/components/ui/HUDLabel";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { ArrowDown, Code2, Terminal, Cpu } from "lucide-react";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!heroRef.current || isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal of hero elements
      gsap.from(".hero-elem", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 1.0,
        ease: "power3.out",
      });

      // Subtle pulse on HUD telemetry tags
      gsap.to(".telemetry-glow", {
        opacity: 0.5,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto z-10"
      aria-label="Hero Introduction"
    >
      {/* Top HUD Telemetry Row */}
      <div className="hero-elem flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3 telemetry-glow">
          <HUDLabel variant="accent" size="sm">
            SYSTEM ONLINE
          </HUDLabel>
          <HUDLabel variant="muted" size="sm">
            WEBGL CORE ACTIVE
          </HUDLabel>
        </div>

        <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <Cpu size={14} className="text-[var(--accent)]" />
            JAVA 21 / SPRING BOOT
          </span>
          <span className="text-[var(--border)]">|</span>
          <span className="flex items-center gap-1.5">
            <Code2 size={14} className="text-[var(--accent)]" />
            REACT 19 / TS
          </span>
          <span className="text-[var(--border)]">|</span>
          <span className="flex items-center gap-1.5">
            <Terminal size={14} className="text-[var(--accent)]" />
            GENAI WORKFLOWS
          </span>
        </div>
      </div>

      {/* Center Main Stage Content */}
      <div className="my-auto py-12 max-w-3xl space-y-6">
        <div className="hero-elem">
          <span className="inline-block font-mono text-xs md:text-sm tracking-widest text-[var(--accent)] uppercase font-semibold">
            {"//"} {profileData.eyebrow}
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="hero-elem text-4xl sm:text-6xl lg:text-7xl font-mono font-bold tracking-tight text-[var(--text-primary)] leading-[1.08] uppercase"
        >
          {profileData.headline.split(" ").map((word, idx) => (
            <span key={idx} className="inline-block mr-3">
              {word === "INTELLIGENT" ? (
                <span className="text-[var(--accent)] glow-text-subtle">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        <div className="hero-elem flex items-center gap-2 font-mono text-sm md:text-base text-[var(--text-primary)] tracking-wide">
          <span className="text-[var(--accent)] font-bold">►</span>
          <span className="font-semibold text-[var(--accent)]">{profileData.supportingCopy}</span>
        </div>

        <p className="hero-elem text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl font-sans">
          {profileData.summary}
        </p>

        {/* Call to Actions */}
        <div className="hero-elem pt-4 flex flex-wrap items-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollTo("#projects")}
          >
            VIEW PROJECTS
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollTo("#contact")}
          >
            CONTACT ME
          </Button>
        </div>
      </div>

      {/* Bottom HUD Bar & Scroll Down Cue */}
      <div className="hero-elem flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-b border-[rgba(255,255,255,0.06)] pb-4">
        <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>PRODUCTION READY // AVAILABLE FOR ENGINEERING ROLES</span>
        </div>

        <button
          type="button"
          onClick={() => scrollTo("#about")}
          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group cursor-pointer"
          aria-label="Scroll to About section"
        >
          <span className="tracking-widest uppercase">SCROLL TO EXPLORE</span>
          <ArrowDown
            size={14}
            className="text-[var(--accent)] animate-bounce"
          />
        </button>
      </div>
    </section>
  );
}
