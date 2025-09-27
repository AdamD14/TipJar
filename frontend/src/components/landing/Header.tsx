// frontend/src/components/landing/Header.tsx
// Branding po lewej: stały tekst "TIPJAR.PLUS" (bez logo).
// Nawigacja: etykiety UPPERCASE + złote podkreślenie (desktop + hamburger).
// Mobile panel: tło /public/logo.png po prawej, wysokość ≈ 5× wysokości tekstu.
// Desktop: BEZ przycisku Sign up (usunięty). Mobile: Log in / Sign up obok siebie; Sign up -> /register.

'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import PrimaryCta from '@/components/cta/PrimaryCta';
import LoginButton from '@/components/ui/LoginButton';

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

// Animated Brand Component
function AnimatedBrand() {
  const letters = ['T', 'I', 'P', 'J', 'A', 'R', '.', 'P', 'L', 'U', 'S'];
  
  return (
    <span className="text-[13px] md:text-sm font-semibold tracking-[0.20em] uppercase text-text-secondary transition-colors inline-flex">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block hover:text-[#FFD700] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          style={{
            animationDelay: `${index * 0.1}s`,
            animation: 'letterFloat 3s ease-in-out infinite'
          }}
        >
          {letter}
        </span>
      ))}
      <style jsx>{`
        @keyframes letterFloat {
          0%, 90%, 100% { transform: translateY(0); }
          45% { transform: translateY(-2px); }
        }
      `}</style>
    </span>
  );
}

export default function Header() {
  const scrolled = useScrollPosition(16);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

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
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b',
          scrolled ? 'backdrop-blur-md bg-brand-dark/80 border-cyan-300/20' : 'bg-transparent border-transparent'
        )}
        aria-label="Primary"
      >
        <nav className="mx-auto w-full px-4 md:px-6" aria-label="Main">
          <div className="flex py-1 items-center justify-between">
            {/* 1) Lewa: Branding — tekst z animacją */}
            <div className="flex-1 flex items-center justify-start">
              <Link href="/" aria-label="tipjar.plus — homepage" className="flex items-center gap-2">
                <AnimatedBrand />
              </Link>
            </div>

            {/* 2) Środek: Linki */}
            <div className="flex-shrink-0 flex justify-center">
              <ul className="hidden md:flex items-center gap-6 md:gap-8 text-xs">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <HeaderLink
                      href={item.href}
                      data-testid={item['data-testid']}
                      onAnchorClick={handleAnchorClick}
                    >
                      {item.label}
                    </HeaderLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3) Prawa: Log in + Hamburger (BEZ Sign up na desktopie) */}
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
                  'md:hidden inline-flex items-center justify-center rounded-md p-2 outline-none ring-offset-2 transition-all',
                  'focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)]',
                  'text-text-secondary hover:text-[#FFD700]',
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

      {/* Mobile Panel */}
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
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        {/* tło */}
        <div className="absolute inset-0 bg-brand-dark" aria-hidden />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden />
        
        {/* LOGO po prawej: podniesione do 85% strony, lepiej widoczne */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-[15%] w-60 h-60 opacity-90"
          style={{
            backgroundImage: "url('/logo.png')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />

        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 rounded-md p-2 text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={24} />
        </button>

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:pt-20">
          <ul className="flex flex-col gap-4 border-t border-cyan-300/20 pt-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <MobileLink
                  href={item.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleAnchorClick(e, item.href)}
                  data-testid={`${item['data-testid']}-mobile`}
                >
                  {item.label}
                </MobileLink>
              </li>
            ))}
          </ul>

          {/* Mobile CTA — zostaje, Sign up -> /register */}
          <div className="mt-6 flex gap-3 border-t border-white/10 pt-6">
            <div className="flex-1">
              <LoginButton data-testid="mobile-login" className="w-full h-12">
                Log in
              </LoginButton>
            </div>
            <div className="flex-1">
              <PrimaryCta href="/register" data-testid="mobile-signup" className="w-full h-12">
                Sign up
              </PrimaryCta>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HeaderLink(
  props: React.PropsWithChildren<{
    href: string;
    'data-testid'?: string;
    onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  }>
) {
  const { href, onAnchorClick } = props;
  return (
    <Link
      href={href}
      data-testid={props['data-testid']}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => onAnchorClick(e, href)}
      className={clsx(
        'relative inline-block outline-none text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200',
        'focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)] focus-visible:rounded',
        'text-text-secondary hover:text-[#FFD700]',
        'after:absolute after:left-0 after:bottom-[-4px] after:h-[1px] after:w-full after:rounded-full after:bg-[#FFD700]',
        'after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-200'
      )}
    >
      {props.children}
    </Link>
  );
}

function MobileLink(
  props: React.PropsWithChildren<{
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    'data-testid'?: string;
  }>
) {
  return (
    <Link
      href={props.href}
      onClick={props.onClick}
      data-testid={props['data-testid']}
      className={clsx(
        'block rounded-md px-3 py-2 transition text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)] hover:bg-white/5'
      )}
    >
      <span
        className={clsx(
          'relative inline-block text-sm font-semibold tracking-[0.16em] uppercase transition-colors',
          'text-text-secondary hover:text-[#FFD700]',
          'after:absolute after:left-0 after:bottom-[-4px] after:h-[1px] after:w-full after:rounded-full after:bg-[#FFD700]',
          'after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-200'
        )}
      >
        {props.children}
      </span>
    </Link>
  );
}