/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        mist: "#f6f7f9",
        ink: "#20242b",
        sage: "#8bb9a8",
        coral: "#ef8f7a",
        butter: "#f2cf72",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(31, 41, 55, 0.10)",
        glow: "0 16px 45px rgba(139, 185, 168, 0.28)",
      },
    },
  },
  plugins: [],
}
