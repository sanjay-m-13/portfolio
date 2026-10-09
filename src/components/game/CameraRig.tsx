"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  playerPosition: [number, number, number];
}

export function CameraRig({ playerPosition }: CameraRigProps) {
  const targetPos = useRef(new THREE.Vector3(0, 35, 30));

  useFrame(({ camera }) => {
    // Camera is offset at [x, y+35, z+30] for classic 3D GTA top-down isometric view
    const [px, py, pz] = playerPosition;
    targetPos.current.set(px, py + 35, pz + 30);

    // Smooth lerp camera movement
    camera.position.lerp(targetPos.current, 0.08);
    camera.lookAt(px, py, pz - 2);
  });

  return null;
}
