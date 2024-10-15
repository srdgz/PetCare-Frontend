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
        // Definir colores para el tema claro
        primary: {
          light: "#4ade80",
          DEFAULT: "#16a34a",
          dark: "#166534",
        },
        secondary: {
          light: "#60a5fa",
          DEFAULT: "#3b82f6",
          dark: "#1e3a8a",
        },
        // Definir colores para el tema oscuro
        dark: {
          primary: {
            light: "#8b5cf6",
            DEFAULT: "#7c3aed",
            dark: "#6b21a8",
          },
          secondary: {
            light: "#fbbf24",
            DEFAULT: "#f59e0b",
            dark: "#b45309",
          },
        },
      },
    },
  },
  plugins: [],
};
