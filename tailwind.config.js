/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
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

        /* darkest grey - used for headings */
        clrgrey1: "#102a42",
        clrgrey2: "#243a52",
        clrgrey3: "#324d67",
        clrgrey4: "#48647f",
        /* grey used for paragraphs */
        clrgrey5: "#617d98",
        clrgrey6: "#829ab0",
        clrgrey7: "#9eb2c7",
        clrgrey8: "#bcccdc",
        clrgrey9: "#dae2ec",
        clrgrey10: "#f1f5f8",
        clrreddark: "#ba2626",
        clrredlight: "#e66b6b",
        clrgreendark: "#25bb32",
        clrgreenlight: "#6be675",
        clrblack: "#222",

        /* notice buttons */
        notice: "#0096C7"

      },
      gridTemplateRows: {
        "auto": "80px 1fr",
        "rowauto": "auto 1fr"
      },
      gridTemplateColumns: {
        "auto": "1fr auto",
        "autofirst": "auto 1fr",
        "marksTop": "160px 268px auto auto auto auto",
        "marksBottom": "160px 280px 1fr"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('@headlessui/tailwindcss'),
    require('flowbite/plugin')
  ],
}
