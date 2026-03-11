import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function LeftMaterialModel() {
  const group = useRef();
  const { scene } = useGLTF("/new-model.glb");

  const [targetColor, setTargetColor] = useState("#ffffff"); 

  const floatSpeed = 2;
  const floatHeight = 0.3;
  const initialY = 0;

 
  const spinning = useRef(false);
  const spinProgress = useRef(0);
  const FULL_SPIN = Math.PI * 2;
  const SPIN_SPEED = 0.1;
  const BASE_ROTATION_Y = 180;

 
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material?.color) {
        child.material = child.material.clone();
      }
    });
  }, [scene]);

 
  useEffect(() => {
    const handler = (e) => {
      setTargetColor(e.detail); 
      spinning.current = true;
    };

    window.addEventListener("changeColor", handler);
    return () => window.removeEventListener("changeColor", handler);
  }, []);

  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material?.color) {
        child.material.color.set(targetColor);
        child.material.needsUpdate = true;
      }
    });
  }, [targetColor, scene]);


  useFrame(({ clock }) => {
    if (!group.current) return;

   
    group.current.position.y = initialY + Math.sin(clock.elapsedTime * floatSpeed) * floatHeight;

   
    if (spinning.current) {
      const step = SPIN_SPEED;
      spinProgress.current += step;
      group.current.rotation.y += step;

      if (spinProgress.current >= FULL_SPIN) {
        spinning.current = false;
        spinProgress.current = 0;
        group.current.rotation.y = BASE_ROTATION_Y;
      }
    }
  });

  return (
    <primitive
      ref={group}
      object={scene.clone()}
      scale={0.04}
      position={[-6, initialY, 0]}
      rotation={[0, BASE_ROTATION_Y, 0]}
    />
  );
}

useGLTF.preload("/new-model.glb");

