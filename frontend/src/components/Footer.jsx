import React from 'react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative py-24 px-12 border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start group">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-[2px] bg-white group-hover:w-12 transition-all duration-500" />
            <h3 className="text-white text-xl font-bold tracking-tighter uppercase font-mono">Mayank Dey | AI Intern</h3>
          </div>
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-mono">
            © {currentYear} Digital Frontier. All Protocols Reserved.
          </p>
        </div>
        
        <div className="flex gap-16 items-center">
          <a href="#hero" className="text-white/20 hover:text-white transition-colors duration-500 flex flex-col items-center group">
            <span className="text-[10px] tracking-[0.6em] uppercase font-mono mb-2">Back to Start</span>
            <div className="w-8 h-[2px] bg-white/5 group-hover:bg-white transition-colors" />
          </a>
          
          <div className="text-white/10 text-[10px] tracking-[0.6em] uppercase font-mono hidden md:block">
            Status: Fully Operational
          </div>
        </div>
      </div>
      
      {/* Subtle Background Scanner line */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />
    </footer>
  )
}

export default Footer
