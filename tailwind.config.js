/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this according to your file paths
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#1E40AF',
        customYellow: '#F59E0B',
      },
      spacing: {
        'extra-large': '48px',
      },
    },
  },
  plugins: [],
}
