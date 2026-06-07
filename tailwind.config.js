/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050816',
          900: '#07111f',
          800: '#0c1729',
          700: '#12243f'
        },
        accent: '#39d0ff',
        accentGreen: '#38f0b2'
      },
      boxShadow: {
        glow: '0 0 40px rgba(57, 208, 255, 0.2)'
      }
    }
  },
  plugins: []
};