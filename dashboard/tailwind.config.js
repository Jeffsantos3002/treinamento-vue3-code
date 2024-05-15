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
        'medium': ['Roboto', 'sans-serif'], // Fonte Roboto com peso Medium
        'regular': ['Roboto', 'sans-serif'], // Fonte Roboto com peso Regular
      },
      colors: palette,
  },
  },
  plugins: [],
}

