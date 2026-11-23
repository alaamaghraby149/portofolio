/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            950: '#060A13', // Deepest background
            900: '#0B1325', // Main dark surface
            850: '#0E1A34', // Card dark background
            800: '#132345', // Highlight dark surface
            700: '#1B365D', // Brand Primary (Dark mode)
            600: '#234675',
          },
          blue: {
            DEFAULT: '#005A9C', // Brand Secondary (Dark mode) / Accent (Light mode)
            light: '#0072C6',
            dark: '#004377',
            glow: 'rgba(0, 90, 156, 0.4)',
          },
          cyan: {
            DEFAULT: '#60C1E5', // Brand Accent (Dark mode) / Primary (Light mode)
            light: '#8CE0FC',
            dark: '#3BA4CD',
            glow: 'rgba(96, 193, 229, 0.35)',
            subtle: 'rgba(96, 193, 229, 0.12)',
          },
          light: {
            bg: '#F8FAFC',
            surface: '#FFFFFF',
            card: '#F1F5F9',
            border: '#E2E8F0',
            text: '#0B1325',
            muted: '#64748B',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-x': 'gradient-x 12s ease infinite',
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-1.5deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -3px rgba(96, 193, 229, 0.35)',
        'glow-cyan-lg': '0 0 45px -5px rgba(96, 193, 229, 0.45)',
        'glow-blue': '0 0 25px -3px rgba(0, 90, 156, 0.35)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'glass-card-light': '0 8px 30px 0 rgba(27, 54, 93, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
