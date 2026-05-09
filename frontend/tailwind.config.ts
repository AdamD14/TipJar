import type { Config } from "tailwindcss";

/**
 * TipJar+ Tailwind Config
 *
 * Colors are mapped 1:1 to the design system tokens from .docs/system.md.
 * The @theme block in globals.css registers them for Tailwind v4 utilities,
 * this file provides the v3-compatible extend for tooling that reads it.
 *
 * Naming convention matches CSS custom properties:
 *   teal-800  → var(--teal-800)  → #003737  → bg-teal-800
 *   gold-400  → var(--gold-400)  → #FFD700  → text-gold-400
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
        /* ── Primitive: Teal (Primary Base) ── */
        teal: {
          50:  "#e0f2f2",
          100: "#b3d9d9",
          200: "#80bfbf",
          300: "#4da6a6",
          400: "#268c8c",
          500: "#007373",
          600: "#005959",
          700: "#004545",
          800: "#003737",
          900: "#001f1f",
        },

        /* ── Primitive: Gold (Primary Action) ── */
        gold: {
          100: "#fff9c4",
          200: "#fff176",
          300: "#ffea00",
          400: "#ffd700",
          500: "#ffc107",
          600: "#ffab00",
          700: "#ff8f00",
        },

        /* ── Primitive: Purple (Secondary Accent) ── */
        purple: {
          100: "#e0b3ff",
          200: "#c27aff",
          300: "#9d4edd",
          400: "#7b2cbf",
          500: "#5a189a",
        },

        /* ── Validation ── */
        error: {
          light: "#ffb4ab",
          base:  "#ff5252",
          dark:  "#3d1010",
        },
        success: {
          light: "#69f0ae",
          base:  "#00e676",
          dark:  "#004d26",
        },
        warning: {
          base: "#ff9100",
        },
        info: {
          base: "#66d9e8",
        },

        /* ── Semantic surface aliases ── */
        surface: {
          app:      "#001f1f",
          base:     "#003737",
          elevated: "#004545",
          modal:    "#003737",
        },

        /* ── Semantic text aliases ── */
        "text-ds": {
          primary:   "#ffffff",
          secondary: "#d6ebeb",
          tertiary:  "#5c7a7a",
        },

        /* ── Toast accent colours ── */
        toast: {
          success: "#34d399",
          error:   "#f43f5e",
          info:    "#a78bfa",
          warning: "#fbbf24",
        },
      },

      fontFamily: {
        heading: ["var(--font-heading-var)", "MuktaMalar", "sans-serif"],
        body:    ["var(--font-body-var)",    "IBMPlexSans", "sans-serif"],
        /* kept for backward compat — maps to heading font */
        sans: ["var(--font-heading-var)", "MuktaMalar", "system-ui", "sans-serif"],
        ui:   ["var(--font-body-var)",    "IBMPlexSans", "system-ui", "sans-serif"],
      },

      borderRadius: {
        sm:   "6px",
        md:   "8px",
        lg:   "12px",
        xl:   "16px",
        "2xl": "20px",
      },

      boxShadow: {
        1:     "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
        2:     "0 10px 25px -5px rgba(0, 0, 0, 0.6)",
        modal: "0 24px 48px -12px rgba(0, 0, 0, 0.7)",
        "gold-glow": "0 0 10px rgba(255, 215, 0, 0.25)",
      },

      zIndex: {
        base:     "0",
        elevated: "10",
        dropdown: "100",
        fab:      "200",
        backdrop: "500",
        modal:    "1000",
        tooltip:  "1500",
        toast:    "9999",
      },

      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        enter:    "cubic-bezier(0.16, 1, 0.3, 1)",
        spring:   "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },

      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "toast-slide-desktop": {
          from: { transform: "translateX(calc(100% + 24px))", opacity: "0" },
          to:   { transform: "translateX(0)", opacity: "1" },
        },
        "toast-slide-mobile": {
          from: { transform: "translateY(-120%)", opacity: "0" },
          to:   { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-12px) scale(0.98)" },
          to:   { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        dash: {
          "0%":   { strokeDasharray: "1, 150", strokeDashoffset: "0" },
          "50%":  { strokeDasharray: "90, 150", strokeDashoffset: "-35" },
          "100%": { strokeDasharray: "90, 150", strokeDashoffset: "-124" },
        },
        sheen: {
          "0%":   { transform: "translateX(-120%) skewX(-15deg)" },
          "100%": { transform: "translateX(220%) skewX(-15deg)" },
        },
      },

      animation: {
        shimmer:              "shimmer 1.5s linear infinite",
        "toast-desktop":      "toast-slide-desktop 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "toast-mobile":       "toast-slide-mobile 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "fade-in":            "fade-in 200ms ease-out both",
        "slide-down":         "slide-down 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "spin-slow":          "spin 2s linear infinite",
        dash:                 "dash 1.5s ease-in-out infinite",
        sheen:                "sheen 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
