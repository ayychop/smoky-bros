/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Black, white, red and orange. Everything else on the site is a tint of these.
      colors: {
        charcoal: '#14100E',
        ink: '#0C0908',
        ember: '#C8360A',
        emberGlow: '#ff4d1c',
        chili: '#D92B0B',
        flame: '#FF5A1F',
        sun: '#FF6A13',
        gold: '#FF8A3D',
        cream: '#F7F3EE',
        teal: '#161110',
        ash: '#F5F5F5',
        amber: '#FF8A3D',
        glass: 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        cond: ['"Barlow Condensed"', 'Inter', 'sans-serif'],
        marker: ['"Barlow Condensed"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        sticker: '0 24px 60px -28px rgba(0, 0, 0, 0.75)',
        'sticker-lg': '0 40px 90px -36px rgba(0, 0, 0, 0.85)',
        ember: '0 0 60px -10px rgba(255, 106, 19, 0.45)',
      },
    },
  },
  plugins: [],
}
