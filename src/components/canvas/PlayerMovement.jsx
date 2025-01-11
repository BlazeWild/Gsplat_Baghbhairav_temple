// PlayerMovement.js
import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

const PlayerMovement = ({
  modelPath,
  animationsPath,
  scale,
  position,
  rotation,
}) => {
  const modelRef = useRef();
  const [mixer, setMixer] = useState(null);
  const [animations, setAnimations] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveDirection = new THREE.Vector3();
  const mousePosition = new THREE.Vector2();
  const cameraDirection = new THREE.Vector3();
  const speed = { walk: 2, run: 5 };

  // Load the main model
  useEffect(() => {
    const loader = new FBXLoader();

    loader.load(modelPath, (model) => {
      modelRef.current = model;

      // Apply scale, position, and rotation
      if (scale) model.scale.set(scale, scale, scale);
      if (position) model.position.set(...position);
      if (rotation) model.rotation.set(...rotation);

      // Set up animation mixer
      const _mixer = new THREE.AnimationMixer(model);
      setMixer(_mixer);
    });

    return () => {
      if (mixer) mixer.stopAllAction();
    };
  }, [modelPath, scale, position, rotation]);

  // Load the animations
  useEffect(() => {
    const loader = new FBXLoader();

    const _animations = {};
    const promises = Object.entries(animationsPath).map(([key, path]) => {
      return new Promise((resolve) => {
        loader.load(path, (anim) => {
          _animations[key] = anim.animations[0]; // Store animation by name
          resolve();
        });
      });
    });

    Promise.all(promises).then(() => setAnimations(_animations));
  }, [animationsPath]);

  // Handle mouse movement and pointer lock
  useEffect(() => {
    let pointerLocked = false;

    const handlePointerLockChange = () => {
      pointerLocked = document.pointerLockElement === document.body;
    };

    const handleMouseMove = (event) => {
      if (pointerLocked && modelRef.current) {
        const { movementX, movementY } = event;
        modelRef.current.rotation.y -= movementX * 0.002; // Rotate player

        // Adjust forward/backward direction based on vertical movement
        const forward = movementY < 0 ? -1 : movementY > 0 ? 1 : 0;
        moveDirection.set(0, 0, forward);
        setIsMoving(forward !== 0);
      }
    };

    const handlePointerLock = () => {
      if (!pointerLocked) {
        document.body.requestPointerLock();
      }
    };

    const handlePointerUnlock = (event) => {
      if (event.key === "Escape") {
        document.exitPointerLock();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handlePointerLock);
    window.addEventListener("keydown", handlePointerUnlock);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handlePointerLock);
      window.removeEventListener("keydown", handlePointerUnlock);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, []);

  // Update movement and animations in each frame
  useFrame((state) => {
    if (modelRef.current && mixer) {
      mixer.update(0.016); // Update animation mixer

      // Get camera direction and apply movement
      state.camera.getWorldDirection(cameraDirection);
      cameraDirection.y = 0;
      cameraDirection.normalize();

      if (isMoving) {
        const movementSpeed = isRunning ? speed.run : speed.walk;
        const movement = cameraDirection
          .clone()
          .multiplyScalar(movementSpeed * 0.016 * moveDirection.z);
        modelRef.current.position.add(movement);

        // Play Run or Walk animation
        if (isRunning && animations["Run"]) {
          mixer.clipAction(animations["Run"]).reset().fadeIn(0.2).play();
        } else if (!isRunning && animations["Walk"]) {
          mixer.clipAction(animations["Walk"]).reset().fadeIn(0.2).play();
        }
      } else if (animations["Idle"]) {
        mixer.clipAction(animations["Idle"]).reset().fadeIn(0.2).play();
      }
    }
  });

  return <>{modelRef.current && <primitive object={modelRef.current} />}</>;
};

export default PlayerMovement;
