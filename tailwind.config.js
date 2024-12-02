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
      keyframes: {
        gradientSlide: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        gradientSlide: "gradientSlide 5s linear infinite",
      },
      backgroundSize: {
        "gradient-size": "500%", // Ensures gradient can slide properly
      },
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
