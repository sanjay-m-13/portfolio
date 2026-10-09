"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DISTRICTS } from "@/data/districts";

const STREET_OFFSETS = [-28, 0, 28] as const;
const STREET_LENGTH = 120;
const ROAD_WIDTH = 8;
const SIDEWALK_WIDTH = 2.8;

interface RoadMarking {
  x: number;
  z: number;
  rotation: number;
}

function createCenterLines(): RoadMarking[] {
  return STREET_OFFSETS.flatMap((offset) => [
    { x: 0, z: offset - 0.14, rotation: 0 },
    { x: 0, z: offset + 0.14, rotation: 0 },
    { x: offset - 0.14, z: 0, rotation: Math.PI / 2 },
    { x: offset + 0.14, z: 0, rotation: Math.PI / 2 },
  ]);
}

function createEdgeDashes(): RoadMarking[] {
  const markings: RoadMarking[] = [];

  STREET_OFFSETS.forEach((offset) => {
    for (let alongStreet = -57; alongStreet <= 57; alongStreet += 6) {
      [-1, 1].forEach((side) => {
        markings.push(
          { x: alongStreet, z: offset + side * 3.45, rotation: 0 },
          { x: offset + side * 3.45, z: alongStreet, rotation: Math.PI / 2 },
        );
      });
    }
  });

  return markings;
}

function createCrosswalkStripes(): RoadMarking[] {
  const markings: RoadMarking[] = [];

  STREET_OFFSETS.forEach((horizontalStreet) => {
    STREET_OFFSETS.forEach((verticalStreet) => {
      [-1, 1].forEach((side) => {
        for (let stripe = 0; stripe < 6; stripe += 1) {
          const distance = ROAD_WIDTH / 2 + 0.5 + stripe;
          markings.push(
            {
              x: verticalStreet + side * distance,
              z: horizontalStreet,
              rotation: 0,
            },
            {
              x: verticalStreet,
              z: horizontalStreet + side * distance,
              rotation: Math.PI / 2,
            },
          );
        }
      });
    });
  });

  return markings;
}

const CENTER_LINES = createCenterLines();
const EDGE_DASHES = createEdgeDashes();
const CROSSWALK_STRIPES = createCrosswalkStripes();

function InstancedMarkings({
  markings,
  size,
  color,
}: {
  markings: RoadMarking[];
  size: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const transform = new THREE.Object3D();
    markings.forEach(({ x, z, rotation }, index) => {
      transform.position.set(x, 0.045, z);
      transform.rotation.set(0, rotation, 0);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [markings]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, markings.length]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </instancedMesh>
  );
}

function Street({ offset, vertical }: { offset: number; vertical: boolean }) {
  const roadSize: [number, number] = vertical
    ? [ROAD_WIDTH, STREET_LENGTH]
    : [STREET_LENGTH, ROAD_WIDTH];
  const curbSize: [number, number] = vertical
    ? [0.32, STREET_LENGTH]
    : [STREET_LENGTH, 0.32];
  const sidewalkSize: [number, number] = vertical
    ? [SIDEWALK_WIDTH, STREET_LENGTH]
    : [STREET_LENGTH, SIDEWALK_WIDTH];

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={vertical ? [offset, 0.015, 0] : [0, 0.015, offset]}
        receiveShadow
      >
        <planeGeometry args={roadSize} />
        <meshStandardMaterial color="#202833" roughness={0.96} />
      </mesh>

      {[-1, 1].map((side) => {
        const curbOffset = side * (ROAD_WIDTH / 2 + 0.16);
        const sidewalkOffset =
          side * (ROAD_WIDTH / 2 + 0.16 + SIDEWALK_WIDTH / 2);
        const curbPosition: [number, number, number] = vertical
          ? [offset + curbOffset, 0.09, 0]
          : [0, 0.09, offset + curbOffset];
        const sidewalkPosition: [number, number, number] = vertical
          ? [offset + sidewalkOffset, 0.055, 0]
          : [0, 0.055, offset + sidewalkOffset];

        return (
          <group key={side}>
            <mesh position={curbPosition} receiveShadow>
              <boxGeometry args={[curbSize[0], 0.18, curbSize[1]]} />
              <meshStandardMaterial color="#647080" roughness={0.9} />
            </mesh>
            <mesh
              position={sidewalkPosition}
              receiveShadow
            >
              <boxGeometry
                args={[
                  sidewalkSize[0],
                  0.08,
                  sidewalkSize[1],
                ]}
              />
              <meshStandardMaterial color="#343e4b" roughness={0.95} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function CityMap() {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial color="#111821" roughness={0.98} />
      </mesh>

      {STREET_OFFSETS.map((offset) => (
        <group key={offset}>
          <Street offset={offset} vertical={false} />
          <Street offset={offset} vertical />
        </group>
      ))}

      <InstancedMarkings
        markings={CENTER_LINES}
        size={[STREET_LENGTH, 0.035, 0.11]}
        color="#eab857"
      />
      <InstancedMarkings
        markings={EDGE_DASHES}
        size={[2.2, 0.035, 0.12]}
        color="#cbd2d9"
      />
      <InstancedMarkings
        markings={CROSSWALK_STRIPES}
        size={[0.55, 0.035, ROAD_WIDTH - 0.8]}
        color="#e5e7eb"
      />

      {DISTRICTS.map((district) => (
        <group
          key={district.id}
          position={[district.position[0], 0.05, district.position[2]]}
        >
          <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
            <boxGeometry
              args={[district.size[0] + 3, 0.2, district.size[2] + 3]}
            />
            <meshStandardMaterial
              color="#1f2937"
              roughness={0.6}
              metalness={0.4}
            />
          </mesh>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.22, 0]}>
            <ringGeometry
              args={[district.triggerRadius - 0.4, district.triggerRadius, 32]}
            />
            <meshBasicMaterial
              color={district.color}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.23, 0]}>
            <circleGeometry args={[district.triggerRadius - 0.5, 32]} />
            <meshBasicMaterial
              color={district.color}
              transparent
              opacity={0.08}
              side={THREE.DoubleSide}
            />
          </mesh>

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
            )),
          )}
        </group>
      ))}
    </group>
  );
}
