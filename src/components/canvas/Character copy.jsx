import React, { useRef, useState, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { AnimationMixer } from "three";

export const Character = ({ modelPath, scale, position, rotation }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const fbxRef = useRef();

  // Load fbx model
  const fbx = useLoader(FBXLoader, modelPath);

  useEffect(() => {
    if (fbx) {
      console.log("FBX model loaded:", fbx);

      fbx.scale.set(scale, scale, scale);
      fbx.position.set(...position);
      fbx.rotation.set(...rotation);

      fbxRef.current = fbx;
    }
  }, [fbx, scale, position, rotation]);

  return <primitive object={fbx} />;
};
// export default Character;
