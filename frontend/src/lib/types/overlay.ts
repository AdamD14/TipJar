export type OverlayPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type OverlayEntryAnimation = 'slide-up' | 'slide-in-left' | 'fade-in' | 'typewriter';
export type OverlaySpecialEffectType = 'sparkle' | 'confetti' | 'glow' | 'none';
export type OverlayColorPreset = 'darkTurquoise' | 'black' | 'transparent';

export type OverlayFont =
  | 'Open Sans'
  | 'Montserrat'
  | 'Comic Neue'
  | 'Inter'
  | 'System UI';

export interface OverlaySettings {
  position: OverlayPosition;
  opacity: number; // 0.3–1.0
  bgColor: string | OverlayColorPreset;
  textColor: string | 'white' | 'gold' | 'turquoise';
  durationSec: number; // 5–15
  fontFamily: OverlayFont;
  entryAnimation: OverlayEntryAnimation;
  specialEffectThreshold: number; // w USDC
  specialEffectType: OverlaySpecialEffectType;
  soundEffectUrl?: string;
}

export const defaultOverlaySettings: OverlaySettings = {
  position: 'top-right',
  opacity: 0.85,
  bgColor: 'darkTurquoise',
  textColor: 'white',
  durationSec: 8,
  fontFamily: 'Inter',
  entryAnimation: 'slide-up',
  specialEffectThreshold: 50,
  specialEffectType: 'confetti',
  soundEffectUrl: undefined,
};

export function sanitizeOverlaySettings(s: OverlaySettings): OverlaySettings {
  const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
  return {
    ...s,
    opacity: clamp(s.opacity, 0.3, 1.0),
    durationSec: Math.round(clamp(s.durationSec, 5, 15)),
    specialEffectThreshold: s.specialEffectThreshold < 0 ? 0 : s.specialEffectThreshold,
  };
}
