"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { worldState } from "@/lib/animations/worldState";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CameraRig() {
  const isReducedMotion = useReducedMotion();

  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.current = { x, y };
      worldState.setMouse(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const cam = state.camera;
    const interpolated = worldState.interpolateCamera();

    // Damped mouse pointer interpolation
    if (!isReducedMotion) {
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;
    } else {
      mouseCurrent.current = { x: 0, y: 0 };
    }

    const mouseInfluenceX = mouseCurrent.current.x * 0.45;
    const mouseInfluenceY = mouseCurrent.current.y * 0.35;

    // Desired camera position
    const targetCamX = interpolated.position[0] + mouseInfluenceX;
    const targetCamY = interpolated.position[1] + mouseInfluenceY;
    const targetCamZ = interpolated.position[2];

    // Smooth camera damping
    cam.position.x += (targetCamX - cam.position.x) * 0.08;
    cam.position.y += (targetCamY - cam.position.y) * 0.08;
    cam.position.z += (targetCamZ - cam.position.z) * 0.08;

    // Desired lookAt target
    const targetLookX = interpolated.target[0] + mouseInfluenceX * 0.2;
    const targetLookY = interpolated.target[1] + mouseInfluenceY * 0.2;
    const targetLookZ = interpolated.target[2];

    lookAtTarget.current.x += (targetLookX - lookAtTarget.current.x) * 0.08;
    lookAtTarget.current.y += (targetLookY - lookAtTarget.current.y) * 0.08;
    lookAtTarget.current.z += (targetLookZ - lookAtTarget.current.z) * 0.08;

    cam.lookAt(lookAtTarget.current);
  });

  return null;
}
