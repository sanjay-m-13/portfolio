"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HUDLabel } from "@/components/ui/HUDLabel";
import { TechBadge } from "@/components/ui/TechBadge";
import { Button } from "@/components/ui/Button";
import { useProjectHorizontalScroll } from "@/lib/animations/projectHorizontalScroll";
import { ExternalLink, FileText, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";

export function Projects() {
  const { containerRef, trackRef, isDesktop } = useProjectHorizontalScroll();
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`relative z-10 ${
        isDesktop
          ? "h-screen flex flex-col justify-center overflow-hidden"
          : "min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto"
      }`}
      aria-label="Engineering Projects Showcase"
    >
      {/* Header Container */}
      <div className={`${isDesktop ? "px-8 max-w-7xl mx-auto w-full pt-6" : ""}`}>
        <div className="flex items-center justify-between">
          <SectionHeading
            index="04"
            title="MISSION PORTFOLIO"
            subtitle="Architectural systems, agentic automation frameworks, and distributed enterprise platforms."
            className="mb-6 md:mb-8"
          />

          {isDesktop && (
            <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-[var(--accent)] border border-[var(--border)] px-3 py-1.5 rounded bg-[var(--surface-overlay)]">
              <span>SCROLL HORIZONTALLY</span>
              <ArrowRight size={14} />
            </div>
          )}
        </div>
      </div>

      {/* Project Cards Track */}
      <div
        ref={trackRef}
        className={`flex ${
          isDesktop
            ? "flex-row gap-8 px-8 items-stretch w-max pb-8"
            : "flex-col gap-8 w-full"
        }`}
      >
        {projectsData.map((project) => {
          const isHovered = hoveredProjectId === project.id;

          return (
            <article
              key={project.id}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              className={`border border-[var(--border)] bg-[var(--surface-elevated)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                isDesktop
                  ? "w-[480px] lg:w-[540px] shrink-0 hover:border-[rgba(0,240,255,0.45)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                  : "w-full hover:border-[rgba(0,240,255,0.3)]"
              }`}
            >
              {/* Top Card Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                  <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                    MISSION // {project.number}
                  </span>
                  <HUDLabel variant={isHovered ? "accent" : "muted"} size="sm">
                    {isHovered ? "SYSTEM FOCUS" : "DEPLOYED"}
                  </HUDLabel>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-mono font-bold text-[var(--text-primary)] leading-snug">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--accent)]">
                    {"//"} {project.tagline}
                  </p>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Highlights: Architecture, Challenge, Outcome */}
                <div className="space-y-2.5 pt-2">
                  {project.highlights.map((highlight) => (
                    <div
                      key={highlight.label}
                      className="p-2.5 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(5,7,13,0.4)] space-y-1"
                    >
                      <div className="font-mono text-[10px] text-[var(--accent)] tracking-wider uppercase font-semibold">
                        {highlight.label}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] leading-normal">
                        {highlight.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Tech Stack & Action Links */}
              <div className="pt-6 space-y-5">
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>

                {/* External Action Links */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {project.links?.live && (
                    <Button
                      variant="primary"
                      size="sm"
                      href={project.links.live}
                      external
                      icon={<ExternalLink size={12} />}
                    >
                      VIEW PROJECT
                    </Button>
                  )}

                  {project.links?.github && (
                    <Button
                      variant="secondary"
                      size="sm"
                      href={project.links.github}
                      external
                      icon={<GitHubIcon size={12} />}
                    >
                      GITHUB
                    </Button>
                  )}

                  {project.links?.caseStudy && (
                    <Button
                      variant="ghost"
                      size="sm"
                      href={project.links.caseStudy}
                      external
                      icon={<FileText size={12} />}
                    >
                      CASE STUDY
                    </Button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
