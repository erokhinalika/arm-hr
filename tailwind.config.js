/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          soft: 'rgb(var(--color-primary-soft) / <alpha-value>)',
          dark: '#818cf8', // Indigo 400 — lighter accent for dark mode text
        },
        secondary: {
          DEFAULT: '#475569', // Slate 600
          soft: '#f1f5f9',
          dark: '#94a3b8',
        },
        surface: {
          DEFAULT: '#f8fafc', // Slate 50
          hover: '#f1f5f9',
        },
        border: {
          DEFAULT: '#e2e8f0',
          dark: '#334155',
        },
        text: {
          DEFAULT: '#0f172a', // Slate 900
          muted: '#64748b', // Slate 500
        },
      },
      fontSize: {
        'row': '13px',
        'label': '11px',
        'secondary': '12px',
      },
    },
  },
  plugins: [],
}
