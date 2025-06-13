import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tipjar-turquoise': '#2dd4bf',
        'tipjar-turquoise-dark': '#14b8a6',
        'tipjar-turquoise-darker': '#0f766e',
        'tipjar-gold': '#facc15',
        'tipjar-gold-dark': '#ca8a04',
        'tipjar-gray-light': '#f3f4f6',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)'],
        sans: ['var(--font-open-sans)'],
      },
    },
  },
  plugins: [],
};

export default config;
