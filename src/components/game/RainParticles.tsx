"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RainParticles({ count = 800 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate initial random rain positions
  const rainPositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 120,
        y: Math.random() * 40 + 5,
        z: (Math.random() - 0.5) * 120,
        speed: Math.random() * 0.8 + 0.6,
      });
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    rainPositions.forEach((p, i) => {
      p.y -= p.speed * delta * 60;
      if (p.y < 0) {
        p.y = 40 + Math.random() * 10;
        p.x = (Math.random() - 0.5) * 120;
        p.z = (Math.random() - 0.5) * 120;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(0.04, 0.6, 0.04);
      dummy.rotation.x = 0.1;
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
    </instancedMesh>
  );
}
