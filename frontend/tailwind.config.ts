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
        teal: {
          100: '#E6FFFA',
          800: '#1D4044',
          900: '#1A373A',
        },
        yellow: {
          400: '#FBBF24',
          500: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
};

export default config;
