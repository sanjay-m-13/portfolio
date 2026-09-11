"use client";

import React, { useState } from "react";
import { socialsData } from "@/data/socials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HUDLabel } from "@/components/ui/HUDLabel";
import { Mail, Check, Copy, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const emailItem = socialsData.find((s) => s.kind === "email");
  const emailAddress = emailItem?.url.replace("mailto:", "") || "sanjaym.dev@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSocialIcon = (kind: string) => {
    switch (kind) {
      case "email":
        return <Mail size={15} />;
      case "linkedin":
        return <LinkedInIcon size={15} />;
      case "github":
        return <GitHubIcon size={15} />;
      default:
        return <Send size={15} />;
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-[85vh] py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
      aria-label="Contact and Communication Channels"
    >
      <SectionHeading
        index="06"
        title="LET'S BUILD SOMETHING."
        subtitle="Have a product, engineering problem, or interesting idea? Let's connect."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main contact card */}
        <div className="lg:col-span-8 border border-[var(--border)] bg-[var(--surface-elevated)] p-8 md:p-12 rounded-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <HUDLabel variant="accent" size="sm">
                CONNECTION ESTABLISHED
              </HUDLabel>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {"// TRANSMISSION LINE OPEN"}
              </span>
            </div>
            <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AVAILABLE FOR NEW OPPORTUNITIES
            </span>
          </div>

          <div className="space-y-4 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--text-primary)] leading-tight">
              LOOKING FOR A FULL-STACK ENGINEER WHO CARES ABOUT PRODUCTION RELIABILITY?
            </h3>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
              Whether you need to scale Java/Spring Boot microservices, build clean reactive React frontends, 
              or implement autonomous AI testing pipelines, I am eager to contribute to high-impact technical initiatives.
            </p>
          </div>

          {/* Action triggers */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              href={`mailto:${emailAddress}`}
              external
              icon={<Send size={15} />}
            >
              EMAIL ME
            </Button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase px-5 py-3.5 rounded border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>EMAIL COPIED!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>COPY EMAIL ADDRESS</span>
                </>
              )}
            </button>
          </div>

          {/* Direct channels */}
          <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-[var(--text-muted)] mr-2">
              VERIFIED CHANNELS:
            </span>
            {socialsData.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--border)] bg-[rgba(255,255,255,0.02)] font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                aria-label={social.label}
              >
                {getSocialIcon(social.kind)}
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Telemetry sidebar */}
        <div className="lg:col-span-4 border border-[var(--border)] bg-[var(--surface-elevated)] p-6 rounded-2xl space-y-6">
          <div className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase pb-2 border-b border-[var(--border)]">
            {"// TELEMETRY STATUS"}
          </div>

          <div className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
            <div className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-[var(--text-muted)]">CORE STATUS:</span>
              <span className="text-[var(--accent)] font-semibold">STABILIZED</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-[var(--text-muted)]">EXPERIENCE:</span>
              <span className="text-[var(--text-primary)]">~3 YEARS PRODUCTION</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-[var(--text-muted)]">PRIMARY STACK:</span>
              <span className="text-[var(--text-primary)]">JAVA / REACT / AI</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-[var(--text-muted)]">RESPONSE TIME:</span>
              <span className="text-emerald-400">&lt; 24 HOURS</span>
            </div>
          </div>

          <div className="p-3.5 rounded bg-[rgba(5,7,13,0.6)] border border-[rgba(0,240,255,0.2)] font-mono text-[11px] text-[var(--accent)] leading-relaxed">
            &gt; SYSTEM STANDBY READY. ALL TRANSMISSIONS RECEIVED DIRECTLY TO INBOX.
          </div>
        </div>
      </div>
    </section>
  );
}
