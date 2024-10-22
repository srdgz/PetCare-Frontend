/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        // Colores para el tema claro
        background: "#ffffff",
        text: "#333333",
        primary: "#E692A2",
        secondary: "#A2D2FF",

        // Colores para el tema oscuro (usando 'dark:' para especificar el modo oscuro)
        dark: {
          background: "#0D1F22",
          text: "#ffffff",
          primary: "#F4D35E",
          secondary: "#87BCDE",
        },
      },
    },
  },
  plugins: [],
};
