"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function OrbitalRings() {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const isReducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (isReducedMotion) return;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      {/* Primary Inner Orbital Ring */}
      <group ref={ring1Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[3.2, 0.015, 12, 96]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>

      {/* Secondary Tilted Orbital Ring */}
      <group ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 5, Math.PI / 3]}>
        <mesh>
          <torusGeometry args={[4.4, 0.012, 12, 96]} />
          <meshBasicMaterial
            color="#38BDF8"
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Tertiary Outer Orbital Ring */}
      <group ref={ring3Ref} rotation={[Math.PI / 2.5, -Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[5.6, 0.01, 12, 96]} />
          <meshBasicMaterial
            color="#1E3A5F"
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}
