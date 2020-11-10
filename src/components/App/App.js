import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import Box from '../Box/Box';
import Controls from '../Controls/Controls';
import { Stars, Sky, PointerLockControls } from "@react-three/drei"
import Plane from '../Plane/Plane';
import Dinosaur from '../Dinosaur/Dinosaur';
import { Player } from '../Player/Player';
import { Physics } from 'use-cannon';

const App = () => {
  const [night, setNight] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.code === "KeyN"){
        setNight(!night)        
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })  

  return (
    <>
      <Canvas 
        // camera={{ position: [0, 7, 5] }} 
        onCreated={({ gl }) => { 
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        {night ? <Stars /> : <Sky sunPosition={[100, 100, 100]} /> }
        {/* {night ? <fog attach="fog" args={["black", 2, 15]}/> : <fog attach="fog" args={["white", 10, 15]}/>} */}
        {/* <Controls /> */}
        
        <PointerLockControls />
        <ambientLight intensity={night ? 0.05 : 0.5}/>
        <spotLight intensity={0.8} position= {[0, 15, 20]} penumbra={1} castShadow />
        
        
        <Physics gravity={[0, -30, 0]}>
          <Dinosaur />
          <Plane />
          <Player />       
          <Box />
        </Physics>

      </Canvas>
    </>
  );
}

export default App;

