// Reużywalne klasy (Tailwind tokens) dla spójnego focus/hover zgodnie z WCAG 2.2 AA
export const ringFocus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737]';

export const linkHover =
  'transition hover:text-[#FFD700] hover:underline underline-offset-2';

export const btnBase =
  'inline-flex items-center justify-center rounded-[12px] font-semibold';

export const btnGhost = `${btnBase} border border-white/10 bg-white/5 text-[#DDE0DA] hover:bg-white/10 ${ringFocus}`;

export const btnGold = `${btnBase} bg-[#FFD700] text-[#003737] hover:brightness-105 ${ringFocus}`;

