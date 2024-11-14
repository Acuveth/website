/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
