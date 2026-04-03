import React from 'react';
import { motion } from 'framer-motion';

const techIcons = {
  // Languages & Frameworks
  'PYTHON': 'https://cdn.simpleicons.org/python/3776AB',
  'REACT': 'https://cdn.simpleicons.org/react/61DAFB',
  'FASTAPI': 'https://cdn.simpleicons.org/fastapi/009688',
  'SUPABASE': 'https://cdn.simpleicons.org/supabase/3ECF8E',
  'CELERY': 'https://cdn.simpleicons.org/celery/37814A',
  'REDIS': 'https://cdn.simpleicons.org/redis/DC382D',
  'WEBSOCKET': 'https://cdn.simpleicons.org/socketdotio/ffffff',
  'JWT': 'https://cdn.simpleicons.org/jsonwebtokens/ffffff',
  'NODE': 'https://cdn.simpleicons.org/nodedotjs/339933',
  'AWS': 'https://cdn.simpleicons.org/amazonaws/FF9900',
  'POSTGRESQL': 'https://cdn.simpleicons.org/postgresql/4169E1',
  'UNITY': 'https://cdn.simpleicons.org/unity/ffffff',
  'THREE.JS': 'https://cdn.simpleicons.org/threedotjs/ffffff',
  'C#': 'https://cdn.simpleicons.org/csharp/239120',
  'DOCKER': 'https://cdn.simpleicons.org/docker/2496ED',
  'TYPESCRIPT': 'https://cdn.simpleicons.org/typescript/3178C6',
  'NEXT.JS': 'https://cdn.simpleicons.org/nextdotjs/ffffff',
  'CHROMADB': 'https://cdn.simpleicons.org/googlecloud/ffffff', // Fallback to a cloud-like icon if chroma isn't on simpleicons yet
  'OLLAMA': 'https://cdn.simpleicons.org/ollama/ffffff',
  'TIPTAP': 'https://cdn.simpleicons.org/probot/ffffff', // Using a generic automation icon for TipTap
};

const FloatingIcon = ({ name, color, delay }) => {
  const iconUrl = techIcons[name.toUpperCase()] || `https://cdn.simpleicons.org/react/${color.replace('#', '')}`;
  
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [-4, 4, -4],
        opacity: 1
      }}
      transition={{
        y: {
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        },
        opacity: { duration: 0.8, delay: delay * 0.5 }
      }}
      whileHover={{ 
        scale: 1.2, 
        y: -10,
        transition: { duration: 0.2 } 
      }}
      className="relative group cursor-help"
    >
      <div className="absolute inset-0 bg-white/5 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative glass-panel-sm p-3 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md overflow-hidden group-hover:border-white/20 transition-all duration-300">
        <img 
          src={iconUrl} 
          alt={name} 
          className="w-5 h-5 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" 
        />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl"
          style={{ backgroundColor: color }}
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform group-hover:-translate-y-2">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md text-[8px] font-mono tracking-widest uppercase text-white whitespace-nowrap shadow-xl">
          {name}
        </div>
      </div>
    </motion.div>
  );
};

export const FloatingTechIcons = ({ techs, themeColor }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {techs.map((tech, i) => (
        <FloatingIcon 
          key={tech.name} 
          name={tech.name} 
          color={tech.color} 
          delay={i * 0.1} 
        />
      ))}
    </div>
  );
};
