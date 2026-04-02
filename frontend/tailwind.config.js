/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0f172a',
        'space-purple': '#1e1b4b'
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 255, 255, 0.7)'
      },
      textShadow: {
        glow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-glow': {
          textShadow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)'
        },
        '.text-glow-lg': {
          textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6)'
        }
      })
    }
  ]
}
