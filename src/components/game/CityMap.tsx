"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { DISTRICTS } from "@/data/districts";

export function CityMap() {
  // Road grid lines
  const gridLines = useMemo(() => {
    const lines: Array<[number, number, number, number]> = [];
    // Main cross avenues
    lines.push([-60, 0, 60, 0]); // Main E-W Avenue
    lines.push([0, -60, 0, 60]); // Main N-S Boulevard
    lines.push([-60, -28, 60, -28]); // North District Street
    lines.push([-60, 28, 60, 28]); // South District Street
    lines.push([-28, -60, -28, 60]); // West District Street
    lines.push([28, -60, 28, 60]); // East District Street
    return lines;
  }, []);

  return (
    <group>
      {/* Main Ground Asphalt Mesh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Cyberpunk Ground Grid Pattern */}
      <gridHelper
        args={[140, 70, "#0284c7", "#1e293b"]}
        position={[0, 0.01, 0]}
      />

      {/* Roads & Asphalt Strips */}
      {gridLines.map(([x1, z1, x2, z2], idx) => {
        const isHorizontal = z1 === z2;
        const length = isHorizontal ? Math.abs(x2 - x1) : Math.abs(z2 - z1);
        const posX = (x1 + x2) / 2;
        const posZ = (z1 + z2) / 2;
        const width = 8; // 8 units wide road

        return (
          <group key={idx}>
            {/* Asphalt Road Bed */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[posX, 0.02, posZ]}
              receiveShadow
            >
              <planeGeometry args={isHorizontal ? [length, width] : [width, length]} />
              <meshStandardMaterial color="#111827" roughness={0.9} />
            </mesh>

            {/* Glowing Center Line */}
            <mesh
              rotation={[-Math.PI / 2, 0, isHorizontal ? 0 : Math.PI / 2]}
              position={[posX, 0.03, posZ]}
            >
              <planeGeometry args={[length, 0.3]} />
              <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}

      {/* District Base Pads & Proximity Rings */}
      {DISTRICTS.map((district) => (
        <group key={district.id} position={[district.position[0], 0.05, district.position[2]]}>
          {/* Concrete Base Pad */}
          <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
            <boxGeometry args={[district.size[0] + 3, 0.2, district.size[2] + 3]} />
            <meshStandardMaterial color="#1f2937" roughness={0.6} metalness={0.4} />
          </mesh>

          {/* District Outer Neon Border Ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.22, 0]}>
            <ringGeometry args={[district.triggerRadius - 0.4, district.triggerRadius, 32]} />
            <meshBasicMaterial color={district.color} transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>

          {/* Inner Pulsing Zone Circle */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.23, 0]}>
            <circleGeometry args={[district.triggerRadius - 0.5, 32]} />
            <meshBasicMaterial color={district.color} transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>

          {/* 4 Corner Light Beacons */}
          {[-1, 1].map((sx) =>
            [-1, 1].map((sz) => (
              <mesh
                key={`${sx}-${sz}`}
                position={[
                  (district.size[0] / 2 + 1) * sx,
                  1.5,
                  (district.size[2] / 2 + 1) * sz,
                ]}
              >
                <cylinderGeometry args={[0.15, 0.15, 3, 8]} />
                <meshStandardMaterial color="#374151" metalness={0.8} />
                <mesh position={[0, 1.5, 0]}>
                  <sphereGeometry args={[0.3, 16, 16]} />
                  <meshBasicMaterial color={district.color} />
                </mesh>
              </mesh>
            ))
          )}
        </group>
      ))}
    </group>
  );
}
