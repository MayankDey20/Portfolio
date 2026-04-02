import React from 'react'
import { motion } from 'framer-motion'

const TimelineItem = ({ date, title, company, description, isLast }) => (
  <div className="relative pl-8 pb-12 group">
    {/* Timeline Line */}
    {!isLast && (
      <div className="absolute left-[11px] top-4 bottom-0 w-[2px] bg-white/5 group-hover:bg-purple-500/30 transition-colors duration-500" />
    )}
    
    {/* Glowing Node */}
    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-black border-2 border-white/10 flex items-center justify-center z-10 group-hover:border-purple-500/50 transition-colors duration-500">
      <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-purple-400 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-all duration-500" />
    </div>

    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col"
    >
      <span className="text-purple-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-2">{date}</span>
      <h4 className="text-white text-xl font-bold tracking-tight mb-1">{title}</h4>
      <span className="text-white/40 text-xs tracking-wider uppercase mb-4">{company}</span>
      <p className="text-white/30 text-sm leading-relaxed max-w-md font-sans">
        {description}
      </p>
    </motion.div>
  </div>
)

export const AboutSection = () => {
  const experiences = [
    {
      date: 'DEC 2025 — PRESENT',
      title: 'AI INTERN',
      company: 'INFOSYS SPRINGBOARD',
      description: 'Designing LLM-based interactive storytelling systems using instruction-tuned models. Building modular React components to visualize LLM outputs, increasing interaction speed by 25%.'
    },
    {
      date: 'JUNE 2025 — JULY 2025',
      title: 'AI INTERN',
      company: 'EDUNET FOUNDATION',
      description: 'Developed an AI-powered image classification system (PyTorch/TensorFlow) reaching 92% accuracy. Optimized data pipelines with NumPy/Pandas, reducing training time by 56%.'
    },
    {
      date: 'JAN 2025 — APRIL 2025',
      title: 'FULL STACK INTERN',
      company: 'EDUNET FOUNDATION',
      description: 'Engineering comprehensive full-stack solutions and integrating robust frontend architectures with scalable backend logic to deliver high-performance web applications.'
    }
  ]

  const pillars = [
    { name: 'CYBERSECURITY', desc: 'Safeguarding digital frontiers with proactive threat intelligence and robust architectural defense.' },
    { name: 'AI', desc: 'Engineering intelligent interfaces and LLM-driven systems that push the boundaries of automation.' },
    { name: 'GAME DESIGN', desc: 'Crafting immersive 3D realities and interactive mechanics for next-generation digital experiences.' }
  ]

  return (
    <section className="relative py-48 px-12 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">
        {/* Narrative Side */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-mono mb-8">Student / Intern</h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="metallic-text text-5xl md:text-8xl font-bold tracking-tighter mb-12 leading-[0.9]"
          >
            ENGINEERING <br/> DIGITAL <br/> REALITIES.
          </motion.h3>
          <div className="flex flex-col gap-8 mt-24">
            <h4 className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-mono border-l-2 border-purple-500/30 pl-4">Interests</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div 
                key={pillar.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-panel p-8 flex flex-col items-start"
              >
                <div className="w-8 h-px bg-purple-500 mb-6" />
                <h4 className="text-white font-mono text-[10px] tracking-[0.6em] uppercase mb-4">{pillar.name}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
            </div>
          </div>
        </div>

        {/* Experience Side */}
        <div className="md:w-[400px] flex flex-col">
          <h2 className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-mono mb-16">Career Timeline</h2>
          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={exp.title} 
                {...exp} 
                isLast={index === experiences.length - 1} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Decorative Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none z-0" />
    </section>
  )
}

export default AboutSection
