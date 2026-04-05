import React, { useState } from 'react'
import { motion } from 'framer-motion'

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  return (
    <section className="relative py-48 px-12 z-20" id="contact">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-32 items-center">
        {/* Contact Narrative */}
        <div className="flex-1">
          <h2 className="text-white/80 text-[10px] tracking-[0.6em] uppercase font-mono font-bold mb-8">Interaction / Gateway</h2>
          <h3 className="metallic-text text-5xl md:text-8xl font-bold tracking-tighter mb-12 leading-[0.9]">
            INITIATE <br /> CONNECTION.
          </h3>
          <p className="text-white/40 text-lg font-mono tracking-wider mb-16 leading-relaxed max-w-md">
            The architect is ready for your inquiry. Reach out for consultations, collaborations, or large-scale digital architecture.
          </p>

          <div className="flex flex-wrap gap-8 items-center mt-auto">
            {/* Download Resume Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-black font-bold text-xs tracking-[0.4em] uppercase rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300"
              onClick={() => alert('Initiating Resume Download...')}
            >
              Download Resume
            </motion.button>

            <div className="flex gap-12 ml-4">
              <a
                href="https://github.com/MayankDey20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/20 hover:text-white transition-all duration-500 flex flex-col items-center group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mb-2 w-6 h-6">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <div className="w-8 h-[2px] bg-white/5 group-hover:bg-purple-500/50 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/mayank-dey-493539251/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/20 hover:text-white transition-all duration-500 flex flex-col items-center group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mb-2 w-6 h-6">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <div className="w-8 h-[2px] bg-white/5 group-hover:bg-blue-500/50 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-panel p-12 relative overflow-hidden"
          >
            {/* Input Overlay Glow effect on Focus */}
            <div className="flex flex-col gap-10">
              <div className="group">
                <label className="text-white/70 text-[10px] tracking-[0.6em] uppercase font-mono font-bold mb-3 block">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all duration-300 font-mono text-sm"
                  placeholder="Your Name"
                />
              </div>

              <div className="group">
                <label className="text-white/70 text-[10px] tracking-[0.6em] uppercase font-mono font-bold mb-3 block">Communication Channel</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-5 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-all duration-300 font-mono text-sm"
                  placeholder="Email@domain.com"
                />
              </div>

              <div className="group">
                <label className="text-white/70 text-[10px] tracking-[0.6em] uppercase font-mono font-bold mb-3 block">Transmission Message</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-5 text-white placeholder-white/10 focus:outline-none focus:border-cyan-500/50 transition-all duration-300 font-mono text-sm h-48 resize-none"
                  placeholder="Enter your message..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 mt-4 border border-purple-500 text-purple-400 font-bold text-xs tracking-[0.6em] uppercase rounded-lg hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Execute Transmission →
              </motion.button>
            </div>

            {/* Background scanner line effect? Or just subtle gradient */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 opacity-20 pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Decorative Glow behind the form */}
      <div className="absolute left-[30%] -bottom-24 w-[800px] h-[800px] bg-blue-600/5 blur-[200px] rounded-full pointer-events-none z-0" />
    </section>
  )
}

export default ContactSection
