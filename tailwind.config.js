/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F3EFE5',
        purple: {
          DEFAULT: '#4d65ff',
          dark: '#230D1E',
        },
        teal: '#346778',
        dark: '#2D2D2D',
        muted: '#6B6B6B',
      },
      fontFamily: {
        serif: ['Bitter', 'serif'],
        sans: ['Figtree', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
