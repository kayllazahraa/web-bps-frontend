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
        'brand': {
          'primary': '#204A86', // Biru tua 
          'secondary': '#2F65B0', // Biru lebih terang aksen
          'light': '#F8F9FA',   // Latar belakang halaman (off-white)
        },
        'text': {
          'primary': '#212529',   // Abu-abu gelap teks utama
          'secondary': '#6C757D', // Abu-abu teks sekunder
        }
      },
    },
  },
  plugins: [],
}