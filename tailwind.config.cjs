/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        cyan: {
          300: 'var(--cyan-300)',
          500: 'var(--cyan-500)'
        },
        blue: {
          400: 'var(--blue-400)'
        },
        violet: {
          400: 'var(--violet-400)'
        },
        pink: {
          400: 'var(--pink-400)'
        },
        emerald: {
          400: 'var(--emerald-400)'
        }
      }
    }
  },
  plugins: []
}
