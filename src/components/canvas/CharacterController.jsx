import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Character } from "./Character";
import { JoystickControls } from "./JoystickControls";

// Helper Functions (no changes needed)
const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

const isMobile = () => {
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// CharacterController Component
export const CharacterController = () => {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 15, min: 10, max: 100, step: 10 },
      RUN_SPEED: { value: 30, min: 20, max: 200, step: 10 },
      ROTATION_SPEED: { value: 0.05, min: 0.01, max: 0.5, step: 0.01 },
    }
  );

  const rb = useRef();
  const character = useRef();
  const [animation, setAnimation] = useState("idle");
  const [joystickMovement, setJoystickMovement] = useState({ x: 0, z: 0 });

  const [, get] = useKeyboardControls();
  const isMobileDevice = isMobile();

  useFrame(() => {
    const movement = { x: 0, z: 0 };
    const speed = get().run ? RUN_SPEED : WALK_SPEED;

    if (!isMobileDevice) {
      // Desktop Controls
      if (get().forward) movement.z = 1;
      if (get().backward) movement.z = -1;
      if (get().left) movement.x = 1;
      if (get().right) movement.x = -1;
    } else {
      // Mobile Controls
      movement.x = joystickMovement.x;
      movement.z = joystickMovement.z;
    }

    if (movement.x !== 0 || movement.z !== 0) {
      const targetRotation = Math.atan2(movement.x, movement.z);
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        targetRotation,
        ROTATION_SPEED
      );

      const vel = rb.current.linvel();
      vel.x = Math.sin(character.current.rotation.y) * speed;
      vel.z = Math.cos(character.current.rotation.y) * speed;
      rb.current.setLinvel(vel, true);

      setAnimation(speed === RUN_SPEED ? "run" : "walk");
    } else {
      setAnimation("idle");
    }
  });

  return (
    <>
      {/* Renders JoystickControls outside of Canvas */}
      {isMobileDevice && (
        <JoystickControls
          onMove={(movement) => setJoystickMovement(movement)}
        />
      )}

      <RigidBody
        ref={rb}
        colliders={false}
        lockRotations
        linearDamping={20}
        angularDamping={20}
      >
        <group ref={character}>
          <Character scale={0.3} position-y={0} animation={animation} />
        </group>
        <CapsuleCollider args={[8, 15]} position={[0, 10, 0]} />
      </RigidBody>
    </>
  );
};
