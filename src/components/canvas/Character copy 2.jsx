import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { AnimationMixer, LoopRepeat ,Color} from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export function Character({ animation = "idle", ...props }) {
  const group = useRef();
  const mixer = useRef();
  const [model, setModel] = useState(null);
  const [animations, setAnimations] = useState({});
  const currentAction = useRef();

  // Load the base model and animations
  useEffect(() => {
    const loader = new FBXLoader();

    // Load the character model
    loader.load("/models/ashok1.fbx", (loadedModel) => {
      setModel(loadedModel);
    });

    // Load animations
    const animationFiles = {
      idle: "/animations/Idle.fbx",
      walk: "/animations/Walking.fbx",
      run: "/animations/Running.fbx",
    };

    const loadedAnimations = {};
    const promises = Object.entries(animationFiles).map(([key, path]) =>
      new Promise((resolve) => {
        loader.load(path, (animation) => {
          loadedAnimations[key] = animation.animations[0];
          resolve();
        });
      })
    );

    Promise.all(promises).then(() => setAnimations(loadedAnimations));
  }, []);

  // Initialize AnimationMixer
  useEffect(() => {
    if (model && Object.keys(animations).length > 0) {
      mixer.current = new AnimationMixer(model);

      // Play the default animation
      if (animations[animation]) {
        const action = mixer.current.clipAction(animations[animation]);
        action.setLoop(LoopRepeat);
        action.play();
        currentAction.current = action;
      }
    }
  }, [model, animations]);

  // Handle animation changes
  useEffect(() => {
    if (mixer.current && animations[animation]) {
      const newAction = mixer.current.clipAction(animations[animation]);
      if (currentAction.current) {
        currentAction.current.fadeOut(0.3);
      }
      newAction.reset().fadeIn(0.3).play();
      currentAction.current = newAction;
    }
  }, [animation]);

  // Update mixer on each frame
  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return model ? (
    <group ref={group} {...props} dispose={null}>
      <primitive object={model} />
    </group>
  ) : null;
}
