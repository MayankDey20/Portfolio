import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Text, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const TechCube = ({ name, color, position }) => {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01 * (hovered ? 5 : 1)
      mesh.current.rotation.y += 0.01 * (hovered ? 5 : 1)
      
      const time = state.clock.getElapsedTime()
      mesh.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial 
          color={hovered ? color : '#222'} 
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.2}
          roughness={0.2}
          metalness={0.8}
        />
        <Text
          position={[0, 0, 0.61]}
          fontSize={0.2}
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

export const TechStack = () => {
  const techs = [
    { name: 'REACT', color: '#61DAFB', pos: [-4, 1, 0] },
    { name: 'THREE.JS', color: '#ffffff', pos: [-2, -1, 0] },
    { name: 'NODE.JS', color: '#339933', pos: [0, 1.5, 0] },
    { name: 'PYTHON', color: '#3776AB', pos: [2, -1, 0] },
    { name: 'DOCKER', color: '#2496ED', pos: [4, 1, 0] },
    { name: 'AWS', color: '#FF9900', pos: [3, 2, -2] },
    { name: 'JS', color: '#F7DF1E', pos: [-3, 2.5, -2] },
  ]

  return (
    <section className="relative w-full h-[600px] py-32 overflow-hidden bg-black/20">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={1} />
          {techs.map((tech) => (
            <TechCube 
              key={tech.name} 
              name={tech.name} 
              color={tech.color} 
              position={tech.pos} 
            />
          ))}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-12 pointer-events-none h-full flex flex-col justify-center">
        <h2 className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-mono mb-8">Expertise DNA</h2>
        <div className="w-12 h-px bg-white/10 mb-12" />
        <div className="max-w-md">
          <h3 className="metallic-text text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-none">
            ARCHITECTURAL <br/> CAPABILITIES
          </h3>
          <p className="text-white/40 text-sm font-mono tracking-wider leading-relaxed">
            Building complex digital infrastructures with high-performance 3D visuals and scalable backend ecosystems.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TechStack
