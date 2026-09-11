"use client";

import React, { useRef, useEffect } from "react";
import { profileData } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HUDLabel } from "@/components/ui/HUDLabel";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Layers, ShieldCheck, Zap, Bot } from "lucide-react";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-stat-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 35,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".about-content-block", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -25,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const statIcons = [
    <Zap key="zap" size={20} className="text-[var(--accent)]" />,
    <Layers key="layers" size={20} className="text-[var(--accent)]" />,
    <ShieldCheck key="shield" size={20} className="text-[var(--accent)]" />,
    <Bot key="bot" size={20} className="text-[var(--accent)]" />,
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
      aria-label="About the Engineer"
    >
      <SectionHeading
        index="01"
        title="ABOUT THE ENGINEER"
        subtitle="Bridging high-performance backend architecture with reactive client interfaces and autonomous AI pipelines."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left narrative & philosophy column */}
        <div className="lg:col-span-6 space-y-6 about-content-block">
          <div className="flex items-center gap-2">
            <HUDLabel variant="accent" size="sm">
              ENGINEERING PERSPECTIVE
            </HUDLabel>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {"// CORE VALUES"}
            </span>
          </div>

          <blockquote className="p-5 md:p-6 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
            <p className="text-lg md:text-xl font-mono text-[var(--text-primary)] leading-relaxed italic">
              &ldquo;{profileData.philosophy}&rdquo;
            </p>
          </blockquote>

          <div className="space-y-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
            <p>
              I specialize in architecting distributed systems centered around 
              <strong className="text-[var(--text-primary)] font-mono"> Java 21</strong>, 
              <strong className="text-[var(--text-primary)] font-mono"> Spring Boot</strong>, and 
              <strong className="text-[var(--text-primary)] font-mono"> Microservices</strong>, coupled with modern 
              <strong className="text-[var(--text-primary)] font-mono"> React.js</strong> and 
              <strong className="text-[var(--text-primary)] font-mono"> TypeScript</strong> client experiences.
            </p>
            <p>
              Beyond traditional full-stack development, I integrate 
              <strong className="text-[var(--accent)]"> GenAI workflows</strong> into production—deploying LLM agents, 
              tool-calling orchestration, and automated test synthesis pipelines that minimize manual QA overhead 
              while enforcing deterministic quality benchmarks.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs text-[var(--text-muted)]">
            <span className="px-2.5 py-1 rounded border border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
              CLEAN ARCHITECTURE
            </span>
            <span className="px-2.5 py-1 rounded border border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
              EVENT-DRIVEN PATTERNS
            </span>
            <span className="px-2.5 py-1 rounded border border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
              DETERMINISTIC TESTING
            </span>
            <span className="px-2.5 py-1 rounded border border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
              CI/CD RESILIENCE
            </span>
          </div>
        </div>

        {/* Right 4-card telemetry metric grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profileData.stats.map((stat, index) => (
            <div
              key={stat.label}
              className="about-stat-card hud-box p-5 md:p-6 rounded-lg space-y-3 transition-transform duration-200 hover:-translate-y-1 hover:border-[rgba(0,240,255,0.4)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase">
                  {stat.sublabel}
                </span>
                {statIcons[index % statIcons.length]}
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                  {stat.value}
                </div>
                <div className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                  {stat.label}
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-1">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
