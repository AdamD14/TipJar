// frontend/src/hooks/useScrollPosition.ts
// Opis: Lekki hook do śledzenia, czy strona jest przewinięta ponad próg (dla efektu „zamykania obrazu”).
// Bez zależności od zewnętrznych bibliotek.

import { useEffect, useState } from 'react';

export function useScrollPosition(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const current = typeof window !== 'undefined' ? window.scrollY : 0;
      setScrolled(current > threshold);
    };

    onScroll(); // initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

