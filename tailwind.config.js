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
          950: '#07111e',
          900: '#0b192c',
          850: '#112239',
          800: '#1e3e62',
          700: '#264e7a',
          600: '#35689f',
          100: '#e1e7ef',
          50: '#f0f4f8',
        },
        emergency: {
          low: '#10b981',
          moderate: '#f59e0b',
          high: '#f97316',
          extreme: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
