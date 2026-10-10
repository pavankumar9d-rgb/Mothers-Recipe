/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-forest': '#1A3026',
        'brand-forest-light': '#264638',
        'brand-forest-dark': '#101F18',
        'spice-red': '#B82E1E',
        'spice-red-hover': '#9B2416',
        'spice-red-light': '#FBF1F0',
        'mustard-gold': '#D4972C',
        'mustard-gold-hover': '#B88020',
        'mustard-gold-light': '#FDF8EE',
        'earth-dark': '#1C1917',
        'earth-muted': '#57534E',
        'bg-ivory': '#FAF7F2',
        'surface-parchment': '#F3EDE2',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
