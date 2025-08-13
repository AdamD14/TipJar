import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0d2f3f',
        'brand-gold': '#FFD700',
        'brand-light-text': '#b0c4de',
        'tj-turquoise': '#003737',
        'tj-gold': '#FFD700',
        'tj-violet': '#83509F',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        ui: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-ibm)', 'monospace'],
        accent: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
