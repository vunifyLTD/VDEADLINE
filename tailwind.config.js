/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        primary: {
          50: '#e6f3fd',
          100: '#cce6fa',
          200: '#99cef5',
          300: '#66b5f0',
          400: '#339deb',
          500: '#0c87eb',
          600: '#0a6cbd',
          700: '#07518e',
          800: '#05375e',
          900: '#021c2f',
        },
        systems: {
          300: '#93c5fd',
          500: '#3b82f6',
          700: '#1d4ed8',
        },
        quantum: {
          300: '#d8b4fe',
          500: '#a855f7',
          700: '#7e22ce',
        },
        ai: {
          300: '#7dd3fc',
          500: '#0ea5e9',
          700: '#0369a1',
        },
        security: {
          300: '#f9a8d4',
          500: '#ec4899',
          700: '#be185d',
        },
        theory: {
          300: '#fcd34d',
          500: '#f59e0b',
          700: '#b45309',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};