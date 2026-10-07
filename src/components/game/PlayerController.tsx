"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DISTRICTS, DistrictConfig } from "@/data/districts";

interface PlayerControllerProps {
  onPositionUpdate?: (pos: [number, number, number]) => void;
  onNearDistrictChange?: (district: DistrictConfig | null) => void;
  externalMove?: { x: number; z: number };
}

export function PlayerController({
  onPositionUpdate,
  onNearDistrictChange,
  externalMove,
}: PlayerControllerProps) {
  const playerGroupRef = useRef<THREE.Group>(null!);

  // Physics state
  const pos = useRef(new THREE.Vector3(0, 0.4, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const rotation = useRef(0);

  // Throttling refs to prevent infinite 60fps React re-renders in parent GameWorld
  const lastDistrictIdRef = useRef<string | null>(null);
  const lastReportedPosRef = useRef<[number, number, number]>([0, 0.4, 0]);

  // Keyboard input state
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!playerGroupRef.current) return;

    // Movement calculation
    let inputX = 0;
    let inputZ = 0;

    if (keys.current["w"] || keys.current["arrowup"]) inputZ -= 1;
    if (keys.current["s"] || keys.current["arrowdown"]) inputZ += 1;
    if (keys.current["a"] || keys.current["arrowleft"]) inputX -= 1;
    if (keys.current["d"] || keys.current["arrowright"]) inputX += 1;

    // Merge external touch controls if present
    if (externalMove && (externalMove.x !== 0 || externalMove.z !== 0)) {
      inputX = externalMove.x;
      inputZ = externalMove.z;
    }

    const moveVector = new THREE.Vector3(inputX, 0, inputZ);
    if (moveVector.length() > 0) {
      moveVector.normalize();
      const targetRotation = Math.atan2(moveVector.x, moveVector.z);
      // Smoothly interpolate angle
      let diff = targetRotation - rotation.current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      rotation.current += diff * 0.15;

      const speed = 18; // units per second
      velocity.current.x = Math.sin(rotation.current) * speed * delta;
      velocity.current.z = Math.cos(rotation.current) * speed * delta;
    } else {
      // Friction / slowdown
      velocity.current.multiplyScalar(0.85);
    }

    // Apply movement
    pos.current.x += velocity.current.x;
    pos.current.z += velocity.current.z;

    // Boundary constraints (city limits)
    pos.current.x = Math.max(-65, Math.min(65, pos.current.x));
    pos.current.z = Math.max(-65, Math.min(65, pos.current.z));

    // Simple AABB Building Collisions
    DISTRICTS.forEach((district) => {
      const [bx, , bz] = district.position;
      const [halfW, , halfD] = [district.size[0] / 2 + 1, 0, district.size[2] / 2 + 1];

      if (
        pos.current.x > bx - halfW &&
        pos.current.x < bx + halfW &&
        pos.current.z > bz - halfD &&
        pos.current.z < bz + halfD
      ) {
        // Push back
        const dx = pos.current.x - bx;
        const dz = pos.current.z - bz;
        if (Math.abs(dx) > Math.abs(dz)) {
          pos.current.x = bx + Math.sign(dx) * halfW;
        } else {
          pos.current.z = bz + Math.sign(dz) * halfD;
        }
      }
    });

    // Update 3D mesh transforms
    playerGroupRef.current.position.copy(pos.current);
    playerGroupRef.current.rotation.y = rotation.current;

    // Notify parent of 3D position only if moved noticeably
    const distMoved = Math.hypot(
      pos.current.x - lastReportedPosRef.current[0],
      pos.current.z - lastReportedPosRef.current[2]
    );
    if (onPositionUpdate && distMoved > 0.05) {
      lastReportedPosRef.current = [pos.current.x, pos.current.y, pos.current.z];
      onPositionUpdate(lastReportedPosRef.current);
    }

    // Check proximity to district triggers
    let nearest: DistrictConfig | null = null;
    let minDistance = Infinity;

    DISTRICTS.forEach((d) => {
      const dist = pos.current.distanceTo(new THREE.Vector3(d.position[0], pos.current.y, d.position[2]));
      if (dist < d.triggerRadius) {
        if (dist < minDistance) {
          minDistance = dist;
          nearest = d;
        }
      }
    });

    const nearestId = nearest ? (nearest as DistrictConfig).id : null;
    if (onNearDistrictChange && nearestId !== lastDistrictIdRef.current) {
      lastDistrictIdRef.current = nearestId;
      onNearDistrictChange(nearest);
    }
  });

  return (
    <group ref={playerGroupRef} position={[0, 0.4, 0]}>
      {/* GTA Cyberpunk Vehicle Mesh */}
      {/* Car Main Body */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[1.6, 0.6, 3.2]} />
        <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Cabin Glass Dome */}
      <mesh position={[0, 0.8, -0.2]}>
        <boxGeometry args={[1.3, 0.5, 1.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={1.0} />
      </mesh>

      {/* Front Headlights (Glowing Cyan Spotlights) */}
      <mesh position={[-0.6, 0.4, 1.6]}>
        <boxGeometry args={[0.3, 0.15, 0.1]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[0.6, 0.4, 1.6]}>
        <boxGeometry args={[0.3, 0.15, 0.1]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Headlight Beacons */}
      <spotLight
        position={[0, 0.5, 1.6]}
        target-position={[0, 0, 10]}
        color="#38bdf8"
        intensity={8}
        angle={0.6}
        penumbra={0.5}
        distance={25}
      />

      {/* Rear Taillights (Glowing Red) */}
      <mesh position={[-0.6, 0.45, -1.6]}>
        <boxGeometry args={[0.35, 0.12, 0.1]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0.6, 0.45, -1.6]}>
        <boxGeometry args={[0.35, 0.12, 0.1]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Wheels */}
      {[-0.85, 0.85].map((wx) =>
        [-0.9, 0.9].map((wz) => (
          <mesh key={`${wx}-${wz}`} position={[wx, 0.2, wz]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
            <meshStandardMaterial color="#111827" roughness={0.9} />
          </mesh>
        ))
      )}

      {/* Underglow Neon Light */}
      <pointLight color="#06b6d4" intensity={4} distance={6} position={[0, -0.2, 0]} />
    </group>
  );
}
