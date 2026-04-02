/**
 * Design Tokens & Color Palette
 * Digital Frontier Portfolio
 */

export const designTokens = {
  // Colors
  colors: {
    background: {
      primary: '#000000',  // True black
      secondary: '#050505', // Near black
      tertiary: '#0a0a0a'   // Dark charcoal
    },
    accent: {
      cyan: '#00f7ff',
      blue: '#3b82f6',
      purple: '#a855f7',
      magenta: '#d946ef'
    },
    metallic: {
      silver: '#e2e8f0',
      steel: '#94a3b8',
      shadow: '#1e293b'
    },
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8', 
      muted: '#475569'
    }
  },

  // Typography
  typography: {
    fontFamily: {
      mono: "'Space Mono', monospace",
      sans: "'Outfit', 'Inter', sans-serif"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem'
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0em',
      wide: '0.05em',
      wider: '0.1em',
      widest: '0.25em'
    }
  },

  // Effects
  effects: {
    glow: {
      sm: '0 0 10px rgba(168, 85, 247, 0.4)',
      md: '0 0 20px rgba(168, 85, 247, 0.5)',
      lg: '0 0 40px rgba(0, 247, 255, 0.4)',
      xl: '0 0 60px rgba(0, 247, 255, 0.6)'
    },
    textGlow: {
      purple: '0 0 10px rgba(168, 85, 247, 0.8), 0 0 20px rgba(168, 85, 247, 0.4)',
      blue: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)',
      cyan: '0 0 10px rgba(0, 247, 255, 0.8), 0 0 20px rgba(0, 247, 255, 0.4)'
    },
    glass: {
      bg: 'rgba(10, 10, 10, 0.7)',
      border: 'rgba(255, 255, 255, 0.05)',
      blur: 'blur(16px)'
    }
  },

  // 3D Settings
  threejs: {
    camera: {
      fov: 75,
      near: 0.1,
      far: 1000,
      position: [0, 0, 10]
    },
    lighting: {
      ambient: {
        intensity: 0.2,
        color: '#ffffff'
      },
      main: {
        position: [5, 5, 5],
        intensity: 2,
        color: '#a855f7'
      },
      rim: {
        position: [-5, -5, 5],
        intensity: 1.5,
        color: '#3b82f6'
      }
    },
    bloom: {
      intensity: 2.2,
      luminanceThreshold: 0.1,
      luminanceSmoothing: 0.9
    }
  }
}

export default designTokens
