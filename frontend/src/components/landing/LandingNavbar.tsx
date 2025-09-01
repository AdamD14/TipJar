// frontend/src/components/landing/LandingNavbar.tsx
// Opis: Fixed navbar zgodny z wytycznymi TipJar+.
// - Branding wyłącznie w hero (brak logo/tekstu w headerze).
// - Kolory: brand-dark #003737, brand-gold #FFD700, brand-purple #4D194D, text-primary #DDE0DA, text-secondary #BCC1B6
// - Hover: tekst → przyciemnione złoto + delikatne podkreślenie w tym samym odcieniu
// - Efekt „zamykania obrazu” przy scrollu (ciemne tło + blur + hairline gold)
// - Mobile: pełnoekranowy panel na hamburgera
// - WCAG 2.2 AA: skip link, aria-*, focus states, klawiatura, zamykanie ESC

'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  'data-testid'?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Why tipjar+?', href: '#why', 'data-testid': 'nav-why' },
  { label: 'How it works?', href: '#how', 'data-testid': 'nav-how' },
  { label: 'Start building / AI Studio', href: '#studio', 'data-testid': 'nav-studio' },
  { label: 'Explore creators', href: '#explore', 'data-testid': 'nav-explore' },
  { label: 'Learn about WEB3', href: '#learn', 'data-testid': 'nav-learn' },
];

const GOLD = '#FFD700';
const GOLD_DARK = '#E6C200'; // przyciemnione złoto na hover
const BRAND_DARK = '#003737';
const TEXT_PRIMARY = '#DDE0DA';
const TEXT_SECONDARY = '#BCC1B6';

export default function LandingNavbar() {
  const scrolled = useScrollPosition(16);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useBodyScrollLock(open);

  // Focus: po otwarciu panelu mobilnego przenieś fokus do kontenera.
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  // ESC zamyka panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Skip link dla czytników ekranu/klawiatury */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] rounded-md bg-black/80 px-3 py-2 text-white"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        data-testid="navbar"
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          'border-b',
          scrolled
            ? 'backdrop-blur-md bg-[rgba(0,55,55,0.82)] border-[rgba(255,215,0,0.16)]'
            : 'bg-transparent border-transparent'
        )}
        aria-label="Primary"
      >
        <nav className="mx-auto w-full max-w-7xl px-4 md:px-6" aria-label="Main">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Lewa część pusta — brak logo/tekstu zgodnie z wymaganiami */}
            <div aria-hidden className="w-10 md:w-16" />

            {/* Linki desktop */}
            <ul className="hidden md:flex items-center gap-8 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <HeaderLink href={item.href} data-testid={item['data-testid']}>
                    {item.label}
                  </HeaderLink>
                </li>
              ))}
            </ul>

            {/* Prawa część: hamburger na mobile */}
            <div className="flex items-center">
              <button
                type="button"
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
                className={clsx(
                  'md:hidden inline-flex items-center justify-center rounded-md p-2 outline-none ring-offset-2 transition',
                  'focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)]',
                  'text-[color:var(--tj-text-secondary,#BCC1B6)] hover:text-[color:var(--tj-text-primary,#DDE0DA)]'
                )}
                data-testid="hamburger"
              >
                {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
              </button>
              {/* Wyrównanie do prawej na desktopie */}
              <div aria-hidden className="hidden md:block w-10" />
            </div>
          </div>
        </nav>

        {/* Mobile Fullscreen Panel */}
        <div
          id="mobile-menu"
          ref={panelRef}
          tabIndex={-1}
          aria-modal={open ? 'true' : undefined}
          role={open ? 'dialog' : undefined}
          className={clsx(
            'md:hidden fixed inset-0 z-40 origin-top transition-all duration-200',
            open
              ? 'pointer-events-auto opacity-100 scale-100'
              : 'pointer-events-none opacity-0 scale-95'
          )}
          onClick={(e) => {
            // klik w tło zamyka, klik wewnątrz listy nie
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* Tło panelu */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: BRAND_DARK }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden />

          {/* Zawartość panelu */}
          <div className="relative mx-auto mt-20 w-full max-w-7xl px-4">
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <MobileLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    data-testid={`${item['data-testid']}-mobile`}
                  >
                    {item.label}
                  </MobileLink>
                </li>
              ))}
            </ul>

            {/* Akcje – „Login” / „Sign up” jako widoczne elementy (zgodnie z mobile-nav) */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="/login"
                data-testid="mobile-login"
                className={clsx(
                  'inline-flex items-center justify-center rounded-lg px-4 py-3 text-base font-medium',
                  'text-[color:var(--tj-text-primary,#DDE0DA)]',
                  'border border-[rgba(221,224,218,0.18)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)]',
                  'hover:bg-white/5 transition'
                )}
              >
                Log in
              </a>
              <a
                href="/signup"
                data-testid="mobile-signup"
                className={clsx(
                  'inline-flex items-center justify-center rounded-lg px-4 py-3 text-base font-semibold',
                  'text-[#0B0F12]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)]',
                  'transition'
                )}
                style={{ backgroundColor: GOLD }}
                onMouseDown={(e) => e.currentTarget.classList.add('scale-[.99]')}
                onMouseUp={(e) => e.currentTarget.classList.remove('scale-[.99]')}
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function HeaderLink(
  props: React.PropsWithChildren<{ href: string; 'data-testid'?: string }>
) {
  return (
    <Link
      href={props.href}
      data-testid={props['data-testid']}
      className={clsx(
        'relative outline-none text-sm font-medium transition',
        // Kolor bazowy: text-secondary
        'text-[color:var(--tj-text-secondary,#BCC1B6)]',
        // Focus ring
        'focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)] focus-visible:rounded',
        // Hover: tekst → przyciemnione złoto + subtelne podkreślenie
        'hover:text-[color:var(--tj-gold-dark,#E6C200)]'
      )}
      style={
        {
          // Podkreślenie jako hairline na hover (pseudo-element)
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.setProperty('--underline', GOLD_DARK);
        el.style.textDecorationColor = GOLD_DARK;
        el.style.textDecorationThickness = '2px';
        el.style.textUnderlineOffset = '6px';
        el.style.textDecorationLine = 'underline';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.textDecorationLine = 'none';
      }}
    >
      {props.children}
    </Link>
  );
}

function MobileLink(
  props: React.PropsWithChildren<{
    href: string;
    onClick?: () => void;
    'data-testid'?: string;
  }>
) {
  return (
    <a
      href={props.href}
      onClick={props.onClick}
      data-testid={props['data-testid']}
      className={clsx(
        'block rounded-md px-4 py-3 text-base font-medium transition',
        `text-[${TEXT_PRIMARY}]`,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)]',
        'hover:bg-white/6'
      )}
      style={{
        color: TEXT_PRIMARY,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }}
    >
      {props.children}
    </a>
  );
}
