import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, PerspectiveCamera } from '@react-three/drei'

const MiniCube = ({ name, color, position }) => {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (mesh.current) {
      // Overclock effect: 5x speed on hover
      mesh.current.rotation.x += 0.01 * (hovered ? 5 : 1)
      mesh.current.rotation.y += 0.01 * (hovered ? 5 : 1)
      
      const time = state.clock.getElapsedTime()
      // Floating motion
      mesh.current.position.y = position[1] + Math.sin(time + position[0]) * 0.08
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color={hovered ? color : '#111'} 
          emissive={color}
          emissiveIntensity={hovered ? 2.5 : 1.2}
          roughness={0.1}
          metalness={0.9}
        />
        <Text
          position={[0, 0, 0.41]}
          fontSize={0.14}
          color="white"
          font="https://fonts.gstatic.com/s/outfit/v11/QGYsz_OzzM_Qpx47mHmNw777.woff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </mesh>
    </Float>
  )
}

export const ProjectTechCubes = ({ techs = [] }) => {
  // Default stack if none provided
  const displayTechs = techs.length > 0 ? techs : [
    { name: 'PYTHON', color: '#3776AB', pos: [-2, 0, 0] },
    { name: 'REACT', color: '#61DAFB', pos: [0, 0, 0] },
    { name: 'NODE', color: '#339933', pos: [2, 0, 0] }
  ]

  return (
    <div className="w-full h-32 relative group/canvas mt-2 pointer-events-auto">
      <Canvas alpha dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 10, 5]} intensity={1.5} />
        <pointLight position={[-5, -10, -5]} color="#a855f7" intensity={0.8} />
        
        {displayTechs.map((tech, idx) => (
          <MiniCube 
            key={`${tech.name}-${idx}`} 
            name={tech.name} 
            color={tech.color} 
            position={tech.pos || [idx * 2 - (displayTechs.length - 1), 0, 0]} 
          />
        ))}
      </Canvas>
      {/* Structural Label */}
      <div className="absolute -top-4 left-0 text-[9px] tracking-[0.5em] font-mono text-white/30 uppercase border-l border-purple-500/50 pl-2">
        Integrated Stack
      </div>
    </div>
  )
}

export default ProjectTechCubes

