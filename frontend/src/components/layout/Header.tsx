// frontend/src/components/layout/Header.tsx
// Zmiany: Usunięto logo z lewej strony nagłówka.

'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import PrimaryCta from '@/components/cta/PrimaryCta';
import LoginButton from '@/components/ui/LoginButton';

// --- Constants ---
const BRAND_DARK = '#003737';
const GOLD = '#FFD700';
const GOLD_DARK = '#E6C200';
const TEXT_PRIMARY = '#DDE0DA';
const TEXT_SECONDARY = '#BCC1B6';

type NavItem = {
  label: string;
  href: string;
  'data-testid'?: string;
};

const NAV_ITEMS: NavItem[] = [
    { label: 'Why tipjar+?', href: '#why', 'data-testid': 'nav-why' },
    { label: 'How it works?', href: '#how', 'data-testid': 'nav-how' },
    { label: 'Start building / AI Studio', href: '#studio', 'data-testid': 'nav-studio' },
    { label: 'Explore creators', href: '#explore', 'data-testid': 'nav-explore' },
    { label: 'Learn about WEB3', href: '#learn', 'data-testid': 'nav-learn' },
];

// --- Main Component ---
export default function Header() {
  const scrolled = useScrollPosition(16);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
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
            ? 'backdrop-blur-md bg-[rgba(0,55,55,0.82)] border-cyan-300/20'
            : 'bg-transparent border-transparent'
        )}
        aria-label="Primary"
      >
        <nav className="mx-auto w-full px-4 md:px-6" aria-label="Main">
          <div className="flex py-1 items-center justify-between">
            
            {/* 1. Kolumna Lewa: Pusta przestrzeń dla zachowania symetrii */}
            <div className="flex-1 flex justify-start">
              {/* Logo usunięte */}
            </div>

            {/* 2. Kolumna Środkowa: Linki Nawigacji */}
            <div className="flex-shrink-0 flex justify-center">
              <ul className="hidden md:flex items-center gap-8 text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <HeaderLink href={item.href} data-testid={item['data-testid']}>
                      {item.label}
                    </HeaderLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Kolumna Prawa: Przyciski */}
            <div className="flex-1 flex justify-end items-center">
              <div className="hidden md:block">
                 <LoginButton data-testid="desktop-login">Log in</LoginButton>
              </div>
              <button
                type="button"
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className={clsx(
                  'md:hidden',
                  'inline-flex items-center justify-center rounded-md p-2 outline-none ring-offset-2 transition-all',
                  'focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)]',
                  'text-[color:var(--tj-text-secondary)] hover:text-[color:var(--tj-text-primary)]',
                  open && 'pointer-events-none opacity-0'
                )}
                data-testid="hamburger"
              >
                <Menu aria-hidden size={22} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        tabIndex={-1}
        aria-modal={open ? 'true' : undefined}
        role={open ? 'dialog' : undefined}
        className={clsx(
          'md:hidden fixed inset-0 z-[60] origin-top transition-transform duration-300',
          open ? 'pointer-events-auto opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="absolute inset-0 bg-brand-dark" style={{ backgroundColor: BRAND_DARK }} aria-hidden />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden />

        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 rounded-md p-2 text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={24} />
        </button>

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:pt-20">
          <ul className="flex flex-col gap-3 border-t border-cyan-300/20 pt-6">
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

          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
            <LoginButton data-testid="mobile-login">Log in</LoginButton>
            <PrimaryCta href="/signup" data-testid="mobile-signup">Sign up</PrimaryCta>
          </div>
        </div>
      </div>
    </>
  );
}

// --- Helper Components ---
function HeaderLink(props: React.PropsWithChildren<{ href: string; 'data-testid'?: string }>) {
  return (
    <Link
      href={props.href}
      data-testid={props['data-testid']}
      className={clsx(
        'relative outline-none text-sm font-medium transition-colors duration-200',
        'focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)] focus-visible:rounded',
        'text-[var(--tj-text-secondary)] hover:text-[var(--tj-gold-dark)]',
        'hover:underline hover:decoration-[var(--tj-gold-dark)] hover:underline-offset-4 hover:decoration-1'
      )}
      style={
        {
          '--tj-text-secondary': TEXT_SECONDARY,
          '--tj-gold-dark': GOLD_DARK,
        } as React.CSSProperties
      }
    >
      {props.children}
    </Link>
  );
}

function MobileLink(
  props: React.PropsWithChildren<{ href: string; onClick?: () => void; 'data-testid'?: string }>
) {
  return (
    <Link
      href={props.href}
      onClick={props.onClick}
      data-testid={props['data-testid']}
      className={clsx(
        'block rounded-md px-4 py-3 text-base font-medium transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)]',
        'hover:bg-white/10'
      )}
      style={{ color: TEXT_PRIMARY }}
    >
      {props.children}
    </Link>
  );
}

