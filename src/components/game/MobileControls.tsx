"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap } from "lucide-react";

interface MobileControlsProps {
  onMove: (dir: { x: number; z: number }) => void;
  onInteract: () => void;
  activeDistrictName?: string;
}

export function MobileControls({
  onMove,
  onInteract,
  activeDistrictName,
}: MobileControlsProps) {
  const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({});

  const handleTouchStart = (dir: { x: number; z: number }, key: string) => {
    setActiveKeys((prev) => ({ ...prev, [key]: true }));
    onMove(dir);
  };

  const handleTouchEnd = (key: string) => {
    setActiveKeys((prev) => ({ ...prev, [key]: false }));
    onMove({ x: 0, z: 0 });
  };

  return (
    <div className="md:hidden fixed inset-0 pointer-events-none z-40 select-none flex flex-col justify-between p-4">
      {/* Top status bar space */}
      <div />

      {/* Touch controls bottom bar */}
      <div className="flex items-end justify-between pointer-events-auto w-full pb-6 px-2">
        {/* D-Pad Buttons */}
        <div className="relative w-36 h-36 bg-[var(--surface)]/80 border border-[var(--border)] rounded-full p-2 grid grid-cols-3 grid-rows-3 gap-1 shadow-2xl backdrop-blur-md">
          {/* Top */}
          <button
            onTouchStart={() => handleTouchStart({ x: 0, z: -1 }, "up")}
            onTouchEnd={() => handleTouchEnd("up")}
            onMouseDown={() => handleTouchStart({ x: 0, z: -1 }, "up")}
            onMouseUp={() => handleTouchEnd("up")}
            className={`col-start-2 row-start-1 flex items-center justify-center rounded-t-lg bg-[var(--surface-elevated)] border border-[var(--border)] active:bg-cyan-500/30 text-cyan-400 ${
              activeKeys["up"] ? "bg-cyan-500/40 text-white" : ""
            }`}
          >
            <ArrowUp className="w-6 h-6" />
          </button>

          {/* Left */}
          <button
            onTouchStart={() => handleTouchStart({ x: -1, z: 0 }, "left")}
            onTouchEnd={() => handleTouchEnd("left")}
            onMouseDown={() => handleTouchStart({ x: -1, z: 0 }, "left")}
            onMouseUp={() => handleTouchEnd("left")}
            className={`col-start-1 row-start-2 flex items-center justify-center rounded-l-lg bg-[var(--surface-elevated)] border border-[var(--border)] active:bg-cyan-500/30 text-cyan-400 ${
              activeKeys["left"] ? "bg-cyan-500/40 text-white" : ""
            }`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Center Hub */}
          <div className="col-start-2 row-start-2 flex items-center justify-center bg-cyan-950/50 rounded-full border border-cyan-500/30">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* Right */}
          <button
            onTouchStart={() => handleTouchStart({ x: 1, z: 0 }, "right")}
            onTouchEnd={() => handleTouchEnd("right")}
            onMouseDown={() => handleTouchStart({ x: 1, z: 0 }, "right")}
            onMouseUp={() => handleTouchEnd("right")}
            className={`col-start-3 row-start-2 flex items-center justify-center rounded-r-lg bg-[var(--surface-elevated)] border border-[var(--border)] active:bg-cyan-500/30 text-cyan-400 ${
              activeKeys["right"] ? "bg-cyan-500/40 text-white" : ""
            }`}
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Down */}
          <button
            onTouchStart={() => handleTouchStart({ x: 0, z: 1 }, "down")}
            onTouchEnd={() => handleTouchEnd("down")}
            onMouseDown={() => handleTouchStart({ x: 0, z: 1 }, "down")}
            onMouseUp={() => handleTouchEnd("down")}
            className={`col-start-2 row-start-3 flex items-center justify-center rounded-b-lg bg-[var(--surface-elevated)] border border-[var(--border)] active:bg-cyan-500/30 text-cyan-400 ${
              activeKeys["down"] ? "bg-cyan-500/40 text-white" : ""
            }`}
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>

        {/* Action / Enter Zone Button */}
        <div className="flex flex-col items-center gap-2">
          {activeDistrictName && (
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 bg-black/80 px-2 py-1 border border-cyan-500/40 rounded animate-bounce">
              {activeDistrictName}
            </span>
          )}
          <button
            onClick={onInteract}
            className={`w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-cyan-300 text-white font-mono font-bold text-xs flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform ${
              activeDistrictName
                ? "ring-4 ring-cyan-400/50 animate-pulse"
                : "opacity-75"
            }`}
          >
            <Zap className="w-6 h-6 mb-1 text-yellow-300 fill-yellow-300" />
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}
