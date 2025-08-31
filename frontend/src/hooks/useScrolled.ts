// frontend/src/hooks/useScrolled.ts
'use client';

import { useEffect, useState } from 'react';

/** Returns true when page is scrolled beyond threshold (default 10px). */
export default function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}
