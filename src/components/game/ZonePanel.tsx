"use client";

import React from "react";
import { DistrictConfig } from "@/data/districts";
import { X, ExternalLink, Mail, Shield, Server, Layout, Cpu, FolderGit2, Send, Star } from "lucide-react";

interface ZonePanelProps {
  district: DistrictConfig;
  onClose: () => void;
}

export function ZonePanel({ district, onClose }: ZonePanelProps) {
  const { content } = district;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--surface-elevated)] border-2 border-cyan-500/50 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* GTA Mission Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: district.color }}
            />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 block uppercase">
                {district.codeName}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wide">
                {district.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          <p className="text-sm font-mono text-cyan-300/90 border-l-2 border-cyan-400 pl-3 py-1 bg-cyan-950/20">
            {district.description}
          </p>

          {/* Profile / Command Center */}
          {content.type === "profile" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.data.profile.stats.map((stat: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg"
                  >
                    <div className="text-2xl font-extrabold text-cyan-400 font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-300 uppercase mt-1">
                      {stat.label}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{stat.detail}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
                <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase mb-2">
                  // ENGINEERING SUMMARY
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {content.data.profile.summary}
                </p>
              </div>
            </div>
          )}

          {/* Skills / Sector Details */}
          {content.type === "skills" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase mb-3">
                  // CORE CAPABILITIES & HIGHLIGHTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.data.highlights?.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-[var(--surface)] border border-cyan-500/20 rounded-lg flex items-start gap-2"
                    >
                      <Star className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {content.data.category && (
                <div>
                  <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase mb-3">
                    // TECH STACK MATRIX
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {content.data.category.skills.map((skill: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg"
                      >
                        <div className="text-sm font-mono font-bold text-white">
                          {skill.name}
                        </div>
                        <div className="text-[10px] text-cyan-400 mt-1 uppercase">
                          {skill.level}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{skill.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Projects / Mission Archive */}
          {content.type === "projects" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.data.map((project: any) => (
                  <div
                    key={project.id}
                    className="p-5 bg-[var(--surface)] border border-[var(--border)] hover:border-amber-500/50 rounded-lg transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                        {project.category}
                      </span>
                      <h4 className="text-lg font-bold font-mono text-white mt-1">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-3">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tech.map((t: string) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-[10px] font-mono bg-amber-950/40 text-amber-300 border border-amber-500/30 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center justify-center gap-2 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded text-xs font-mono text-amber-300 font-bold transition-colors"
                      >
                        VIEW MISSION <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Terminal */}
          {content.type === "contact" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {content.data.socials.map((social: any) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-400/50 rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-mono font-bold text-white group-hover:text-cyan-400">
                        {social.platform}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{social.handle}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  </a>
                ))}
              </div>

              <div className="p-5 bg-[var(--surface)] border border-cyan-500/30 rounded-lg text-center">
                <h4 className="text-sm font-mono font-bold text-cyan-400 uppercase mb-1">
                  DIRECT EMAIL CONNECTION
                </h4>
                <a
                  href={`mailto:${content.data.email}`}
                  className="text-lg sm:text-xl font-mono text-white hover:text-cyan-300 underline font-bold"
                >
                  {content.data.email}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3 bg-slate-950 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>PRESS ESC OR CLICK CLOSE TO RETURN TO GAME WORLD</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold rounded transition-colors"
          >
            RETURN TO CITY
          </button>
        </div>
      </div>
    </div>
  );
}
