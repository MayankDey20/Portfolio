import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import ContactSection from './ContactSection'
import Footer from './Footer'
import { FloatingTechIcons } from './FloatingTechIcons'
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
  const [loading, setLoading] = useState(true)
  const [flippedId, setFlippedId] = useState(null)
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: 'SecureScan Pro', 
      imagePlaceholder: 'orb-blue', 
      category: 'Automated Web Application Vulnerability Scanner',
      glowColor: 'blue',
      splineUrl: 'https://prod.spline.design/CVAJTOdIz-o93tKW/scene.splinecode',
      splineConfig: { scale: 0.45, x: -32, y: -18 },
      description: 'SecureScan Pro is an advanced, distributed web vulnerability scanner and threat intelligence platform. It provides organizations and security professionals with a unified dashboard to proactively discover, analyze, and remediate security flaws across their web infrastructure.\n\nBy combining active vulnerability scanning with machine learning-powered threat intelligence and real-time reporting, SecureScan Pro offers a holistic view of an asset\'s security posture.',
      githubUrl: 'https://github.com/MayankDey20/SecureScanPro',
      techStack: [
        { name: 'REACT', color: '#61DAFB' },
        { name: 'FASTAPI', color: '#009688' },
        { name: 'SUPABASE', color: '#3ECF8E' },
        { name: 'POSTGRESQL', color: '#4169E1' },
        { name: 'CELERY', color: '#37814A' },
        { name: 'REDIS', color: '#DC382D' },
        { name: 'WEBSOCKET', color: '#ffffff' },
        { name: 'JWT', color: '#ffffff' },
        { name: 'NUCLEI', color: '#ffffff' }
      ]
    },
      { 
        id: 2, 
        title: 'Narrative Flow', 
        imagePlaceholder: 'orb-purple', 
        category: 'AI- Co-writing Platform',
        glowColor: 'purple',
        splineUrl: 'https://prod.spline.design/QPKs0kpS2CvawGmE/scene.splinecode',
        splineConfig: { scale: 0.45, x: -5, y: -10 },
        description: 'Narrative Flow is an AI-powered story co-writing platform that harmonizes human creativity with large language models. It offers a dynamic environment for novelists and screenwriters to brainstorm, structure, and refine complex narratives in real-time.',
        githubUrl: 'https://github.com/MayankDey20/NarrativeAI',
        techStack: [
          { name: 'NODE', color: '#339933' },
          { name: 'REDIS', color: '#DC382D' },
          { name: 'AWS', color: '#FF9900' },
          { name: 'REACT', color: '#61DAFB' }
        ]
      },
      { 
        id: 3, 
        title: 'TribalBridge', 
        imagePlaceholder: 'orb-cyan', 
        category: 'Multi-Language Translator for Minority Languages',
        glowColor: 'green',
        description: 'TribalBridge is a cross-platform infrastructure layer designed to connect decentralized communities through high-fidelity immersive environments. It serves as a bridge between legacy social systems and the evolving spatial web.',
        githubUrl: 'https://github.com/MayankDey20/TribalBridge',
        techStack: [
          { name: 'UNITY', color: '#ffffff' },
          { name: 'THREE.JS', color: '#ffffff' },
          { name: 'C#', color: '#239120' }
        ]
      }
  ])
  useEffect(() => {
    const fetchProjects = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      try {
        setLoading(true)
        const response = await axios.get('/api/projects', { signal: controller.signal })
        if (response.data && response.data.length > 0) {
          setProjects(response.data)
        }
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
          <h2 className="text-white/80 text-[10px] tracking-[0.6em] uppercase font-mono font-bold mb-4">Selected Works</h2>
          <div className="w-12 h-px bg-white/10" />
        </div>

        <div className="flex flex-col gap-48 w-full">
          {projects.map((project, index) => {
            const isFlipped = flippedId === project.id;
            
            return (
              <div key={project.id} className={`w-full md:w-[600px] ${index % 2 === 0 ? 'self-start' : 'self-end'}`}>
                <motion.div
                  className="group relative w-full flex flex-col min-h-[400px] cursor-pointer"
                  variants={cardVariants}
                  animate={isFlipped ? { rotateY: 180 } : { rotateY: 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Behind-the-Box Backlight Glow */}
                  <div className={`absolute inset-[-40px] blur-[120px] rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms] pointer-events-none ${
                    project.glowColor === 'blue' ? 'bg-blue-600/20' : 
                    project.glowColor === 'green' ? 'bg-green-600/20' : 
                    'bg-purple-600/20'
                  }`} />

                  {/* FRONT SIDE */}
                  <div 
                    className={`absolute inset-0 w-full h-[400px] transition-all duration-100 ${isFlipped ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'}`} 
                    style={{ backfaceVisibility: 'hidden', zIndex: isFlipped ? 0 : 20 }}
                  >
                    <div className="glass-panel relative z-10 w-full h-full overflow-hidden flex flex-col rounded-2xl border border-white/5 shadow-2xl">
                      <div className="absolute inset-0 z-0 opacity-100 transition-opacity duration-1000">
                        {project.splineUrl ? (
                          <div 
                            className="absolute inset-0 w-full h-full transform group-hover:scale-[0.48] transition-transform duration-[2000ms] ease-out pointer-events-none flex items-center justify-center"
                            style={{ 
                              transform: `scale(${project.splineConfig?.scale || 0.45}) translate(${project.splineConfig?.x || 0}%, ${project.splineConfig?.y || 0}%)` 
                            }}
                          >
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
                        <span className={`text-[10px] tracking-[0.6em] font-mono mb-3 uppercase font-bold ${
                          project.glowColor === 'blue' ? 'text-blue-400/90' : 
                          project.glowColor === 'green' ? 'text-green-400/90' : 
                          'text-purple-400/90'
                        }`}>
                          {project.category || 'PROJECT'}
                        </span>
                        <h3 className={`text-white text-3xl md:text-4xl font-bold tracking-tighter mb-6 transition-colors duration-500 ${
                          project.glowColor === 'blue' ? 'group-hover:text-blue-400' : 
                          project.glowColor === 'green' ? 'group-hover:text-green-400' : 
                          'group-hover:text-purple-400'
                        }`}>
                          {project.title}
                        </h3>
                        
                        <div className="mb-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setFlippedId(project.id);
                            }}
                            className={`text-xs tracking-[0.4em] uppercase font-bold transition-all duration-300 hover:tracking-[0.5em] ${
                            project.glowColor === 'blue' ? 'text-blue-400/80 hover:text-blue-300' : 
                            project.glowColor === 'green' ? 'text-green-400/80 hover:text-green-300' : 
                            'text-purple-400/80 hover:text-purple-300'
                          }`}>
                            Explore Concept →
                          </button>
                        </div>
                      </div>

                      {/* Card Outer Border Shine */}
                      <div className={`absolute inset-0 border transition-colors duration-1000 ${
                        project.glowColor === 'blue' ? 'border-blue-500/10 group-hover:border-blue-500/30' : 
                        project.glowColor === 'green' ? 'border-green-500/10 group-hover:border-green-500/30' : 
                        'border-purple-500/10 group-hover:border-purple-500/30'
                      }`} />
                    </div>
                  </div>

                  {/* BACK SIDE (Briefcase) */}
                  <div 
                    className={`absolute inset-0 w-full h-[400px] transition-all duration-100 ${isFlipped ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} 
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', zIndex: isFlipped ? 20 : 0 }}
                  >
                    <div className={`glass-panel relative z-10 w-full h-full p-12 flex flex-col rounded-2xl border bg-black/40 backdrop-blur-3xl shadow-2xl ${
                      project.glowColor === 'blue' ? 'border-blue-500/30' : 
                      project.glowColor === 'green' ? 'border-green-500/30' : 
                      'border-purple-500/30'
                    }`}>
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h4 className={`text-[10px] tracking-[0.6em] font-mono mb-2 uppercase ${
                            project.glowColor === 'blue' ? 'text-blue-400' : 
                            project.glowColor === 'green' ? 'text-green-400' : 
                            'text-purple-400'
                          }`}>Tech Briefcase</h4>
                          <h3 className="text-white text-2xl font-bold tracking-tight">{project.title}</h3>
                        </div>
                        
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`p-3 rounded-full border transition-all duration-300 ${
                              project.glowColor === 'blue' ? 'border-blue-500/20 hover:bg-blue-500/20 text-blue-400' : 
                              project.glowColor === 'green' ? 'border-green-500/20 hover:bg-green-400/20 text-green-400' : 
                              'border-purple-500/20 hover:bg-purple-500/20 text-purple-400'
                            }`}
                          >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                          </a>
                        )}
                      </div>

                      <div className="flex-grow overflow-auto mb-8 pr-2 custom-scrollbar">
                        <p className="text-white/80 text-sm leading-relaxed font-light font-mono italic">
                          {project.description}
                        </p>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedId(null);
                        }}
                        className={`mt-auto text-[10px] tracking-[0.4em] uppercase font-bold text-white/40 hover:text-white transition-colors py-4 border-t border-white/5 w-full text-center`}
                      >
                        ← Back to Showcase
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* 3D Tech Signature - Resided UNDER the box, decoupled from flip */}
                <div className="w-full relative z-30 mt-4 pointer-events-auto">
                  <div className={`text-[10px] tracking-[0.5em] font-mono mb-4 uppercase font-bold opacity-80 pl-4 border-l-2 ${
                    project.glowColor === 'blue' ? 'text-blue-400 border-blue-500/30' : 
                    project.glowColor === 'green' ? 'text-green-400 border-green-500/30' : 
                    'text-purple-400 border-purple-500/30'
                  }`}>
                    Tech Architecture
                  </div>
                  <FloatingTechIcons techs={project.techStack} themeColor={project.glowColor} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  )
}

export default ProjectCards
