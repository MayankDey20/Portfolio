import React from 'react'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import TechStack from './components/TechStack'
import SplineRobot from './components/SplineRobot'
import ProjectCards from './components/ProjectCards'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen bg-black font-sans selection:bg-purple-500/30">
      {/* Atmospheric Glows */}
      <div className="glow-overlay w-[600px] h-[600px] bg-purple-600/10 top-[-10%] left-[-10%] fixed" />
      <div className="glow-overlay w-[500px] h-[500px] bg-blue-600/10 bottom-[-10%] right-[-10%] fixed" />
      
      {/* Spline Robot - Hero-only position - shifted further right */}
      <div className="absolute top-0 right-[-10%] w-[60%] h-screen pointer-events-none z-0 flex justify-end items-center">
        <div className="w-full h-full pointer-events-auto flex items-center justify-center">
          <SplineRobot />
        </div>
      </div>
      
      {/* Scrollable Content Layer */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Architectural Narrative & Timeline */}
        <AboutSection />
        
        {/* 3D Tech DNA */}
        <TechStack />
        
        {/* Project Cards (Selected Works) */}
        <ProjectCards />
        
        {/* Contact Gateway */}
        <ContactSection />
        
        {/* Site Footer */}
        <Footer />
      </div>
      </div>
    </SmoothScroll>
  )
}

export default App

