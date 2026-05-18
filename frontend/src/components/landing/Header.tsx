// Branding left: static "TIPJAR.PLUS" text (no logo).
// Navigation: UPPERCASE labels + gold underline (desktop + hamburger).
// Mobile panel: /public/logo.png background right, height ≈ 5× text height.
// Desktop: NO Sign up button (removed). Mobile: Log in / Sign up side by side; Sign up -> /register.

'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@/components/ui/buttons/Button';
import { useAuthStore } from '@/lib/store/authStore';

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
    <span className="text-[13px] md:text-sm font-heading font-semibold tracking-[0.20em] uppercase text-text-secondary transition-colors inline-flex">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block hover:text-gold-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
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
  const user = useAuthStore((s) => s.user);

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
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-[100] rounded-md bg-surface-app/80 px-3 py-2 text-text-ds-primary"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        data-testid="navbar"
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b',
          scrolled ? 'backdrop-blur-md bg-surface-app/80 border-teal-300/20' : 'bg-transparent border-transparent'
        )}
        aria-label="Primary"
      >
        <nav className="mx-auto w-full px-4 md:px-6" aria-label="Main">
          <div className="flex py-1 items-center justify-between">
            {/* Left: Branding — animated text */}
            <div className="flex-1 flex items-center justify-start">
              <Link href="/" aria-label="tipjar.plus — homepage" className="flex items-center gap-2">
                <AnimatedBrand />
              </Link>
            </div>

            {/* Center: Nav links */}
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

{/* Right: Log in / Username + Hamburger (NO Sign up on desktop) */}
          <div className="flex-1 flex justify-end items-center">
            <div className="hidden md:block">
              {user ? (
                <Button variant="glass" href={`/@${user.username}`} className="gap-3 px-5 tracking-wide">
                  {user.username}
                </Button>
              ) : (
                <Button variant="glass" href="/login" leftIcon={<User size={16} />} className="gap-3 px-5 tracking-wide" data-testid="desktop-login">
                  Log in
                </Button>
              )}
            </div>
            <Button
            variant="ghost"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            size="sm"
            className={clsx(
              'md:hidden',
              open && 'pointer-events-none opacity-0'
            )}
            data-testid="hamburger"
          >
            <Menu aria-hidden size={22} />
          </Button>
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
        {/* backdrop */}
        <div className="absolute inset-0 bg-surface-app" aria-hidden />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden />
        
        {/* LOGO right: positioned at 85% height, more visible */}
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

          <Button
            variant="ghost"
            size="sm"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 text-text-ds-tertiary hover:text-text-ds-primary"
          >
            <X size={24} />
          </Button>

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:pt-20">
          <ul className="flex flex-col gap-4 border-t border-teal-300/20 pt-6">
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

          {/* Mobile CTA — kept, Sign up -> /register */}
          <div className="mt-6 flex gap-3 border-t border-white/10 pt-6">
            <div className="flex-1">
                <Button variant="glass" href="/login" fullWidth leftIcon={<User size={16} />} data-testid="mobile-login">Log in</Button>
            </div>
            <div className="flex-1">
<Button variant="primary" href="/register" data-testid="mobile-signup" fullWidth>
          Sign up
        </Button>
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
        'relative inline-block outline-none text-xs font-heading font-semibold tracking-[0.18em] uppercase transition-colors duration-200',
        'focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.7)] focus-visible:rounded',
'text-text-secondary hover:text-gold-400',
'after:absolute after:left-0 after:bottom-[-4px] after:h-[1px] after:w-full after:rounded-full after:bg-gold-400',
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
          'relative inline-block text-sm font-heading font-semibold tracking-[0.16em] uppercase transition-colors',
'text-text-secondary hover:text-gold-400',
'after:absolute after:left-0 after:bottom-[-4px] after:h-[1px] after:w-full after:rounded-full after:bg-gold-400',
          'after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-200'
        )}
      >
        {props.children}
      </span>
    </Link>
  );
}