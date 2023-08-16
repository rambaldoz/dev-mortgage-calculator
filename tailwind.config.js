/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontFamily: {
      'sans': ['Rubik', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      accent: {
        50: '#e9f0ff',
        100: '#2e62d4',
        200: '#2a5bc5'
      },
      dark: {
        100: '#1d1d1d',
      },
      gray: {
        100: '#dfdfdf',
      },
      light: {
        100: '#ffffff'
      },
      warning: {
        100: '#c1292e',
        20: '#f3d4d5'
      }
    }
  },
  plugins: [],
}

