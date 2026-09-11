"use client";

import React, { useState } from "react";
import { skillCategories, allSkills } from "@/data/skills";
import { Skill, SkillCategoryType } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HUDLabel } from "@/components/ui/HUDLabel";
import { TechBadge } from "@/components/ui/TechBadge";
import { Database, Layout, Bot, ServerCog, Info } from "lucide-react";

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategoryType | "ALL">("ALL");
  const [activeSkill, setActiveSkill] = useState<Skill>(allSkills[0]);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const categoryIcons: Record<SkillCategoryType, React.ReactNode> = {
    BACKEND: <Database size={16} />,
    FRONTEND: <Layout size={16} />,
    "AI / GENAI": <Bot size={16} />,
    "DEVOPS / QA": <ServerCog size={16} />,
  };

  const displayedSkills =
    selectedCategory === "ALL"
      ? allSkills
      : skillCategories.find((c) => c.label === selectedCategory)?.skills || [];

  return (
    <section
      id="stack"
      className="relative min-h-screen py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
      aria-label="Technology Stack and Constellation"
    >
      <SectionHeading
        index="02"
        title="TECHNOLOGY CONSTELLATION"
        subtitle="Data-driven overview of production frameworks, distributed architecture, and AI-enabled tooling."
      />

      {/* Category Selection Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8" role="tablist" aria-label="Skill categories">
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === "ALL"}
          onClick={() => setSelectedCategory("ALL")}
          className={`px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            selectedCategory === "ALL"
              ? "bg-[var(--accent)] text-[#05070D] font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
              : "border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[rgba(255,255,255,0.2)]"
          }`}
        >
          FULL STACK (ALL)
        </button>

        {skillCategories.map((cat) => {
          const isSelected = selectedCategory === cat.label;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat.label)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                isSelected
                  ? "bg-[var(--accent)] text-[#05070D] font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[rgba(255,255,255,0.2)]"
              }`}
            >
              {categoryIcons[cat.label]}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center Constellation Grid */}
        <div className="lg:col-span-8 border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8 rounded-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border)] mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider">
                CORE NODE: FULL STACK SPECTRUM
              </span>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {displayedSkills.length} ACTIVE MODULES
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {displayedSkills.map((skill) => {
              const isHovered = hoveredSkillId === skill.id;
              const isSelected = activeSkill.id === skill.id;
              const isDimmed = hoveredSkillId !== null && !isHovered && !isSelected;

              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => {
                    setHoveredSkillId(skill.id);
                    setActiveSkill(skill);
                  }}
                  onMouseLeave={() => setHoveredSkillId(null)}
                  onClick={() => setActiveSkill(skill)}
                  className={`transition-all duration-200 ${
                    isDimmed ? "opacity-35 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <TechBadge
                    name={skill.name}
                    category={skill.category}
                    highlight={skill.highlight || isSelected}
                    className={
                      isSelected
                        ? "ring-1 ring-[var(--accent)] bg-[rgba(0,240,255,0.18)] text-[var(--accent)]"
                        : undefined
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
            <span>[TIP: HOVER OR CLICK ANY COMPONENT TO INSPECT TELEMETRY]</span>
            <span className="hidden sm:inline">STATE: SYNCHRONIZED</span>
          </div>
        </div>

        {/* Right Telemetry Inspection Panel */}
        <div className="lg:col-span-4 border border-[var(--border)] bg-[var(--surface-elevated)] p-6 rounded-2xl space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <HUDLabel variant="accent" size="sm">
              TELEMETRY INSPECT
            </HUDLabel>
            <Info size={14} className="text-[var(--text-muted)]" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase">
              MODULE // {activeSkill.category}
            </span>
            <h3 className="text-2xl font-mono font-bold text-[var(--text-primary)]">
              {activeSkill.name}
            </h3>
          </div>

          <div className="p-3 rounded border border-[rgba(255,255,255,0.08)] bg-[rgba(5,7,13,0.5)] space-y-1">
            <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
              PRODUCTION LEVEL / USAGE
            </div>
            <div className="font-mono text-sm text-[var(--accent)] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              {activeSkill.level}
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              CAPABILITY & SYSTEM USAGE
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              {activeSkill.description}
            </p>
          </div>

          <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span>STATUS: NOMINAL</span>
            <span>SPEC: PRODUCTION V1</span>
          </div>
        </div>
      </div>
    </section>
  );
}
