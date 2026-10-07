"use client";

import React, { useEffect, useRef } from "react";
import { DISTRICTS } from "@/data/districts";

interface MinimapProps {
  playerPosition: [number, number, number];
  activeDistrictId?: string;
}

export function Minimap({ playerPosition, activeDistrictId }: MinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const center = width / 2;
    const scale = width / 140; // 140 units map space

    // Clear background
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    const step = 20 * scale;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw District Blips
    DISTRICTS.forEach((district) => {
      const dx = center + district.position[0] * scale;
      const dy = center + district.position[2] * scale;
      const isSelected = activeDistrictId === district.id;

      // Outer district halo
      ctx.beginPath();
      ctx.arc(dx, dy, isSelected ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = district.color;
      ctx.globalAlpha = isSelected ? 0.8 : 0.4;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Center blip dot
      ctx.beginPath();
      ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    });

    // Draw Player Blip
    const px = center + playerPosition[0] * scale;
    const py = center + playerPosition[2] * scale;

    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Outer Radar Pulse Ring
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [playerPosition, activeDistrictId]);

  return (
    <div className="relative w-36 h-36 rounded-full border-2 border-cyan-500/50 bg-[var(--surface)] shadow-2xl overflow-hidden backdrop-blur-md">
      <canvas ref={canvasRef} width={144} height={144} className="w-full h-full rounded-full" />
      {/* Radar Overlay Crosshair */}
      <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 rounded-full flex items-center justify-center">
        <div className="w-full h-[1px] bg-cyan-500/20" />
        <div className="h-full w-[1px] bg-cyan-500/20 absolute" />
      </div>
      <div className="absolute top-1 left-2 text-[9px] font-mono text-cyan-400 font-bold tracking-tighter">
        GPS // CITY MAP
      </div>
    </div>
  );
}
