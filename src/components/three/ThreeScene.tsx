"use client";

import React, { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { CoreObject } from "./CoreObject";
import { OrbitalRings } from "./OrbitalRings";
import { ParticleField } from "./ParticleField";
import { DataNodes } from "./DataNodes";
import { ThreeFallback } from "./ThreeFallback";
import { useIsMobile } from "@/hooks/useIsMobile";

function emptySubscribe() {
  return () => {};
}

function getClientMounted() {
  return true;
}

function getServerMounted() {
  return false;
}

function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function ThreeScene() {
  const mounted = useSyncExternalStore(emptySubscribe, getClientMounted, getServerMounted);
  const isMobile = useIsMobile();
  const webglSupported = mounted ? checkWebGL() : true;

  if (!mounted) {
    return <ThreeFallback isLoading={true} />;
  }

  if (!webglSupported) {
    return <ThreeFallback isLoading={false} />;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <Suspense fallback={<ThreeFallback isLoading={true} />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          {/* Subtle deep space atmospheric fog */}
          <fog attach="fog" args={["#05070D", 5, 22]} />

          {/* Ambient space illumination */}
          <ambientLight intensity={0.65} />

          {/* Camera Controller & Checkpoint timeline */}
          <CameraRig />

          {/* Procedural 3D World Components */}
          <CoreObject />
          <OrbitalRings />
          <DataNodes />
          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  );
}
