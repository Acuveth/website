/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    fontSize: {
      "8xl": "5rem", // Example for 8xl size (96px)
      "9xl": "8rem", // Example for 9xl size (128px)
    },
    extend: {
      colors: {
        "custom-orange": "#ffb23c",
        "custom-orange-dark-10": "#e69f36",
        "custom-orange-dark-20": "#cc8d30",
        "custom-orange-dark-30": "#b37b29",
      },
    },
  },
  plugins: [],
};
