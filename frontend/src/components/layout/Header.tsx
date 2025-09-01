// frontend/src/components/layout/Header.tsx
'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Inter, IBM_Plex_Sans, Playfair_Display, Mukta } from 'next/font/google';
import useScrolled from '@/hooks/useScrolled';

const inter = Inter({ subsets: ['latin'], display: 'swap', weight: ['400', '600'] });
const plex = IBM_Plex_Sans({ subsets: ['latin'], display: 'swap', weight: ['400', '600'] });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', weight: ['600', '700'] });
const mukta = Mukta({ subsets: ['latin'], display: 'swap', weight: ['400', '600', '700'] });

const BRAND_DARK = '#003737';
const GOLD = '#FFD700';
const GOLD_HOVER = '#E6C200';
const PURPLE = '#4D194D';
const TEXT_PRIMARY = '#DDE0DA';
const TEXT_SECONDARY = '#BCC1B6';

const NAV = [
  { label: 'Why tipjar+?', href: '/#why' },
  { label: 'How it works?', href: '/#how' },
  { label: 'Start building / AI Studio', href: '/ai-studio' },
  { label: 'Explore creators', href: '/explore' },
  { label: 'Learn about WEB3', href: '/learn/web3' },
] as const;

export default function Header() {
  const scrolled = useScrolled(10);
  const [open, setOpen] = useState(false);
  const id = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on route change hash click or Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Click outside to close (mobile)
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-40 transition-all',
        scrolled
          ? 'bg-[rgba(0,55,55,0.90)] backdrop-blur-md shadow-sm'
          : 'bg-transparent',
      ].join(' ')}
      aria-label="Site header"
    >
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left: (no brand text/logo per spec) keep empty spacer for layout balance */}
        <div aria-hidden className="w-10 md:w-12" />

        {/* Center: nav (desktop) */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className={`flex items-center gap-7 ${plex.className}`}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    'text-sm font-medium transition underline-offset-4',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2',
                  ].join(' ')}
                  style={{ color: TEXT_PRIMARY }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = GOLD_HOVER;
                    (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = GOLD_HOVER;
                    (e.currentTarget as HTMLAnchorElement).style.textDecorationLine = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = TEXT_PRIMARY;
                    (e.currentTarget as HTMLAnchorElement).style.textDecorationLine = 'none';
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: mobile hamburger */}
        <div className="md:hidden">
          <button
            ref={btnRef}
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((s) => !s)}
            className="rounded-lg p-2 text-[#DDE0DA] outline-none transition hover:text-[#E6C200] focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="block h-0.5 w-6 bg-current"></span>
            <span aria-hidden className="mt-1 block h-0.5 w-6 bg-current"></span>
            <span aria-hidden className="mt-1 block h-0.5 w-6 bg-current"></span>
          </button>
        </div>
      </div>

      {/* Mobile full panel */}
      <div
        id={id}
        ref={panelRef}
        role={open ? 'dialog' : undefined}
        aria-modal={open || undefined}
        className={[
          'md:hidden transition-all',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
        <div className="absolute left-0 right-0 top-0 rounded-b-2xl border-b border-[rgba(255,215,0,0.12)] bg-[rgba(0,55,55,0.96)] p-4 backdrop-blur-md">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-4 py-3 text-base ${mukta.className} text-[#DDE0DA] transition hover:text-[#E6C200] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="rounded-lg border border-[rgba(255,215,0,0.20)] px-3 py-1.5 text-sm text-[#DDE0DA] transition hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Subtle height change for “closing image” feel */}
      <div className={scrolled ? 'h-2 transition-all' : 'h-4 transition-all'} aria-hidden />
    </header>
  );
}
