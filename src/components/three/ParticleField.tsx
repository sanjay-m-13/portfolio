"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = useIsMobile();
  const isReducedMotion = useReducedMotion();

  const count = isMobile ? 750 : 2500;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const color1 = new THREE.Color("#00F0FF");
    const color2 = new THREE.Color("#4A6B8E");
    const color3 = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 3 + 2);
      const r3 = pseudoRandom(i * 3 + 3);

      // Distribute particles in a hollow spherical cylinder
      const radius = 3.5 + r1 * 18;
      const theta = r2 * Math.PI * 2;
      const phi = (r3 - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);

      // Color variation
      const rand = pseudoRandom(i * 7 + 5);
      const c = rand > 0.75 ? color1 : rand > 0.4 ? color2 : color3;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return [pos, cols];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current && !isReducedMotion) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.05}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
