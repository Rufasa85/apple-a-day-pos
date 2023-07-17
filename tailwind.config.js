/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
colors.primary = "#FA8072"
colors.secodary = "#ACD1AF"

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    colors: colors,
    extend: {
    },
    container: {
      padding: "2rem",
      // margin: "2rem"
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
