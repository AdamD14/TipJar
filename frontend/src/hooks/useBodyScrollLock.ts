'use client';

import { useEffect } from 'react';

/** Locks <body> scroll when `locked` = true (mobile sheets/modals). */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const { body } = document;
    if (!body) return;
    const prev = body.style.overflow;
    if (locked) body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = prev;
    };
  }, [locked]);
}
export default useBodyScrollLock;
