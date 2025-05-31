// TipJar/frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tipjar-turquoise': {
          DEFAULT: '#008080',
          dark: '#006D6D',
          darker: '#004C4C',
          light: '#E0F2F1',
          extralight: '#F0FFFF',
        },
        'tipjar-gold': {
          DEFAULT: '#FFD700',
          dark: '#B8860B',
        },
        'tipjar-gray': {
          light: '#F0F0F0',
          DEFAULT: '#A0A0A0',
          dark: '#606060',
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      animation: {
        'number-roll': 'numberRoll 0.5s ease-out forwards',
        'slide-up-fade': 'slideUpFade 0.3s ease-out forwards',
        'pulse-gold': 'pulseGold 2s infinite ease-in-out',
        'subtle-beat': 'subtleBeat 1.5s infinite ease-in-out',
      },
      keyframes: {
        numberRoll: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 3px #FFD700, 0 0 5px #FFD700' },
          '50%': { boxShadow: '0 0 10px #B8860B, 0 0 15px #B8860B' },
        },
        subtleBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Możesz odkomentować, jeśli będziesz potrzebował
  ],
};
export default config;
