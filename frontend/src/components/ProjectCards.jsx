import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import ProjectTechCubes from './ProjectTechCubes'

const OrbVisual = ({ type }) => {
  const orbColors = {
    'orb-blue': 'from-blue-600/40 to-blue-900/60',
    'orb-purple': 'from-purple-600/40 to-purple-900/60',
    'orb-cyan': 'from-cyan-600/40 to-blue-900/60'
  }

  const glowColors = {
    'orb-blue': 'rgba(59, 130, 246, 0.5)',
    'orb-purple': 'rgba(168, 85, 247, 0.5)',
    'orb-cyan': 'rgba(0, 247, 255, 0.5)'
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black/40">
      <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${orbColors[type] || orbColors['orb-blue']} opacity-60 blur-2xl animate-pulse`} />
      <div className={`absolute w-28 h-28 rounded-full bg-gradient-to-br ${orbColors[type] || orbColors['orb-blue']} border border-white/5`} 
           style={{
             boxShadow: `0 0 40px ${glowColors[type] || glowColors['orb-blue']}, inset 0 0 20px rgba(255, 255, 255, 0.1)`
           }} />
      <div className="absolute w-28 h-28 rounded-full border border-white/10 opacity-20" />
    </div>
  )
}

export const ProjectCards = () => {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: 'SecureScan Pro', 
      imagePlaceholder: 'orb-blue', 
      category: 'Automated Web Application Vulnerability Scanner',
      splineUrl: 'https://prod.spline.design/CVAJTOdIz-o93tKW/scene.splinecode',
      techStack: [
        { name: 'PYTHON', color: '#3776AB', pos: [-2, 0, 0] },
        { name: 'REACT', color: '#61DAFB', pos: [0, 0, 0] },
        { name: 'THREE.JS', color: '#ffffff', pos: [2, 0, 0] }
      ]
    },
    { 
      id: 2, 
      title: 'Narrative Flow', 
      imagePlaceholder: 'orb-purple', 
      category: 'AI- Co-writing Platform',
      techStack: [
        { name: 'NODE', color: '#339933', pos: [-2, 0, 0] },
        { name: 'REDIS', color: '#DC382D', pos: [0, 0, 0] },
        { name: 'AWS', color: '#FF9900', pos: [2, 0, 0] }
      ]
    },
    { 
      id: 3, 
      title: 'TribalBridge', 
      imagePlaceholder: 'orb-cyan', 
      category: 'IMMERSIVE',
      techStack: [
        { name: 'UNITY', color: '#ffffff', pos: [-2, 0, 0] },
        { name: 'THREE.JS', color: '#ffffff', pos: [0, 0, 0] },
        { name: 'C#', color: '#178600', pos: [2, 0, 0] }
      ]
    }
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      try {
        setLoading(true)
        const response = await axios.get('/api/projects', { signal: controller.signal })
        setProjects(response.data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        clearTimeout(timeoutId);
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    // Surgical removal of the Spline watermark from all spline-viewers in this section
    const checkShadowRoot = setInterval(() => {
      const viewers = document.querySelectorAll('spline-viewer');
      viewers.forEach(viewer => {
        if (viewer && viewer.shadowRoot) {
          const logo = viewer.shadowRoot.querySelector('#logo');
          if (logo) {
            logo.style.display = 'none';
          }
        }
      });
    }, 100);

    return () => clearInterval(checkShadowRoot);
  }, []);

  if (loading) {
    return <div className="h-64 flex items-center justify-center text-white/20 font-mono tracking-widest uppercase text-xs">Initializing...</div>
  }

  return (
    <motion.section
      className="relative py-48 px-12 z-20"
      id="projects"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        <div className="mb-16">
          <h2 className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-mono mb-4">Selected Works</h2>
          <div className="w-12 h-px bg-white/10" />
        </div>

        <div className="flex flex-col gap-48 w-full">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`group relative w-full md:w-[600px] flex flex-col min-h-[600px] cursor-pointer ${
                index % 2 === 0 ? 'self-start' : 'self-end'
              }`}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.5, ease: "easeOut" } }}
            >
              {/* Behind-the-Box Backlight Glow */}
              <div className="absolute inset-[-40px] bg-purple-600/20 blur-[120px] rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms] pointer-events-none" />

              {/* Animated Floating Background Glow */}
              <div className={`absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-br ${
                project.imagePlaceholder === 'orb-purple' ? 'from-purple-600/20' : 
                project.imagePlaceholder === 'orb-cyan' ? 'from-cyan-600/20' : 'from-blue-600/20'
              } to-transparent blur-[120px] rounded-full z-0 pointer-events-none animate-breathing-glow`} />

              <div className="glass-panel relative z-10 w-full h-[400px] overflow-hidden flex flex-col rounded-2xl border border-white/5 shadow-2xl">
                <div className="absolute inset-0 z-0 opacity-100 transition-opacity duration-1000">
                  {project.splineUrl ? (
                    <div className="absolute inset-0 w-full h-full transform scale-[0.45] -translate-x-[32%] -translate-y-[18%] group-hover:scale-[0.48] transition-transform duration-[2000ms] ease-out pointer-events-none flex items-center justify-center">
                      <spline-viewer 
                        url={project.splineUrl} 
                        events-target="global" 
                        style={{ width: '100%', height: '100%', filter: 'brightness(1.6) contrast(1.1)' }} 
                        hint="none" 
                        loading="lazy" 
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-1000">
                      <OrbVisual type={project.imagePlaceholder} />
                    </div>
                  )}
                </div>
                
                {/* Card Content Overlay */}
                <div className="relative z-10 p-12 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent flex-grow">
                  <span className="text-white/40 text-[10px] tracking-[0.6em] font-mono mb-3 uppercase">
                    {project.category || 'PROJECT'}
                  </span>
                  <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tighter mb-6 group-hover:text-purple-400 transition-colors duration-500">
                    {project.title}
                  </h3>
                  
                  <div className="mb-4">
                    <button className="text-white/60 text-xs tracking-[0.4em] uppercase font-bold hover:text-white transition-colors">
                      Explore Concept →
                    </button>
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_25px_rgba(168,85,247,0.8)]" />
              </div>

              {/* 3D Tech Signature - Resided UNDER the box */}
              <div className="w-full relative z-30 mt-12 pointer-events-auto">
                <div className="text-[10px] tracking-[0.5em] font-mono text-purple-400 mb-4 uppercase opacity-50 pl-4 border-l-2 border-purple-500/30">
                  Tech Architecture
                </div>
                <ProjectTechCubes techs={project.techStack} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default ProjectCards
