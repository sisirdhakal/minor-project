/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg_3: '732px',
      lg_2: '832px',
      lg_1: '932px',
      lg: '1024px',
      xl_1: '1132px',
      xl: '1280px',
      '2xl': '1530px',
    },
    extend: {
      colors: {
        'primary-text': '#023E8A',
        'secondary-text': '#0096C7',
        background: '#CAF0F8',
        button: '#2091F9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('@headlessui/tailwindcss'),
  ],
}
