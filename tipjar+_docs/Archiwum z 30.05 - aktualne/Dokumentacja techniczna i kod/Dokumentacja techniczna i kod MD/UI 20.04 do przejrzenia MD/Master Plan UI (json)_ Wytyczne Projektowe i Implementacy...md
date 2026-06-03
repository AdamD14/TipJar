{
  "system": {
    "name": "TipJar+ Master Plan UI/UX",
    "version": "2026",
    "type": "Design System & Implementation Specification"
  },
  "1_foundation_and_color_architecture": {
    "primitive_tokens": {
      "primary_teal": {
        "--teal-50": "#E0F2F2",
        "--teal-100": "#B3D9D9",
        "--teal-200": "#80BFBF",
        "--teal-300": "#4DA6A6",
        "--teal-400": "#268C8C",
        "--teal-500": "#007373",
        "--teal-600": "#005959",
        "--teal-700": "#004545",
        "--teal-800": "#003737",
        "--teal-900": "#001F1F"
      },
      "primary_action_gold": {
        "--gold-100": "#FFF9C4",
        "--gold-200": "#FFF176",
        "--gold-300": "#FFEA00",
        "--gold-400": "#FFD700",
        "--gold-500": "#FFC107",
        "--gold-600": "#FFAB00",
        "--gold-700": "#FF8F00"
      },
      "secondary_accent_purple": {
        "--purple-100": "#E0B3FF",
        "--purple-200": "#C27AFF",
        "--purple-300": "#9D4EDD",
        "--purple-400": "#7B2CBF",
        "--purple-500": "#5A189A"
      },
      "semantic_validation_colors": {
        "--error-light": "#FFB4AB",
        "--error-base": "#FF5252",
        "--error-dark": "#3D1010",
        "--success-light": "#69F0AE",
        "--success-base": "#00E676",
        "--success-dark": "#004D26",
        "--warning-base": "#FF9100",
        "--info-base": "#66D9E8"
      }
    },
    "lighting_mapping_matrix": {

      "morning_light_mode": {
        "bg-app-global": "#F2F7F7",
        "bg-surface-base": "#FFFFFF",
        "bg-surface-elevated": "#FFFFFF",
        "bg-surface-modal": "#FFFFFF",
        "text-primary": "#003737",
        "text-secondary": "#005959",
        "text-tertiary": "#80BFBF",
        "border-subtle": "#B3D9D9",
        "border-focus": "#7B2CBF",
        "action-primary-bg": "#003737",
        "action-primary-text": "#FFD700",
        "action-secondary-bg": "#7B2CBF"
      },
      "evening_dark_mode": {
        "bg-app-global": "#001F1F",
        "bg-surface-base": "#003737",
        "bg-surface-elevated": "#004545",
        "bg-surface-modal": "#003737",
        "text-primary": "#FFFFFF",
        "text-secondary": "#D6EBEB",
        "text-tertiary": "#5C7A7A",
        "border-subtle": "#004545",
        "border-focus": "#9D4EDD",
        "action-primary-bg": "#FFD700",
        "action-primary-text": "#003737",
        "action-secondary-bg": "#9D4EDD"
      }
    },
    "accessibility_wcag22_breakpoints": {
      "contrast_ratio": "Min. 4.5:1",
      "touch_targets": "Min. 44x44px",
      "breakpoints": {
        "xs": "320px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px"
      },
      "safe_areas": {
        "padding-top": "env(safe-area-inset-top)",
        "padding-bottom": "calc(16px + env(safe-area-inset-bottom))"
      }
    },
    "glassmorphism_system": {
      "overlay": "rgba(0, 31, 31, 0.44)",
      "filter": "blur(20px) saturate(200%)",
      "border": "1px solid rgba(255, 255, 255, 0.125)"

    }
  },
  "2_typography_architecture": {
    "fonts": {
      "primary": {
        "family": "Mukta Malar",
        "weights": ,
        "usage":
      },
      "technical": {
        "family": "IBM Plex Sans",
        "weights": ,
        "usage":,
        "features": "font-feature-settings: 'tnum'"
      }
    },
    "fluid_typography": {
      "fs-display": "clamp(2.5rem, 4vw + 1.5rem, 4rem)",
      "fs-h1": "clamp(2rem, 1.5vw + 1.6rem, 2.5rem)",
      "fs-body-m": "1rem",
      "fs-caption": "0.75rem"
    }
  },
  "3_motion_design_haptics": {
    "bezier_curves": {
      "ease-standard": { "curve": "cubic-bezier(0.4, 0.0, 0.2, 1)",
"duration": "200ms" },
      "ease-enter": { "curve": "cubic-bezier(0.16, 1, 0.3, 1)",
"duration": "300ms-400ms" },
      "ease-spring": { "curve": "cubic-bezier(0.175, 0.885, 0.32,
1.275)", "duration": "400ms" }
    },
    "haptics": {
      "success": "Krótkie i rosnące w intensywności impulsy",
      "error": "Krótkie impulsy o malejącej intensywności",
      "warning": "Krótkie, płaskie impulsy uderzeniowe",
      "impact_tick": "10-20ms sygnał potwierdzający interakcję"
    },
    "dynamic_effects": {
      "color_shifts": "Dynamiczna zmiana poświaty dla dużych napiwków
(Whale tips)",
      "parallax": "Głębia przy przewijaniu (wyłączana przez
prefers-reduced-motion)"
    },
    "ai_assistant": {
      "voice_feedback": "Animowany obrys reagujący falami fioletu
(#9D4EDD) na głośność mikrofonu"
    }

  },
  "4_iconography": {
    "viewbox": "0 0 24 24",
    "live_area": "20x20px",
    "stroke_width": "1.5px (skalowane do 1px przy 16px)",
    "color_coding": "fill: 'none', stroke: 'currentColor'"
  },
  "5_ui_components": {
    "buttons": {
      "primary": { "bg": "var(--gold-400)", "text": "var(--teal-800)",
"hover": "var(--gold-500)", "active": "scale(0.98)" },
      "secondary": { "bg": "transparent", "border": "2px solid
var(--purple-300)", "text": "var(--purple-300)", "hover": "bg:
rgba(157, 78, 221, 0.1)" }
    },
    "fab": {
      "mobile": { "size": "56x56px", "position": "bottom-right",
"z_index": 200, "shape": "circle" },
      "desktop": { "variant": "Extended FAB", "padding": "0 24px",
"shape": "pill" },
      "scroll_behavior": { "down": "Hide (translateY(150%)
scale(0.9))", "up": "Show (translateY(0) scale(1))" }
    },
    "forms": {
      "inputs": { "bg": "#002B2B", "border": "1px solid
var(--teal-600)", "focus": "Neon glow ring var(--gold-400), label
moves up" },
      "search_bar": { "loading": "Fioletowy spinner w miejscu lupy",
"dropdown": "z-index 100", "empty_state": "Ilustracja 3D uśpionej
lupy" }
    },
    "selection_controls": {
      "checkbox": { "hit_area": "min 44x44px", "checked": "bg:
var(--gold-400), checkmark: teal (animowany stroke)" },
      "toggle_switch": { "on_state": "track: var(--purple-300), haptic
tick, ease-spring transform" }
    },
    "progress_and_sliders": {
      "slider": { "track_active": "var(--gold-400)", "thumb":
"24x24px", "haptic": "Tick przy każdej pełnej wartości" },
      "linear": { "height": "4-8px", "color": "Fiolet (proces) lub
Złoto/Zieleń (sukces)" }
    },
    "dividers": {
      "thickness": "1px",
      "color": "var(--border-subtle) lub rgba(255, 255, 255, 0.05)",
      "types": {
        "full_bleed": "Od krawędzi do krawędzi (separacja niezależnych

sekcji)",
        "inset": "Wcięte do linii tekstu (w listach, omijając
awatary)",
        "vertical": "Pionowe linie w paskach nawigacji"
      }
    }
  },
  "6_organisms_modals_drawers": {
    "desktop_modal": { "max_width": "600px", "backdrop": "blur(4px),
rgba(0, 31, 31, 0.85)", "border_radius": "16px", "z_index": 1000 },
    "bottom_sheet": { "trigger": "< 640px ekran", "gestures":
"Swipe-down-to-dismiss", "haptic": "Bump przy zderzeniu z dnem" }
  },
  "7_data_interfaces": {
    "cards": { "hover": "translateY(-6px), złoty drop-shadow glow
(box-shadow)" },
    "tables": { "typography": "tabular-nums", "zebra_striping": "odd:
teal-900, even: teal-800", "border": "bottom 1px solid teal-700" },
    "charts": { "style": "Sparklines / Line Charts", "line": "Gradient
fiolet -> złoto, 3px stroke", "tooltip": "Portal, z-index 1500" },
    "skeleton_loaders": { "base_color": "#003737", "animation":
"Świetlisty gradient teal-700 (transform: translateX) GPU" }
  },
  "8_floating_modules": {
    "dropdown": { "position": "absolute", "z_index": 1000,
"elevation": "0 10px 25px rgba(0,0,0,0.6)", "offset": "8px" },
    "accordion": { "behavior": "Płynne rozwijanie wysokości bez
skoków, strzałka rotująca o 180deg" }
  },
  "9_states_and_notifications": {
    "empty_states": { "visuals": "Abstrakcyjne 3D (np. pusty szklany
słoik)", "typography": "Przyjazny komunikat + Przycisk Primary CTA" },
    "error_pages": { "404_500": "Mukta Malar ExtraBold dla kodu błędu,
paralaksa", "offline": "Czerwony, pastelowy pasek sticky na dole" },
    "toast": { "duration": "4s", "position": "Prawy-dół (Desktop) /
Góra (Mobile)", "stacking": "System warstwowania powiadomień w osi Z",
"interactions": }
  },
  "10_web3_ecosystem": {
    "wallet_connect": { "states": },
    "transactions": { "gas_fee": "Prezentacja opłaty w kolorze
fioletowym, kwota główna złota", "auth": "Wirtualny skan biometrii z
haptic success" },
    "blockchain_status": { "pending": "Pulsujący cyjanowy zegar",
"confirmed": "Szybki złoty checkmark + haptic tick", "failed":
"Czerwony krzyżyk + shake animacja + wibracja błędu" },
    "nft_claim": { "flow": "Eksplozja konfetti -> Claim Modal ->
Generowanie bryły 3D na złotym tle -> Oznaczenie Rzadkości (Rarity)" }

  },
  "11_macro_structures": {
    "onboarding": { "flow": "Wieloetapowy wizard w trybie Focus Mode z
horyzontalnym stepperem" },
    "analytics": { "layout": "Bento Grid, niezależne szkielety
ładujące się asynchronicznie (Waterfall)" },
    "payout": { "steps": "Zablokowany suwak z wyborem % -> Selektor
konta docelowego FIAT/Krypto z opłatami" },
    "settings": { "layout": "Akordeony w panelach bocznych (Mobile) /
System dwukolumnowy (Desktop)" },
    "referral": { "features": "Grywalizacja z kodem QR, natychmiastowe
kopiowanie z haptic feedbackiem" }
  },
  "12_design_tokens_css": {
    "css": ":root {\n  --teal-50: #E0F2F2;\n  --teal-100: #B3D9D9;\n
--teal-200: #80BFBF;\n  --teal-300: #4DA6A6;\n  --teal-400: #268C8C;\n
--teal-500: #007373;\n  --teal-600: #005959;\n  --teal-700: #004545;\n
--teal-800: #003737;\n  --teal-900: #001F1F;\n  --gold-100: #FFF9C4;\n
--gold-200: #FFF176;\n  --gold-300: #FFEA00;\n  --gold-400: #FFD700;\n
--gold-500: #FFC107;\n  --gold-600: #FFAB00;\n  --gold-700: #FF8F00;\n
--purple-100: #E0B3FF;\n  --purple-200: #C27AFF;\n  --purple-300:
#9D4EDD;\n  --purple-400: #7B2CBF;\n  --purple-500: #5A189A;\n
--error-light: #FFB4AB;\n  --error-base: #FF5252;\n  --error-dark:
#3D1010;\n  --success-light: #69F0AE;\n  --success-base: #00E676;\n
--success-dark: #004D26;\n  --warning-base: #FF9100;\n  --info-base:
#66D9E8;\n  --bg-app-global: var(--teal-900);\n  --bg-surface-base:
var(--teal-800);\n  --bg-surface-elevated: var(--teal-700);\n
--bg-surface-modal: var(--teal-800);\n  --text-primary: #FFFFFF;\n
--text-secondary: #D6EBEB;\n  --text-tertiary: #5C7A7A;\n
--border-subtle: var(--teal-700);\n  --border-focus:
var(--purple-300);\n  --action-primary-bg: var(--gold-400);\n
--action-primary-text: var(--teal-800);\n  --action-secondary-bg:
var(--purple-300);\n  --font-heading: 'Mukta Malar', sans-serif;\n
--font-body: 'IBM Plex Sans', sans-serif;\n  --fs-display:
clamp(2.5rem, 4vw + 1.5rem, 4rem);\n  --fs-h1: clamp(2rem, 1.5vw +
1.6rem, 2.5rem);\n  --fs-h2: clamp(1.75rem, 1vw + 1.5rem, 2rem);\n
--fs-h3: clamp(1.5rem, 0.5vw + 1.3rem, 1.75rem);\n  --fs-h4:
clamp(1.25rem, 0.4vw + 1.15rem, 1.5rem);\n  --fs-body-l: 1.125rem;\n
--fs-body-m: 1rem;\n  --fs-body-s: 0.875rem;\n  --fs-caption:
0.75rem;\n  --fs-button: 1rem;\n  --z-base: 0;\n  --z-elevated: 10;\n
--z-dropdown: 100;\n  --z-fab: 200;\n  --z-backdrop: 500;\n
--z-modal: 1000;\n  --z-tooltip: 1500;\n  --z-toast: 9999;\n
--shadow-1: 0 4px 6px -1px rgba(0, 0, 0, 0.5);\n  --shadow-2: 0 10px
25px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05);\n
--shadow-3: 0 20px 25px 5px rgba(0, 0, 0, 0.6), 0 0 10px rgba(252,
194, 1, 0.1);\n  --shadow-modal: 0 24px 48px -12px rgba(0, 0, 0,
0.7);\n  --shadow-inset: inset 0 1px 2px rgba(0, 0, 0, 0.2);\n
--glass-overlay: rgba(0, 31, 31, 0.44);\n  --glass-blur: blur(20px)

saturate(200%);\n  --glass-border: 1px solid rgba(255, 255, 255,
0.125);\n  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);\n
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);\n  --ease-exit:
cubic-bezier(0.4, 0, 1, 1);\n  --ease-spring: cubic-bezier(0.175,
0.885, 0.32, 1.275);\n}"
  }
}

