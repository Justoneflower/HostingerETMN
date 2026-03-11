import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ThreadModel({
  scale = 1,
  x = 0,
  y = 0,
  z = 0
}) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/benchy.glb");

  /*  SPIN */
  const isSpinning = useRef(false);
  const totalRotation = useRef(0);

  /* COLOR  */
  useEffect(() => {
    const handler = (e) => {
      const color = new THREE.Color(e.detail);

     
      Object.values(materials).forEach((mat) => {
        if (mat?.color) mat.color.set(color);
      });

      
      isSpinning.current = true;
      totalRotation.current = 0;
    };

    window.addEventListener("changeColor", handler);
    return () => window.removeEventListener("changeColor", handler);
  }, [materials]);

  /*  ROTATION ANIMATION  */
  useFrame((_, delta) => {
    if (!groupRef.current || !isSpinning.current) return;

    const speed = 5; 
    const step = speed * delta;

    groupRef.current.rotation.y += step;
    totalRotation.current += step;

   
    if (totalRotation.current >= Math.PI * 2) {
      groupRef.current.rotation.y = 0; 
      isSpinning.current = false;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[x, y, z]}
      scale={scale}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["Scene_-_Root"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/benchy.glb");
