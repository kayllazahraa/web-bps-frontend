
/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#1e293b', // slate-800
          hover: '#0f172a', // slate-900
        },
        accent: {
          DEFAULT: '#06b6d4', // cyan-500
          hover: '#0891b2', // cyan-600
        },
      },
    },
  },
  plugins: [],
}