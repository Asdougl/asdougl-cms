const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#181f2c',
        accent: colors.slate['800'],
        "accent-hover": colors.slate['700'],
        primary: colors.blue,
        secondary: colors.violet,
        error: colors.rose,
        success: colors.emerald,
        standard: colors.slate,
      },
    },
    fontFamily: {
      body: '"Roboto", sans-serif',
      display: '"Rubik", sans-serif',
      mono: '"Source Code Pro", monospace',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
