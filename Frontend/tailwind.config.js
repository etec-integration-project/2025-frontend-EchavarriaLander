/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        piraflix: {
          gold: '#FFD700', // dorado principal
          goldDark: '#B8860B', // dorado oscuro
          red: '#C0392B', // rojo cálido
          redLight: '#E74C3C', // rojo claro
          black: '#181818', // fondo principal
          gray: '#23272A', // gris oscuro para fondos
          accent: '#FFF8DC', // acento claro (casi crema)
        },
      },
    },
  },
  plugins: [],
}
