"use client";

import React, { useRef, useEffect } from "react";
import { experienceData } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HUDLabel } from "@/components/ui/HUDLabel";
import { TechBadge } from "@/components/ui/TechBadge";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Progressively reveal each timeline item
      gsap.from(".exp-checkpoint", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        stagger: 0.25,
        duration: 0.85,
        ease: "power3.out",
      });

      // Animate vertical timeline progression line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
      aria-label="Professional Experience and Career Timeline"
    >
      <SectionHeading
        index="03"
        title="ENGINEERING TIMELINE"
        subtitle="Chronological track record of architecting backend services, commercial platforms, and AI test automation."
      />

      {/* Main Timeline Column */}
      <div className="relative pl-6 sm:pl-10 md:pl-16 space-y-12">
        {/* Background static line */}
        <div
          className="absolute left-2 sm:left-4 md:left-6 top-2 bottom-6 w-[2px] bg-[rgba(255,255,255,0.08)]"
          aria-hidden="true"
        />

        {/* Animated scrubbed progress line */}
        <div
          ref={lineRef}
          className="absolute left-2 sm:left-4 md:left-6 top-2 bottom-6 w-[2px] bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
          aria-hidden="true"
        />

        {experienceData.map((item) => (
          <div
            key={item.id}
            className="exp-checkpoint relative group"
          >
            {/* Timeline node marker */}
            <div
              className={`absolute -left-[27px] sm:-left-[35px] md:-left-[43px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                item.isCurrent
                  ? "border-[var(--accent)] bg-[#05070D] shadow-[0_0_12px_var(--accent)]"
                  : "border-[rgba(255,255,255,0.3)] bg-[#05070D] group-hover:border-[var(--accent)]"
              }`}
              aria-hidden="true"
            >
              {item.isCurrent && (
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mx-auto mt-0.5 animate-ping" />
              )}
            </div>

            {/* Checkpoint Card */}
            <div className="hud-box p-6 md:p-8 rounded-lg bg-[var(--surface-overlay)] backdrop-blur-sm space-y-4 hover:border-[rgba(0,240,255,0.3)] transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={13} />
                      {item.period}
                    </span>
                    {item.isCurrent && (
                      <HUDLabel variant="accent" size="sm" withDot={false}>
                        ACTIVE ROLE
                      </HUDLabel>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Briefcase size={18} className="text-[var(--accent)] shrink-0" />
                    <span>{item.role}</span>
                  </h3>
                </div>

                <div className="text-right sm:text-left">
                  <div className="font-mono text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                    {item.company}
                  </div>
                  {item.location && (
                    <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <MapPin size={11} />
                      {item.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Role Summary */}
              <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Key Contributions */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  KEY CONTRIBUTIONS // IMPACT
                </div>
                <ul className="space-y-1.5">
                  {item.contributions.map((contribution, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-[var(--accent)] shrink-0 mt-0.5"
                      />
                      <span>{contribution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack Tags */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
