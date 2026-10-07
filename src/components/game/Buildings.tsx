"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { DISTRICTS, DistrictConfig } from "@/data/districts";

function BuildingStructure({ district }: { district: DistrictConfig }) {
  const [w, h, d] = district.size;
  const [posX, posY, posZ] = district.position;

  return (
    <group position={[posX, h / 2 + 0.2, posZ]}>
      {/* Main Building Block Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Outer Neon Edge Lines / Wireframe Accent */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(w + 0.05, h + 0.05, d + 0.05)]} />
        <lineBasicMaterial color={district.color} linewidth={2} />
      </lineSegments>

      {/* Building Windows / Grid Glow Panels */}
      {/* Front Face Windows */}
      <mesh position={[0, 0, d / 2 + 0.02]}>
        <planeGeometry args={[w * 0.8, h * 0.7]} />
        <meshBasicMaterial color={district.color} transparent opacity={0.25} />
      </mesh>

      {/* Back Face Windows */}
      <mesh position={[0, 0, -d / 2 - 0.02]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[w * 0.8, h * 0.7]} />
        <meshBasicMaterial color={district.color} transparent opacity={0.25} />
      </mesh>

      {/* Roof Structure / Heliport / Antenna */}
      <mesh position={[0, h / 2 + 0.5, 0]} castShadow>
        <boxGeometry args={[w * 0.6, 1, d * 0.6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>

      {/* Roof Antenna Spire */}
      <mesh position={[0, h / 2 + 2.5, 0]}>
        <cylinderGeometry args={[0.08, 0.2, 3, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color={district.secondaryColor} />
        </mesh>
      </mesh>

      {/* Point Light emitting from building core */}
      <pointLight color={district.color} intensity={3} distance={18} decay={2} position={[0, 1, 0]} />

      {/* Floating 3D Neon District Header Title */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <group position={[0, h / 2 + 3.5, 0]}>
          <Text
            font="/fonts/Inter-Bold.woff" // fallback to standard system rendering if font not present
            fontSize={1.4}
            color={district.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.08}
            outlineColor="#000000"
          >
            {district.name}
          </Text>

          <Text
            fontSize={0.6}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            position={[0, -1.2, 0]}
            outlineWidth={0.04}
            outlineColor="#000000"
          >
            {district.subtitle}
          </Text>
        </group>
      </Float>
    </group>
  );
}

export function Buildings() {
  return (
    <group>
      {DISTRICTS.map((district) => (
        <BuildingStructure key={district.id} district={district} />
      ))}
    </group>
  );
}
