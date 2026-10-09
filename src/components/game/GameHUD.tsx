"use client";

import { useState, useEffect } from "react";
import { DistrictConfig } from "@/data/districts";
import { Minimap } from "./Minimap";
import { ZonePanel } from "./ZonePanel";
import { Star, Zap, Navigation, Shield } from "lucide-react";

interface GameHUDProps {
  playerPosition: [number, number, number];
  nearDistrict: DistrictConfig | null;
  onInteract: () => void;
}

export function GameHUD({
  playerPosition,
  nearDistrict,
  onInteract,
}: GameHUDProps) {
  const [activeModalDistrict, setActiveModalDistrict] =
    useState<DistrictConfig | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key.toLowerCase() === "e" || e.key === " ") && nearDistrict) {
        setActiveModalDistrict(nearDistrict);
      }
      if (e.key === "Escape" && activeModalDistrict) {
        setActiveModalDistrict(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nearDistrict, activeModalDistrict]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-4 sm:p-6">
      {/* Top Header Bar Overlay */}
      <div className="flex items-start justify-between w-full pointer-events-auto">
        {/* Top-Left: Minimap */}
        <div className="flex items-center gap-4">
          <Minimap
            playerPosition={playerPosition}
            activeDistrictId={nearDistrict?.id}
          />
          <div className="hidden sm:flex flex-col gap-1 text-[11px] font-mono text-cyan-400 bg-slate-950/80 p-2.5 rounded-lg border border-cyan-500/30 backdrop-blur-md">
            <div className="flex items-center gap-1.5 font-bold">
              <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              SANJAY_OS // v3.0 GTA EDITION
            </div>
            <div className="text-slate-400">
              COORDS: X:{Math.round(playerPosition[0])} Z:
              {Math.round(playerPosition[2])}
            </div>
          </div>
        </div>

        {/* Top-Right: GTA Player Stats & Wanted Stars */}
        <div className="bg-[var(--surface-elevated)]/90 border-2 border-cyan-500/40 p-3 sm:p-4 rounded-xl shadow-2xl backdrop-blur-md flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-extrabold font-mono text-white tracking-widest uppercase">
              SANJAY M
            </span>
          </div>

          <div className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
            FULL-STACK ENGINEER
          </div>

          {/* Wanted Level Stars (3 Years Experience) */}
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-mono text-slate-400 mr-1">
              EXP LEVEL:
            </span>
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse"
              />
            ))}
            {[4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 text-slate-600" />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Center: Proximity Action Prompt */}
      {nearDistrict && !activeModalDistrict && (
        <div className="self-center pointer-events-auto mb-16 md:mb-6 animate-bounce">
          <button
            onClick={() => {
              setActiveModalDistrict(nearDistrict);
              onInteract();
            }}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 border-2 border-cyan-300 rounded-full text-white font-mono font-bold text-sm sm:text-base shadow-2xl hover:scale-105 active:scale-95 transition-all ring-4 ring-cyan-500/30"
          >
            <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            <span>PRESS [ E ] OR TAP TO ENTER {nearDistrict.name}</span>
          </button>
        </div>
      )}

      {/* Full-Screen Zone Modal */}
      {activeModalDistrict && (
        <div className="pointer-events-auto">
          <ZonePanel
            district={activeModalDistrict}
            onClose={() => setActiveModalDistrict(null)}
          />
        </div>
      )}
    </div>
  );
}
