/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EEF4',
          100: '#D1DDE9',
          200: '#A3BBC3',
          300: '#75999D',
          400: '#477771',
          500: '#2B5066',
          600: '#1A3C5E',
          700: '#15324E',
          800: '#10283E',
          900: '#0B1E2E',
        },
        offwhite: {
          DEFAULT: '#F8FAFC',
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
        },
        accent: {
          50: '#FFF4E6',
          100: '#FFE0BF',
          200: '#FFC799',
          300: '#FFAD73',
          400: '#F09447',
          500: '#E87722',
          600: '#D06A1C',
          700: '#B85A16',
          800: '#9F4A10',
          900: '#873B0A',
        },
        dark: {
          50: '#2A2A2A',
          100: '#2F2F2F',
          200: '#2A2A2A',
          300: '#232323',
          400: '#1D1D1D',
          500: '#171717',
          600: '#121212',
          700: '#0E0E0E',
          800: '#0A0A0A',
          900: '#050505',
          DEFAULT: '#1C1C1C',
          light: '#2D2D2D',
          lighter: '#3D3D3D',
        },
        brand: {
          500: '#E87722',
        },
        success: {
          DEFAULT: '#1E7A45',
          light: '#E8F5EC',
        },
        error: {
          DEFAULT: '#C0392B',
          light: '#FDECEA',
        },
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
