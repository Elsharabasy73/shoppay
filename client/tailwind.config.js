/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        sigma: {
          blue: "#3F96D2",
          "blue-dark": "#1A3F60",
          "blue-light": "#F2F8FD",
          "blue-lighter": "#DAEBF7",
          dark: "#393F55",
          green: "#34C759",
          gradientFrom: "#1075B8",
          gradientTo: "#002137",
        },
      },
      borderRadius: {
        "3xl": "24px",
        "input": "12px",
      },
      fontFamily: {
        sigma: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

