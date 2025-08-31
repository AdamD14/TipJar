// frontend/src/hooks/useBodyScrollLock.ts
// Opis: Blokuje scroll body przy otwartym panelu mobilnym, zgodnie z WCAG (focus zostaje na panelu).
// Uwaga: Nie dotyka globalnych styli – działa przez style inline na <body>.

import { useEffect } from 'react';

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    if (locked) {
      style.overflow = 'hidden';
    } else {
      style.overflow = prev || '';
      style.overflow = '';
    }
    return () => {
      style.overflow = prev || '';
    };
  }, [locked]);
}
