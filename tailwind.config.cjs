/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "eyecatcher": ["Lilita One"],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
