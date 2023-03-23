const { lighten } = require('polished')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackLight: lighten(.1, 'black'),
        teal: '#23485f',
        tealLight: lighten(.1, '#23485f')
      }
    },
  },
  plugins: [],
}
