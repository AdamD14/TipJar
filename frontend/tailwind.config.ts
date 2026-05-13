import type { Config } from "tailwindcss";

/**
 * TipJar+ Tailwind Config
 *
 * Colors are mapped 1:1 to the design system tokens from design.md.
 * The @theme block in globals.css registers them for Tailwind v4 utilities,
 * this file provides the v3-compatible extend for tooling that reads it.
 *
 * Naming convention matches CSS custom properties:
 * teal-800 → var(--teal-800) → #003737 → bg-teal-800
 * gold-400 → var(--gold-400) → #FFD700 → text-gold-400
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Primitive: Teal (Primary Base) — design.md §1.1 ── */
        teal: {
          25: "#E0F2F2",
          50: "#CCF7F4",
          100: "#ABE1E1",
          200: "#76CBCB",
          300: "#3FB5B5",
          400: "#2A8A8A",
          450: "#0F7F7F",
          500: "#007373",
          600: "#005959",
          700: "#004545",
          800: "#003737",
          850: "#002121",
          900: "#001F1F",
        },

        /* ── Primitive: Gold (Primary Action) — design.md §1.1 ── */
        gold: {
          50: "#FEFFE0",
          100: "#FAFF46",
          200: "#FFEA00",
          300: "#FFE100",
          400: "#FFD700",
          500: "#FFC312",
          600: "#FFAB00",
          700: "#FF8F00",
          800: "#F08010",
          900: "#CC7A06",
        },

        /* ── Primitive: Purple (Secondary Accent) — design.md §1.1 ── */
        purple: {
          100: "#661B66",
          200: "#5C005C",
          300: "#4D194D",
          400: "#3A143A",
          500: "#2F0D2F",
        },

        /* ── Validation — design.md §1.1 ── */
        error: {
          light: "#FFB4AB",
          base: "#FF5252",
          dark: "#3D1010",
        },
        success: {
          light: "#69F0AE",
          base: "#00E676",
          dark: "#004D26",
        },
        warning: {
          base: "#FF9100",
        },
        info: {
          base: "#66D9E8",
        },

        /* ── Semantic surface aliases — design.md §1.2 ── */
        surface: {
          app: "#001F1F",
          base: "#003737",
          elevated: "#004545",
          modal: "#003737",
        },

        /* ── Semantic text aliases — design.md §1.2 ── */
        "text-ds": {
          primary: "#E0F2F2",
          secondary: "#CCF7F4",
          tertiary: "#ABE1E1",
        },

        /* ── Semantic border aliases — design.md §1.2 ── */
        border: {
          subtle: "#004545",
          focus: "#4D194D",
        },

        /* ── Semantic action aliases — design.md §1.2 ── */
        action: {
          "primary-bg": "#FFD700",
          "primary-text": "#001F1F",
          "secondary-bg": "#4D194D",
        },
      },

      fontFamily: {
        heading: ["var(--font-heading-var)", "MuktaMalar", "sans-serif"],
        body: ["var(--font-body-var)", "IBMPlexSans", "sans-serif"],
        sans: ["var(--font-heading-var)", "MuktaMalar", "system-ui", "sans-serif"],
        ui: ["var(--font-body-var)", "IBMPlexSans", "system-ui", "sans-serif"],
      },

      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },

      boxShadow: {
        1: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
        2: "0 10px 25px -5px rgba(0, 0, 0, 0.6)",
        modal: "0 24px 48px -12px rgba(0, 0, 0, 0.7)",
        "gold-glow": "0 0 10px rgba(255, 215, 0, 0.1)",
        "toast": "0 8px 24px -4px rgba(0, 0, 0, 0.6)",
        "tooltip": "0 4px 16px rgba(0, 0, 0, 0.5)",
      },

      zIndex: {
        base: "0",
        elevated: "10",
        dropdown: "100",
        fab: "200",
        backdrop: "500",
        modal: "1000",
        tooltip: "1500",
        toast: "9999",
      },

      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        enter: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },

      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "toast-slide-desktop": {
          from: { transform: "translateX(calc(100% + 24px))", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "toast-slide-mobile": {
          from: { transform: "translateY(-120%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-12px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        dash: {
          "0%": { strokeDasharray: "1, 150", strokeDashoffset: "0" },
          "50%": { strokeDasharray: "90, 150", strokeDashoffset: "-35" },
          "100%": { strokeDasharray: "90, 150", strokeDashoffset: "-124" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-15deg)" },
          "100%": { transform: "translateX(220%) skewX(-15deg)" },
        },
      },

      animation: {
        shimmer: "shimmer 1.5s linear infinite",
        "toast-desktop": "toast-slide-desktop 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "toast-mobile": "toast-slide-mobile 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "fade-in": "fade-in 200ms ease-out both",
        "slide-down": "slide-down 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-up": "slide-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "spin-slow": "spin 2s linear infinite",
        dash: "dash 1.5s ease-in-out infinite",
        sheen: "sheen 1.2s ease-in-out infinite",
      },

      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
};

export default config;
