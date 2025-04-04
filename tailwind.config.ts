/** @type {import('tailwindcss').Config} */
import { default as themes } from './src/tailwind';

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: () => (themes),
    },
  },
}