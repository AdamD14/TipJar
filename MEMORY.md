# TipJar+ Project Memory

## Critical Constraints (from user)
- **Pseudo-elements allowed** — but must be correctly positioned (my `::after` covered the card because of bad z-index/positioning; use `<span>` glow as safe default)
- **Ask before every change** — never touch files without explicit permission
- **Surgical changes only** — do not rewrite entire files; modify only what's requested
- **No independent actions** — do not run builds, installs, git operations, or edits without approval
- **Iterate one thing at a time** — the user reviews and approves each step before proceeding

## Today's Session Summary
- Card.tsx: Restored `<span>` glow (removed `::before`/`::after` pseudo-elements)
- StartBuildingShowcase: Added `show.webp` background
- StartBuildingShowcase: 3-column grid with ExampleProfile (left), empty (center/right)
- ExampleProfile: Changed from popup to inline mode, added AvatarCarousel in place of round avatar
- HowItWorks: Changed "For Creators" from purple (`text-purple-300`) to gold (`text-gold-400`)
- No commits, no builds, no installs were run without permission

## Design Preferences
- Color accent for Creator sections: **gold** (`text-gold-400`, border-gold-400)
- Do not touch: Header, Hero, Footer (unless explicitly requested)
- Creator components follow the gold accent from `rules/cards.md`
- Card interactive hover: teal-600 bg, -translate-y-1.5, double box-shadow with gold glow
