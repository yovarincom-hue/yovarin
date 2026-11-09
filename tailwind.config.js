/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        gold: {
          50: '#fdfbf7',
          100: '#f9f4e8',
          200: '#f2e6cb',
          300: '#e7d1a2',
          400: '#d9b671',
          500: '#c59b4c', // Signature Luxury Champagne Gold
          600: '#a97f3b',
          700: '#86602e',
          800: '#6e4d29',
          900: '#5c3f25',
          950: '#342111',
        },
        obsidian: {
          800: '#151a24',
          850: '#0f141f',
          900: '#0a0d14',
          950: '#04060a',
        },
        ivory: {
          50: '#fdfdfc',
          100: '#faf8f5',
          200: '#f4f0e8',
          300: '#eae2d3',
          400: '#dbcdb5',
          500: '#c7b494',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gold-shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
