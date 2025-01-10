import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import FBXWithAnimation from "./FBXWithAnimation";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import * as THREE from "three";

// import { LOD } from "@react-three/fiber";

const HDRIEnvironment = ({ hdrPath }) => {
  const { scene, gl } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const loader = new RGBELoader();
    loader.load(hdrPath, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;

      // Set the scene's environment and background
      scene.environment = envMap;
      scene.background = envMap;

      texture.dispose();
      pmremGenerator.dispose();
    });

    return () => {
      // Clean up environment map when component is unmounted
      scene.environment = null;
      scene.background = null;
    };
  }, [gl, hdrPath, scene]);

  return null;
};

const Floor = () => {
  const floor = useGLTF("/assets/floor/scene.gltf");
  return (
    <primitive
      object={floor.scene}
      position={[0, -34, 0]}
      scale={[0.3, 0.5, 0.3]}
      rotation={[0, 0, 0]}
    />
  );
};

const City = () => {
  const city = useGLTF("/assets/building/scene.gltf");
  return (
    <primitive
      object={city.scene}
      position={[0, -34, 0]}
      scale={[100, 100, 100]}
      rotation={[0, 0, 0]}
    />
  );
};

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
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [100, 5, 5], fov: 50, near: 0.1, far: 10000 }}
      gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        bottom: 0,
        zIndex: 0,
        backgroundColor: "#92bfef",
      }}
    >
      <HDRIEnvironment hdrPath="/assets/hdr/sky.hdr" />
      <OrbitControls
        enableZoom={true}
        maxPolarAngle={Math.PI/1.8}
        minPolarAngle={-Math.PI/2}
        enableDamping={true}
        dampingFactor={0.1}
        enablePan={false}
        minDistance={10}
        maxDistance={200}
      />
      <ambientLight intensity={1} />
      <FBXWithAnimation
        modelPath="/models/ashok1.fbx"
        scale={0.3}
        position={[0, -32, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <City />
    </Canvas>
  );
};

export default Canvas3D;
