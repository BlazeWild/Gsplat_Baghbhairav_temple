# Gsplat_Baghbhairav_temple

<RigidBody colliders={false} lockRotations ref={rb}>
  <group ref={container}>
    {/* Adjusted camera target position (slightly higher for better focus) */}
    <group ref={cameraTarget} position-z={100} position-y={40} rotation={[0,Math.PI/2,0]}/>
    
    {/* Adjusted camera position (higher and further from the player) */}
    <group ref={cameraPosition} position-y={50} position-z={-200} />
    
    <group ref={character}>
      <Character scale={0.3} position-y={3} animation={animation} />
    </group>
  </group>
  
  {/* Adjust CapsuleCollider if necessary */}
  <CapsuleCollider args={[8, 15]} position={[0, 10, 0]} />
</RigidBody>