import React from "react";
import { socialsData } from "@/data/socials";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[rgba(5,7,13,0.92)] px-4 md:px-8 py-8 md:py-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Status and Architecture signature */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-[var(--accent)] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
            <span>SYSTEM ONLINE // ALL CHANNELS NOMINAL</span>
          </div>
          <p className="font-mono text-xs text-[var(--text-secondary)]">
            ENGINEERED WITH NEXT.JS, THREE.JS, GSAP, & TAILWIND CSS
          </p>
        </div>

        {/* Center: Monogram & Copyright */}
        <div className="text-center font-mono text-xs text-[var(--text-muted)]">
          © {currentYear} SANJAY M. ALL RIGHTS RESERVED.
        </div>

        {/* Right: Social quick links */}
        <div className="flex items-center gap-4">
          {socialsData.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors uppercase tracking-wider"
              aria-label={social.label}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
