import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {Experience} from "./Experience";
import { KeyboardControls } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

const Canvas3D = () => {
  useEffect(() => {
    const handleContextLost = () => {
      console.error("WebGL context lost. Trying to recover...");
      // Additional recovery logic or cleanup if necessary
    };

    window.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      window.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [100, 5, 5], near: 0.1,far:10000, fov: 40 }}
        style={{
          touchAction: "none",
        }}
      >
        <color attach="background" args={["#ececec"]} />
        <ambientLight intensity={0.4} />

        <Experience />
        {/* <OrbitControls 
        // enableZoom={true}
        // enablePan={true}
        // enableRotate={true}
        /> */}
      </Canvas>
    </KeyboardControls>
  );
}

export default Canvas3D;
