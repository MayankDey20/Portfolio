import React, { useEffect } from 'react'

export const SplineRobot = () => {
  useEffect(() => {
    // Surgical removal of the Spline watermark
    const checkShadowRoot = setInterval(() => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          logo.style.display = 'none';
          clearInterval(checkShadowRoot);
        }
      }
    }, 100);

    return () => clearInterval(checkShadowRoot);
  }, []);

  return (
    <div className="w-full h-full min-h-[600px] md:min-h-[800px] relative flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <spline-viewer 
          url="https://prod.spline.design/R8aMAOzj6VxJP5Jb/scene.splinecode"
          loading="lazy"
          events-target="global"
        />
      </div>
      
      {/* Decorative Glow behind the robot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  )
}

export default SplineRobot

