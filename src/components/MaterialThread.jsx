// MaterialThread.jsx
import { useRef, useMemo, useEffect } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

export default function MaterialThread({
  color = "#1e40af",

  startX = -22,     
  endX = 22,       

  frequency = 2,  
  baseAmplitude = 0.18,
  depth = 0.22,

  thickness = 3,
  smoothness = 800,

 
  waveStretch = [
    4, 1.8, 1.6, 1.1, 5
  ]
}) {
  const lineRef = useRef();

  const points = useMemo(() => {
    const pts = [];

    for (let i = 0; i <= smoothness; i++) {
      const t = i / smoothness;
      const x = THREE.MathUtils.lerp(startX, endX, t);

      let y = 0;
      let z = 0;

     
      for (let w = 0; w < frequency; w++) {
        const localT = t * frequency - w;
        if (localT < 0 || localT > 1) continue;

        const stretch = waveStretch[w] ?? 1;
        const wave = Math.sin(localT * Math.PI * 2);

        y += wave * baseAmplitude * stretch;
        z += Math.cos(localT * Math.PI * 2) * depth * stretch * 0.35;
      }

      pts.push(new THREE.Vector3(x, y, z));
    }

    return pts;
  }, [
    startX,
    endX,
    frequency,
    baseAmplitude,
    depth,
    smoothness,
    waveStretch
  ]);

 
  useEffect(() => {
    const handler = (e) => {
      lineRef.current?.material.color.set(e.detail);
    };
    window.addEventListener("changeColor", handler);
    return () => window.removeEventListener("changeColor", handler);
  }, []);

  return (
    <group position={[0, 0.1, -2]}>
      <Line
        ref={lineRef}
        points={points}
        color={color}
        lineWidth={thickness}
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </group>
  );
}


