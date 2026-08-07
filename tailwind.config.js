/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

