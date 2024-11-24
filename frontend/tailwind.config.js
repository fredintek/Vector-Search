/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4b6bfb",
        secondary: "#e5e7eb",
        accent: "#f59e0b",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
