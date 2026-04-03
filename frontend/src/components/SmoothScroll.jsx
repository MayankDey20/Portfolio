import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import useMobile from '../hooks/useMobile';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const isMobile = useMobile();

  useEffect(() => {
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1,
      touchMultiplier: 1.5,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isMobile]);

  return <>{children}</>;
};

export default SmoothScroll;
