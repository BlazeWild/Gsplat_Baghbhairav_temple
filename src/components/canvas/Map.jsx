import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

export const Map = ({ model, ...props }) => {
  const { scene, animations } = useGLTF(model); // Dynamically load the GLTF model
  const group = useRef();
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Traverse the scene to enable shadows for meshes
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    // Play the first animation if available
    if (actions && animations.length > 0) {
      actions[animations[0].name].play();
    }
  }, [actions, animations]);

  return (
    <group {...props}>
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={scene} ref={group} />
      </RigidBody>
    </group>
  );
};
