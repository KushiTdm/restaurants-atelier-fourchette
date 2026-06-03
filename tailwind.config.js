/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fdf4f0',
          100: '#fae5db',
          200: '#f5cab6',
          300: '#eda98a',
          400: '#e3825c',
          500: '#c4603a',
          600: '#b04e2c',
          700: '#923d24',
          800: '#773223',
          900: '#632b20',
        },
        cream: {
          50: '#fdfcf8',
          100: '#faf7f0',
          200: '#f5f0e4',
          300: '#ede5d4',
          400: '#ddd4bc',
          500: '#c8bca0',
        },
        forest: {
          500: '#5b6b4e',
          600: '#4a5940',
          700: '#3a4632',
        },
        bark: {
          900: '#2c2416',
          800: '#3d3222',
          700: '#554535',
          600: '#6e5a46',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
};
