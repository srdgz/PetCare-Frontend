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
        primary: "#1C7C54",
        secondary: "#ECC8AF",

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
