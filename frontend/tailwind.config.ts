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
        // Brand
        "brand-dark": "#003737",
        "brand-gold": "#FFD700",
        "brand-purple": "#4D194D",

        // Paleta z obrazu / przycisków
        "brand-primary": "#0E2A2D",
        "brand-primary-alt": "#1E3A3D",
        // używana z /60 /70 jako warstwa szkła
        "brand-glass": "#0E2A2D",
        "brand-drop": "#A9B7B9",
        "brand-accent": "#C6A66A",

        // Teksty
        "text-primary": "#DDE0DA",
        "text-secondary": "#BCC1B6",
      },
        
    fontFamily: {
       sans: ["var(--font-body)", "system-ui", "ui-sans-serif", "sans-serif"],
      ui: ["var(--font-ui)", "system-ui", "ui-sans-serif", "sans-serif"],
     },
     keyframes: {
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-15deg)" },
          "100%": { transform: "translateX(220%) skewX(-15deg)" },
        },
      },
      animation: {
        sheen: "sheen 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
