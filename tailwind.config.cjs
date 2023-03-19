/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "eyecatcher": ["Lilita One", "cursive"],
        "poppins": ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
