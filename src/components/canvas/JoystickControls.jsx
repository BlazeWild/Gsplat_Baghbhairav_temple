import React, { useState, useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Gamepad } from "react-gamepad";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// Create a simple joystick in R3F
const CustomJoystick = ({ onMove }) => {
  const [movement, setMovement] = useState({ x: 0, z: 0 });
  const stickRef = useRef();
  const baseRef = useRef();
  
  // Handle joystick movement based on the gamepad
  const handleAxisChange = (axisName, value) => {
    if (axisName === "LeftStickX") {
      setMovement((prev) => ({ ...prev, x: value }));
    } else if (axisName === "LeftStickY") {
      setMovement((prev) => ({ ...prev, z: value * -1 })); // Invert Y-axis for expected behavior
    }
  };

  // Update the 3D joystick stick based on the movement values
  useEffect(() => {
    if (stickRef.current) {
      stickRef.current.position.x = movement.x * 0.5; // Adjust scaling as needed
      stickRef.current.position.z = movement.z * 0.5; // Adjust scaling as needed
    }
    onMove(movement); // Send movement data to the parent component
  }, [movement, onMove]);

  return (
    <Html position={[0, 0, 0]} transform>
      <div className="joystick-container">
        <Gamepad
          onAxisChange={handleAxisChange}
          onConnect={() => console.log("Gamepad connected")}
          onDisconnect={() => console.log("Gamepad disconnected")}
        >
          {/* Render the joystick in 3D */}
          <group ref={baseRef} position={[0, 0, 0]}>
            {/* Joystick base */}
            <mesh>
              <cylinderGeometry args={[0.2, 0.3, 0.05, 32]} />
              <meshStandardMaterial color="#888" />
            </mesh>
            
            {/* Joystick stick */}
            <mesh ref={stickRef}>
              <cylinderGeometry args={[0.03, 0.03, 0.4, 32]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          </group>
        </Gamepad>
      </div>
    </Html>
  );
};

export default CustomJoystick;
