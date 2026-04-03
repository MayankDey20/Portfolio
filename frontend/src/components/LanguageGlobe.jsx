import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, Sphere, MeshDistortMaterial, PerspectiveCamera, Stars } from '@react-three/drei'
import * as THREE from 'three'

const LanguageLabel = ({ text, position }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
      <Text
        fontSize={0.2}
        color="#00f7ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </Float>
  )
}

const Globe = () => {
  const globeRef = useRef()
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005
    }
  })

  // Prepare floating languages in spherical coordinates
  const languageData = useMemo(() => {
    const list = [
      'Quechua', 'Nahuatl', 'Maori', 'Zulu', 
      'Aymara', 'Guarani', 'Yoruba', 'Hawaiian', 'Maya'
    ]
    return list.map((text, i) => {
      const phi = Math.acos(-1 + (2 * i) / list.length)
      const theta = Math.sqrt(list.length * Math.PI) * phi
      const radius = 2.4
      return {
        text,
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ]
      }
    })
  }, [])

  return (
    <group ref={globeRef}>
      {/* The Core Globe */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#002d3d" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
          metalness={1}
          roughness={0}
        />
      </Sphere>

      {/* Inner Glow Core */}
      <Sphere args={[1.9, 32, 32]}>
        <meshBasicMaterial 
          color="#00f7ff" 
          transparent={true} 
          opacity={0.05} 
        />
      </Sphere>

      {/* Floating Labels */}
      {languageData.map((lang, idx) => (
        <LanguageLabel key={idx} text={lang.text} position={lang.position} />
      ))}
    </group>
  )
}

const LanguageGlobe = () => {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f7ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066cc" />
        
        <Globe />
        
        {/* Subtle background stars focused around the globe */}
        <Stars radius={20} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  )
}

export default LanguageGlobe
