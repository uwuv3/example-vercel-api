module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        10: "0 0 10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
