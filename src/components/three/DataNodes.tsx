"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface NodeData {
  radius: number;
  speed: number;
  offset: number;
  elevation: number;
  size: number;
  color: string;
}

export function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const isReducedMotion = useReducedMotion();

  const nodes: NodeData[] = useMemo(
    () => [
      { radius: 3.2, speed: 0.25, offset: 0, elevation: 0.5, size: 0.08, color: "#00F0FF" },
      { radius: 3.2, speed: 0.25, offset: Math.PI, elevation: -0.5, size: 0.06, color: "#38BDF8" },
      { radius: 4.4, speed: -0.18, offset: 1.2, elevation: 1.2, size: 0.07, color: "#00F0FF" },
      { radius: 4.4, speed: -0.18, offset: 3.8, elevation: -1.0, size: 0.05, color: "#93C5FD" },
      { radius: 5.6, speed: 0.12, offset: 2.1, elevation: 0.8, size: 0.08, color: "#00F0FF" },
      { radius: 5.6, speed: 0.12, offset: 5.2, elevation: -0.6, size: 0.06, color: "#60A5FA" },
    ],
    []
  );

  const meshesRef = useRef<(THREE.Mesh | null)[]>([]);
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (isReducedMotion) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;

    nodes.forEach((node, i) => {
      const mesh = meshesRef.current[i];
      if (mesh) {
        const angle = node.offset + t * node.speed;
        mesh.position.x = Math.cos(angle) * node.radius;
        mesh.position.z = Math.sin(angle) * node.radius;
        mesh.position.y = node.elevation + Math.sin(t * 1.5 + i) * 0.15;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshesRef.current[i] = el;
          }}
          position={[
            Math.cos(node.offset) * node.radius,
            node.elevation,
            Math.sin(node.offset) * node.radius,
          ]}
        >
          <octahedronGeometry args={[node.size, 0]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  );
}
