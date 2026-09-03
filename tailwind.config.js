/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        parchment: {
          50: '#faf8f4',
          100: '#f2ece0',
          200: '#ecdfc0',
        },
        survey: {
          600: '#3d6b7a',
          500: '#4b7a8a',
          400: '#6b98a6',
        },
        ink: {
          900: '#0f1a2b',
          800: '#152238',
          700: '#243449',
        },
        earth: {
          700: '#5b3a1e',
          600: '#7a5230',
          500: '#a07044',
          400: '#c19064',
        },
        brass: {
          600: '#a8802a',
          500: '#c89b3a',
          400: '#e0b558',
          300: '#eccb84',
        },
      },
      boxShadow: {
        'inset-parchment': 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
