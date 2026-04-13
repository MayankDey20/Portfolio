import React from 'react'
import { motion } from 'framer-motion'

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <motion.div
      id="hero"
      className="relative flex flex-col items-center justify-center h-full w-full pointer-events-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Subtle Top Navigation */}
      <motion.nav
        className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-12 pointer-events-auto"
        variants={navVariants}
      >
        <a href="#projects" className="text-white/40 hover:text-white transition-all text-xs tracking-[0.3em] font-mono">
          WORK
        </a>
        <div className="w-8 h-px bg-white/20" />
        <a href="#about" className="text-white/40 hover:text-white transition-all text-xs tracking-[0.3em] font-mono">
          ABOUT
        </a>
      </motion.nav>

      {/* 3D-Styled Metallic Text - repositioned to the left */}
      <div className="relative w-full max-w-7xl px-12 flex flex-col items-start pointer-events-none min-h-screen justify-center pb-32">
        <motion.div variants={textVariants} className="flex flex-col items-start translate-x-2">
          <span className="text-purple-400 text-2xl tracking-[0.4em] font-mono uppercase mb-8 ml-2">Hello, I'm</span>
          <h2 className="metallic-text text-8xl md:text-[12rem] font-bold leading-[0.8] tracking-tighter opacity-90">
            MAYANK
          </h2>
          <div className="flex items-center gap-4 mt-4 mb-2">
            <div className="w-12 h-[2px] bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
            <span className="text-white/30 text-xs tracking-[0.4em] font-mono uppercase">AI Intern</span>
          </div>
        </motion.div>

        <motion.div variants={textVariants} className="flex flex-col items-start mt-8 translate-x-8">
          <h2 className="metallic-text text-8xl md:text-[12rem] font-bold leading-[0.8] tracking-tighter opacity-90">
            DEY
          </h2>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-12 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            <span className="text-white/30 text-xs tracking-[0.4em] font-mono uppercase">Undergrad</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Status Indicator */}
      <motion.div 
        className="absolute bottom-40 flex flex-col items-center gap-4 opacity-40"
        variants={navVariants}
      >
        <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        <span className="text-[10px] tracking-[0.5em] uppercase font-mono">Scroll</span>
      </motion.div>
    </motion.div>
  )
}

export default HeroSection

