export interface CameraCheckpoint {
  position: [number, number, number];
  target: [number, number, number];
  coreScale: number;
  rotationSpeed: number;
  particleDensityFactor: number;
  emissiveIntensity: number;
}

export const CHECKPOINTS: Record<number, CameraCheckpoint> = {
  0: {
    // HERO
    position: [0, 0, 8.0],
    target: [0, 0, 0],
    coreScale: 1.0,
    rotationSpeed: 0.25,
    particleDensityFactor: 1.0,
    emissiveIntensity: 1.0,
  },
  1: {
    // ABOUT
    position: [2.8, 1.2, 6.2],
    target: [0.6, 0.2, 0],
    coreScale: 1.15,
    rotationSpeed: 0.35,
    particleDensityFactor: 1.1,
    emissiveIntensity: 1.2,
  },
  2: {
    // TECH STACK
    position: [-3.6, 2.0, 5.8],
    target: [-0.4, 0, 0],
    coreScale: 0.9,
    rotationSpeed: 0.45,
    particleDensityFactor: 1.2,
    emissiveIntensity: 1.4,
  },
  3: {
    // EXPERIENCE
    position: [1.2, -2.4, 6.8],
    target: [0.2, -0.6, 0],
    coreScale: 1.1,
    rotationSpeed: 0.3,
    particleDensityFactor: 0.9,
    emissiveIntensity: 1.1,
  },
  4: {
    // PROJECTS
    position: [4.5, 1.8, 9.8],
    target: [1.2, 0, 0],
    coreScale: 0.8,
    rotationSpeed: 0.2,
    particleDensityFactor: 1.3,
    emissiveIntensity: 1.0,
  },
  5: {
    // CONTACT (Final calm stabilized state)
    position: [0, 0, 6.2],
    target: [0, 0, 0],
    coreScale: 1.05,
    rotationSpeed: 0.08,
    particleDensityFactor: 0.7,
    emissiveIntensity: 1.6,
  },
};
