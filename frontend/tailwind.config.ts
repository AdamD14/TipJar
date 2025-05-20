// TipJar/frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // Ścieżki do plików, w których będziesz używać klas Tailwind.
    // Dla App Routera w Next.js (z folderem src/app/ i src/components/):
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Jeśli używałbyś również folderu 'pages', dodałbyś:
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: { // Sekcja 'extend' pozwala dodać własne wartości bez nadpisywania domyślnych Tailwind
      colors: {
        'tipjar-turquoise': { // Definiujemy naszą paletę 'tipjar-turquoise'
          DEFAULT: '#008080',       // Główny kolor turkusowy, np. className="bg-tipjar-turquoise"
          dark: '#006D6D',        // Ciemniejszy odcień, np. className="bg-tipjar-turquoise-dark"
          darker: '#004C4C',       // Najciemniejszy odcień, np. className="bg-tipjar-turquoise-darker"
          light: '#E0F2F1',       // Bardzo jasny odcień, np. className="bg-tipjar-turquoise-light"
          extralight: '#F0FFFF',   // Prawie biały z nutą turkusu
        },
        'tipjar-gold': { // Definiujemy naszą paletę 'tipjar-gold'
          DEFAULT: '#FFD700',       // Główny kolor złoty, np. className="text-tipjar-gold"
          dark: '#B8860B',        // Ciemniejszy, antyczny złoty, np. className="border-tipjar-gold-dark"
        },
        'tipjar-gray': { // Dodatkowe odcienie szarości dla neutralnych elementów
          light: '#F0F0F0',     // Jasnoszary, np. dla tła niektórych inputów, separatorów
          DEFAULT: '#A0A0A0',   // Średni szary, np. dla mniej ważnego tekstu, placeholderów
          dark: '#606060',      // Ciemnoszary, np. dla drugorzędnego tekstu
        }
      },
      fontFamily: { // Definicja niestandardowych rodzin fontów
        // Aby ich użyć, musisz je zaimportować w swoim projekcie Next.js (np. w pliku layout.tsx)
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      animation: { // Definicje niestandardowych animacji, których można używać jako klas
        'number-roll': 'numberRoll 0.5s ease-out forwards',
        'slide-up-fade': 'slideUpFade 0.3s ease-out forwards',
        'pulse-gold': 'pulseGold 2s infinite ease-in-out',
        'subtle-beat': 'subtleBeat 1.5s infinite ease-in-out', // Np. dla pulsującej obwódki awatara
      },
      keyframes: { // Definicje klatek kluczowych dla powyższych animacji
        numberRoll: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },