"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { worldState, WorldSnapshot } from "@/lib/animations/worldState";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "ABOUT", href: "#about", sectionId: "about" },
  { label: "STACK", href: "#stack", sectionId: "stack" },
  { label: "EXPERIENCE", href: "#experience", sectionId: "experience" },
  { label: "PROJECTS", href: "#projects", sectionId: "projects" },
  { label: "PHILOSOPHY", href: "#philosophy", sectionId: "philosophy" },
];

export function Navigation() {
  const { scrollTo } = useSmoothScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    return worldState.subscribe((snapshot: WorldSnapshot) => {
      setActiveSection(snapshot.activeSection);
    });
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3.5 liquid-glass-subtle border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Monogram / HUD Logo */}
        <Link
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Back to top"
        >
          <div className="w-7 h-7 rounded border border-[var(--accent)] bg-[rgba(0,240,255,0.08)] flex items-center justify-center font-mono font-bold text-xs text-[var(--accent)] group-hover:shadow-[0_0_10px_var(--accent)] transition-all">
            SM
          </div>
          <span className="font-mono text-xs text-[var(--text-primary)] font-semibold tracking-wider flex items-center gap-2">
            SANJAY M
            <span className="text-[10px] text-[var(--accent)] font-mono opacity-80">
              {"// SYS.01"}
            </span>
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1 rounded-full liquid-glass border border-white/10"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-mono text-xs tracking-wider px-3 py-1.5 rounded transition-all duration-200 ${
                  isActive
                    ? "text-[var(--accent)] bg-[rgba(0,240,255,0.1)] font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Progress Indicator & Contact CTA */}
        <div className="hidden sm:flex items-center gap-5">
          <ProgressIndicator />
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="font-mono text-xs uppercase px-3.5 py-1.5 rounded border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.06)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#05070D] hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all duration-200"
          >
            CONTACT
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-3">
          <ProgressIndicator />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] focus-visible:outline-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile HUD dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-1 bg-[var(--surface-elevated)] p-4 rounded-lg border">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-mono text-xs tracking-wider py-2 px-3 rounded text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[rgba(0,240,255,0.08)] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="mt-2 font-mono text-xs uppercase text-center py-2.5 rounded bg-[var(--accent)] text-[#05070D] font-semibold"
          >
            INITIATE CONTACT
          </a>
        </div>
      )}
    </header>
  );
}
