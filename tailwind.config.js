/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0E1829',
        secondary: '#5B7FFF',
        hover: '#0293c4',
        gray: '#EBEDF1',
        black: '#1F1F1F',
        krona: 'Krona',
        },
        fontFamily: {
          sans: ['Krub', 'Montserrat', 'sans-serif'], 
          krona: ['Krona One', 'sans-serif'], 
        },
        fontSize: {
          sm: '0.8rem',
          base: '1rem',
          xl: '1.25rem',
          lg: '1.8rem',
        }
    },
  },
  plugins: [],
}
