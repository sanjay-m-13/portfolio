"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ThreeFallback } from "@/components/three/ThreeFallback";

const GameWorld = dynamic(
  () => import("@/components/game/GameWorld").then((mod) => mod.GameWorld),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#030712] flex items-center justify-center">
        <ThreeFallback isLoading={true} />
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-[#030712]">
      <GameWorld />
    </main>
  );
}
