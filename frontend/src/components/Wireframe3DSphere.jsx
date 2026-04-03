import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import useMobile from '../hooks/useMobile'

const IcosahedronMesh = () => {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[2.5, 3]}>
      <meshStandardMaterial
        color="#ffffff"
        metalness={1}
        roughness={0.1}
        emissive="#a855f7"
        emissiveIntensity={0.2}
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />
    </Icosahedron>
  )
}

const Scene = ({ isMobile }) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#a855f7" />
      <pointLight position={[-5, -5, 5]} intensity={2} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} intensity={1} color="#ffffff" />
      
      <IcosahedronMesh />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={2.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={0.7}
          />
        </EffectComposer>
      )}
    </>
  )
}

export const Wireframe3DSphere = () => {
  const isMobile = useMobile()
  
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 1.5]}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  )
}

export default Wireframe3DSphere
