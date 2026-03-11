import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function MaterialModel(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/3d_benchy.glb");

 
  useEffect(() => {
    const handler = (e) => {
      const color = new THREE.Color(e.detail);

      Object.values(materials).forEach((mat) => {
        if (mat && mat.color) {
          mat.color.set(color);
        }
      });
    };

    window.addEventListener("changeColor", handler);
    return () => window.removeEventListener("changeColor", handler);
  }, [materials]);

  return (
    <group ref={groupRef} {...props} dispose={null}>

      
      <group rotation={[-Math.PI / 2, 0, 0]}>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials["Scene_-_Root"]}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["Scene_-_Root"]}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials["Scene_-_Root"]}
        />

      </group>
    </group>
  );
}


useGLTF.preload("/3d_benchy.glb");
