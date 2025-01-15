import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useRef } from "react";
import { Map } from "./Map";
import { CharacterController } from "./CharacterController";

export const Experience = () => {
  const shadowCameraRef = useRef();

  return (
    <>
      {/* Environment Lighting */}
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.5}
        castShadow
        position={[10, 10, 10]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>

      {/* Physics Simulation */}
      <Physics>
        <Map
          model="/assets/building/scene.gltf" // Path to your city model
          position={[0, -20, 0]}
          scale={[80, 100, 100]}
          rotation={[0, 0, 0]}
        />
        <CharacterController/>
      </Physics>
    </>
  );
};
