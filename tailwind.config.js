/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#3730a3',
          800: '#1e1b4b',
          850: '#1a1635',
          900: '#0f0a23',
          950: '#030712',
        },
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0f0a23 0%, #1e1b4b 25%, #3730a3 50%, #4f46e5 75%, #6366f1 100%)',
        'starfield': 'radial-gradient(ellipse at bottom, #1e1b4b 0%, #0f0a23 100%)',
        'glow': 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
        'card-glow': 'linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(15, 10, 35, 0.9) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-strong': '0 0 40px rgba(99, 102, 241, 0.5)',
        'cosmic': '0 4px 20px rgba(30, 27, 75, 0.5), 0 0 40px rgba(99, 102, 241, 0.1)',
        'inner-glow': 'inset 0 2px 10px rgba(99, 102, 241, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'cosmic': ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}