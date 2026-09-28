/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmAmber: {
          DEFAULT: '#e0a84e',
          50: '#fbf7ee',
          100: '#f5edd4',
          200: '#edd8a9',
          300: '#e3be75',
          400: '#e0a84e',
          500: '#cb8b30',
          600: '#ad6d25',
          700: '#894f20',
          800: '#71401f',
          900: '#5f361d',
        },
        softTeal: {
          DEFAULT: '#14b8a6',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        warmCream: {
          DEFAULT: '#fdfbf7',
          50: '#ffffff',
          100: '#fdfbf7',
          200: '#f9f4ea',
          300: '#f2e8d3',
          400: '#e7d4b2',
        },
        slateDark: '#1e293b',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 4px 20px -2px rgba(224, 168, 78, 0.08), 0 2px 8px -1px rgba(20, 184, 166, 0.06)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.25)',
        'glow-amber': '0 0 20px rgba(224, 168, 78, 0.25)',
      }
    },
  },
  plugins: [],
}
