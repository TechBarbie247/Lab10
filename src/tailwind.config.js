/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightpink: "#fcd6e3",
        gold: "#ffd700",
        brown: "#8b5e3c",
        taupe: "#d8b4a0",
      },
    },
  },
  plugins: [],
};
