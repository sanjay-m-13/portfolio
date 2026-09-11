"use client";

import { CHECKPOINTS, CameraCheckpoint } from "./cameraTimeline";

export interface WorldSnapshot {
  progress: number; // 0.0 to 1.0 overall page scroll
  currentCheckpoint: number; // 0 to 5
  nextCheckpoint: number; // 0 to 5
  checkpointProgress: number; // 0.0 to 1.0 between current and next
  activeSection: string;
  mouse: { x: number; y: number };
}

type Listener = (state: WorldSnapshot) => void;

class WorldStateManager {
  private state: WorldSnapshot = {
    progress: 0,
    currentCheckpoint: 0,
    nextCheckpoint: 1,
    checkpointProgress: 0,
    activeSection: "hero",
    mouse: { x: 0, y: 0 },
  };

  private listeners = new Set<Listener>();

  public getState(): WorldSnapshot {
    return this.state;
  }

  public setProgress(progress: number, activeSection = "hero") {
    // 6 checkpoints across [0, 5]: intervals of 0.2
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const totalCheckpoints = 5;
    const scaled = clampedProgress * totalCheckpoints;
    const current = Math.floor(scaled);
    const next = Math.min(totalCheckpoints, current + 1);
    const checkpointProgress = scaled - current;

    this.state = {
      ...this.state,
      progress: clampedProgress,
      currentCheckpoint: current,
      nextCheckpoint: next,
      checkpointProgress,
      activeSection,
    };

    this.notify();
  }

  public setMouse(x: number, y: number) {
    this.state.mouse = { x, y };
    this.notify();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  public interpolateCamera(): {
    position: [number, number, number];
    target: [number, number, number];
    coreScale: number;
    rotationSpeed: number;
    emissiveIntensity: number;
  } {
    const { currentCheckpoint, nextCheckpoint, checkpointProgress } = this.state;
    const c1: CameraCheckpoint = CHECKPOINTS[currentCheckpoint] || CHECKPOINTS[0];
    const c2: CameraCheckpoint = CHECKPOINTS[nextCheckpoint] || CHECKPOINTS[5];
    const t = Math.max(0, Math.min(1, checkpointProgress));

    // Smoothstep easing for checkpoint interpolation
    const ease = t * t * (3 - 2 * t);

    const lerp = (a: number, b: number) => a + (b - a) * ease;

    return {
      position: [
        lerp(c1.position[0], c2.position[0]),
        lerp(c1.position[1], c2.position[1]),
        lerp(c1.position[2], c2.position[2]),
      ],
      target: [
        lerp(c1.target[0], c2.target[0]),
        lerp(c1.target[1], c2.target[1]),
        lerp(c1.target[2], c2.target[2]),
      ],
      coreScale: lerp(c1.coreScale, c2.coreScale),
      rotationSpeed: lerp(c1.rotationSpeed, c2.rotationSpeed),
      emissiveIntensity: lerp(c1.emissiveIntensity, c2.emissiveIntensity),
    };
  }
}

export const worldState = new WorldStateManager();
