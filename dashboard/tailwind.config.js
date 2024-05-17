/** @type {import('tailwindcss').Config} */
const palette = require('./palette.js');

module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'black': ['Roboto', 'sans-serif'], // Fonte Roboto com peso Black
        'bold': ['Roboto', 'sans-serif'], // Fonte Roboto com peso Bold
        'mediumR': ['Roboto', 'sans-serif'], // Fonte Roboto com peso Medium
        'regular': ['Roboto', 'sans-serif'], // Fonte Roboto com peso Regular
      },
      colors: palette,
      backgroundImage: {
        'balloonBlue': "url('@/assets/dashboard/blue-balloons.png')",
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
  important: true
}

