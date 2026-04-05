import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Html, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Curated list of major world cities for high-speed lookup
const MAJOR_CITIES = [
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, tz: 9 },
  { name: 'New York', lat: 40.7128, lon: -74.0060, tz: -5 },
  { name: 'London', lat: 51.5074, lon: -0.1278, tz: 0 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, tz: 4 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, tz: 11 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, tz: 5.5 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522, tz: 1 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, tz: 8 },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194, tz: -8 },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050, tz: 1 },
  { name: 'Sao Paulo', lat: -23.5505, lon: -46.6333, tz: -3 },
  { name: 'Johannesburg', lat: -26.2041, lon: 28.0473, tz: 2 },
  { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, tz: 8 },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173, tz: 3 },
  { name: 'Cairo', lat: 30.0444, lon: 31.2357, tz: 2 },
];

const AtmosphericSphere = ({ onHover }) => {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Custom shader for the earth texture / grid effect
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      mousePos: { value: new THREE.Vector3(0, 0, 0) },
      uColor: { value: new THREE.Color('#0066FF') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float time;
      uniform vec3 mousePos;
      uniform vec3 uColor;

      void main() {
        // Dot grid effect
        float dots = step(0.95, sin(vUv.x * 200.0) * sin(vUv.y * 100.0));
        
        // Atmosphere / Rim light
        float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
        vec3 atmosphere = uColor * intensity;

        // Cursor Glow
        float dist = distance(vPosition, mousePos);
        float glow = exp(-dist * 4.0) * 0.8;
        
        vec3 color = mix(vec3(0.02), uColor, dots * 0.3);
        color += atmosphere * 0.5;
        color += uColor * glow;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true,
  }), []);

  useFrame((state) => {
    material.uniforms.time.value = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  const handlePointerMove = (e) => {
    e.stopPropagation();
    const point = e.point.clone();
    meshRef.current.worldToLocal(point);
    material.uniforms.mousePos.value.copy(point);
    
    // Convert 3D point to Lat/Long
    const radius = 5;
    const lat = Math.asin(point.y / radius) * (180 / Math.PI);
    const lon = Math.atan2(point.x, point.z) * (180 / Math.PI);
    
    // Find nearest city
    let nearest = null;
    let minDist = Infinity;
    
    MAJOR_CITIES.forEach(city => {
      const d = Math.sqrt(Math.pow(city.lat - lat, 2) + Math.pow(city.lon - lon, 2));
      if (d < minDist) {
        minDist = d;
        nearest = city;
      }
    });

    if (minDist < 15) { // Snapping threshold
      onHover(nearest, e.clientX, e.clientY);
    } else {
      onHover(null);
    }
  };

  return (
    <group>
      <Sphere 
        ref={meshRef} 
        args={[5, 128, 128]} 
        onPointerMove={handlePointerMove}
        onPointerOut={() => onHover(null)}
      >
        <primitive object={material} attach="material" />
      </Sphere>
      
      {/* Outer Atmosphere Glow */}
      <Sphere args={[5.2, 64, 64]}>
        <meshBasicMaterial 
          color="#0066FF" 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide} 
        />
      </Sphere>
    </group>
  );
};

export default function AtmosphericGlobe() {
  const [locationData, setLocationData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      setWeather(res.data.current_weather);
    } catch (err) {
      console.error('Weather fetch error', err);
    }
  };

  const handleHover = (city, x, y) => {
    if (city && city.name !== locationData?.name) {
      setLocationData(city);
      setMousePos({ x, y });
      fetchWeather(city.lat, city.lon);
    } else if (!city) {
      setLocationData(null);
    }
  };

  const getLocalTime = (offset) => {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[80vh] bg-black overflow-hidden flex flex-col items-center justify-center pt-20"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Headline Overlay */}
      <div className="relative z-20 text-center mb-12 px-4 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
        >
          Building Your Vision. <br />
          <span className="text-blue-500">Seamlessly.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/60 text-sm md:text-base max-w-xl mx-auto"
        >
          High-performance tactical digital solutions delivered across 
          the global frontier — anywhere your business needs to grow.
        </motion.p>
      </div>

      <div className="relative w-full h-[600px] mt-[-100px] min-h-[500px]">
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AtmosphericSphere onHover={handleHover} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            rotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Canvas>

        {/* Location Popup */}
        <AnimatePresence>
          {locationData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              style={{ 
                left: window.innerWidth < 768 ? '50%' : mousePos.x + 20, 
                top: window.innerWidth < 768 ? 'auto' : mousePos.y - 120,
                bottom: window.innerWidth < 768 ? '10%' : 'auto',
                translateX: window.innerWidth < 768 ? '-50%' : 0
              }}
              className="fixed z-50 glass-panel p-4 rounded-2xl border border-white/10 shadow-2xl min-w-[180px] pointer-events-none"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-mono">Location Discovered</span>
                <h3 className="text-xl font-bold text-white">{locationData.name}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-white/50 font-mono">
                  <span>{getLocalTime(locationData.tz)}</span>
                  {weather && (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      {weather.temperature}°C
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white/5 backdrop-blur-md border-r border-b border-white/10 transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final CTA Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-30 pb-20"
      >
        <a 
          href="mailto:dey.mayank567@gmail.com" 
          className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold overflow-hidden transition-all hover:pr-12"
        >
          <span className="relative z-10">Get In Touch</span>
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white transition-all group-hover:scale-110">
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
        </a>
      </motion.div>
    </section>
  );
}
