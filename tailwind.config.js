/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf8',
          100: '#dcfce8',
          500: '#00694E',
          600: '#005a42',
          700: '#004d36',
          800: '#00402b',
          900: '#003320'
        },
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#1A237E',
          600: '#1565c0',
          700: '#1976d2',
          800: '#1e88e5',
          900: '#2196f3'
        },
        surface: '#F8F9FA'
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
}