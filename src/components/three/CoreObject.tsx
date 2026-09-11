"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { worldState } from "@/lib/animations/worldState";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CoreObject() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const isReducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    const interpolated = worldState.interpolateCamera();
    const speed = isReducedMotion ? 0 : interpolated.rotationSpeed;

    if (groupRef.current) {
      // Smooth scale transition
      const targetScale = interpolated.coreScale;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.05
      );
    }

    if (!isReducedMotion) {
      if (innerRef.current) {
        innerRef.current.rotation.x += delta * speed * 0.8;
        innerRef.current.rotation.y += delta * speed * 1.2;
      }
      if (outerWireRef.current) {
        outerWireRef.current.rotation.x -= delta * speed * 0.5;
        outerWireRef.current.rotation.y += delta * speed * 0.7;
        outerWireRef.current.rotation.z += delta * speed * 0.3;
      }
      if (sphereRef.current) {
        sphereRef.current.rotation.y -= delta * speed * 0.4;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Dense geometric core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#061224"
          emissive="#00F0FF"
          emissiveIntensity={0.85}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer wireframe icosahedron */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Faint surrounding wireframe sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.3, 16, 12]} />
        <meshBasicMaterial
          color="#426792"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Point light localized at the core */}
      <pointLight
        color="#00F0FF"
        intensity={2.8}
        distance={12}
        decay={2}
      />
    </group>
  );
}
