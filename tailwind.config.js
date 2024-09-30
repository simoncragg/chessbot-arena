/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
      },
      width: {
        "88": "22rem",
        "vh-minus-300": "calc(100vh - 300px)",
        "vh-minus-350": "calc(100vh - 350px)",
      },
    },
  },
  plugins: [],
}

