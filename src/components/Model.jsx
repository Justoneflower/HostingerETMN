import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model({
  scale = 0.09,           // 
  position = [0, -1, 0],  // 
  autoRotate = true,
  rotationSpeed = 0.003,
  ...props
}) {
  const group = useRef();

  const { scene, animations } = useGLTF("/holo.glb");
  const { actions } = useAnimations(animations, group);

  /* ---------- play animation if exists ---------- */
  useEffect(() => {
    if (!actions) return;

    Object.values(actions).forEach((action) => action?.play());
  }, [actions]);

 
  useFrame(() => {
    if (autoRotate && group.current) {
      group.current.rotation.y += rotationSpeed;
    }
  });

 
  useEffect(() => {
    if (!group.current) return;

    group.current.scale.setScalar(scale);
    group.current.position.set(...position);
  }, [scale, position]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}


useGLTF.preload("/holo.glb");

