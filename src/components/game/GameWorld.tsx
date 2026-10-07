"use client";

import React, { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { DistrictConfig } from "@/data/districts";
import { CityMap } from "./CityMap";
import { Buildings } from "./Buildings";
import { PlayerController } from "./PlayerController";
import { CameraRig } from "./CameraRig";
import { RainParticles } from "./RainParticles";
import { GameHUD } from "./GameHUD";
import { MobileControls } from "./MobileControls";

if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    origWarn.apply(console, args);
  };
}

export function GameWorld() {
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 0.4, 0]);
  const [nearDistrict, setNearDistrict] = useState<DistrictConfig | null>(null);
  const [touchMoveDir, setTouchMoveDir] = useState<{ x: number; z: number }>({ x: 0, z: 0 });

  const handlePositionUpdate = useCallback((pos: [number, number, number]) => {
    setPlayerPosition(pos);
  }, []);

  const handleNearDistrictChange = useCallback((district: DistrictConfig | null) => {
    setNearDistrict(district);
  }, []);

  const handleTouchMove = useCallback((dir: { x: number; z: number }) => {
    setTouchMoveDir(dir);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#030712] overflow-hidden select-none">
      {/* 3D WebGL Game Canvas */}
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 35, 30], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        {/* Environment Lights */}
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[30, 50, 20]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={120}
          shadow-camera-left={-60}
          shadow-camera-right={60}
          shadow-camera-top={60}
          shadow-camera-bottom={-60}
        />
        <hemisphereLight intensity={0.3} color="#38bdf8" groundColor="#0f172a" />

        {/* 3D Scene Components */}
        <Suspense fallback={null}>
          <CityMap />
          <Buildings />
          <PlayerController
            onPositionUpdate={handlePositionUpdate}
            onNearDistrictChange={handleNearDistrictChange}
            externalMove={touchMoveDir}
          />
          <CameraRig playerPosition={playerPosition} />
          <RainParticles count={700} />
        </Suspense>
      </Canvas>

      {/* 2D HTML HUD & Mobile Touch Controls */}
      <GameHUD
        playerPosition={playerPosition}
        nearDistrict={nearDistrict}
        onInteract={() => {}}
      />

      <MobileControls
        onMove={handleTouchMove}
        onInteract={() => {}}
        activeDistrictName={nearDistrict?.name}
      />
    </div>
  );
}
