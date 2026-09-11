"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";
import { ThreeFallback } from "@/components/three/ThreeFallback";
import { worldState } from "@/lib/animations/worldState";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

// Lazy-load Three.js canvas dynamically with SSR disabled and lightweight fallback
const ThreeScene = dynamic(() => import("@/components/three/ThreeScene"), {
  ssr: false,
  loading: () => <ThreeFallback isLoading={true} />,
});

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    const sections = [
      { id: "hero", checkpoint: 0 },
      { id: "about", checkpoint: 1 },
      { id: "stack", checkpoint: 2 },
      { id: "experience", checkpoint: 3 },
      { id: "projects", checkpoint: 4 },
      { id: "contact", checkpoint: 5 },
    ];

    const ctx = gsap.context(() => {
      // Global scroll progress listener tied to ScrollTrigger
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Identify which section is currently centered
          const scrollY = window.scrollY + window.innerHeight * 0.35;
          let currentSectionId = "hero";

          for (const s of sections) {
            const el = document.getElementById(s.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollY >= top && scrollY < top + height) {
                currentSectionId = s.id;
                break;
              }
            }
          }

          worldState.setProgress(self.progress, currentSectionId);
        },
      });

      // Section-specific triggers to ensure precise checkpoint alignment
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => worldState.setProgress(sec.checkpoint / 5, sec.id),
            onEnterBack: () => worldState.setProgress(sec.checkpoint / 5, sec.id),
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative w-full min-h-screen">
      {/* Fixed Persistent 3D WebGL Background */}
      <ThreeScene />

      {/* Fixed HUD Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Philosophy />
        <Contact />
      </main>

      {/* Global Engineering Telemetry Footer */}
      <Footer />
    </div>
  );
}
