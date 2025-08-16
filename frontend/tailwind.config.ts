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

        // Teksty
        "text-primary": "#DDE0DA",
        "text-secondary": "#BCC1B6",
      },
      fontFamily: {
        sans: ["var(--font-body)"], // Mukta (tekst)
        ui: ["var(--font-ui)"],     // IBM Plex Sans (UI)
      },
    },
  },
  plugins: [],
};

export default config;
