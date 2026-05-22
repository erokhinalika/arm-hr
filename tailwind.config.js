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
          DEFAULT: '#7c3aed', // Royal Violet (Violet 600)
          hover: '#6d28d9', // Deep Violet (Violet 700)
          soft: '#f5f3ff', // Very Light Violet (Violet 50)
          dark: '#a78bfa', // Lighter Violet for dark mode (Violet 400)
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
