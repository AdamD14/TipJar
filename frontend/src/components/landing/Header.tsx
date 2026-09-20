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

function AnimatedBrand() {
  const letters = ['T', 'I', 'P', 'J', 'A', 'R', '.', 'P', 'L', 'U', 'S'];

  return (
    <span
      className="
        inline-flex
        text-[length:calc(var(--nav-font-size)*1.75)]
        font-heading
        font-semibold
        lowercase
        tracking-[0.10em]
        text-text-primary
        transition-colors
      "
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          className="
            inline-block
            transition-all
            duration-[var(--header-transition)]
            hover:-translate-y-1
            hover:scale-110
            hover:text-gold-300
          "
          style={{
            animationDelay: `${index * 0.1}s`,
            animation: 'letterFloat 3s ease-in-out infinite',
          }}
        >
          {letter}
        </span>
      ))}
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
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('keydown', onKey);
    }

    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith('#')) return;

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setOpen(false);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="
          sr-only
          focus-visible:not-sr-only
          focus-visible:absolute
          focus-visible:left-2
          focus-visible:top-2
          focus-visible:z-[calc(var(--z-modal)+1)]
          rounded-md
          bg-surface-app/80
          px-3
          py-2
          text-text-ds-primary
        "
      >
        Skip to main content
      </a>

      <header
        role="banner"
        data-testid="navbar"
        className={clsx(
          'fixed inset-x-0 top-0 w-full border-b',
          'z-[var(--z-dropdown)]',
          'transition-[background-color,border-color,backdrop-filter]',
          'duration-[var(--header-transition)]',
          scrolled
            ? 'bg-surface-app/80 backdrop-blur-md border-teal-300/20'
            : 'bg-transparent border-transparent'
        )}
      >
        <nav
          aria-label="Main"
          className="header-shell"
        >
          <div className="header-inner @container/header">
            <div className="flex min-w-0 shrink-0 items-center justify-start">
              <Link
                href="/"
                aria-label="tipjar.plus — homepage"
                className="flex min-w-0 items-center"
              >
                <AnimatedBrand />
              </Link>
            </div>

            <ul
              className="
                header-desktop-nav
                nav-list
              "
            >
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

            <div className="header-desktop-nav flex shrink-0 items-center justify-end">
              {user ? (
                <Button
                  variant="ghost"
                  href={`/@${user.username}`}
                  className="gap-3 px-2 tracking-wide"
                >
                  @{user.username}
                </Button>
              ) : (
                <Button
                  variant="tertiary"
                  href="/login"
                  size="md"
                  leftIcon={
                    <User
                      aria-hidden
                      className="size-[var(--icon-size)]"
                    />
                  }
                  className="gap-2 tracking-wide"
                  data-testid="desktop-login"
                >
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
              className={clsx(
                'header-mobile-nav icon-button rounded-full',
                open && 'pointer-events-none opacity-0'
              )}
              data-testid="hamburger"
            >
              <Menu
                aria-hidden
                className="size-[var(--icon-size)]"
              />
            </Button>
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
          '@container/mobile-menu fixed inset-0 origin-top',
          'z-[var(--z-modal)]',
          'transition-[opacity,transform]',
          'duration-[var(--header-transition)]',
          open
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        )}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target === e.currentTarget) {
            setOpen(false);
          }
        }}
      >
        <div
          className="absolute inset-0 bg-surface-app"
          aria-hidden
        />

        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden
        />

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            right-[var(--header-px)]
            top-[15%]
            size-[clamp(12rem,55cqi,15rem)]
            opacity-90
          "
          style={{
            backgroundImage: "url('/logo.svg')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />

        <Button
          variant="ghost"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="
            icon-button
            absolute
            right-[var(--header-px)]
            top-4
            z-10
            rounded-full
            text-text-ds-tertiary
            hover:text-text-ds-primary
          "
        >
          <X
            aria-hidden
            className="size-[var(--icon-size)]"
          />
        </Button>

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[var(--page-max)]
            px-[var(--header-px)]
            pt-[var(--header-height)]
          "
        >
          <ul
            className="
              flex
              flex-col
              gap-[var(--nav-gap)]
              border-t
              border-white/10
              pt-6
            "
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <MobileLink
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  data-testid={`${item['data-testid']}-mobile`}
                >
                  {item.label}
                </MobileLink>
              </li>
            ))}
          </ul>

          <div
            className="
              mt-6
              flex
              gap-[var(--header-gap)]
              border-t
              border-white/10
              pt-6
            "
          >
            <div className="min-w-0 flex-1">
              <Button
                variant="glass"
                href="/login"
                fullWidth
                leftIcon={
                  <User
                    aria-hidden
                    className="size-[var(--icon-size)]"
                  />
                }
                data-testid="mobile-login"
              >
                Log in
              </Button>
            </div>

            <div className="min-w-0 flex-1">
              <Button
                variant="primary"
                href="/register"
                fullWidth
                data-testid="mobile-signup"
              >
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
    onAnchorClick: (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
    ) => void;
  }>
) {
  const { href, onAnchorClick } = props;

  return (
    <Link
      href={href}
      data-testid={props['data-testid']}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
        onAnchorClick(e, href)
      }
      className="
        nav-item
        relative
        rounded
        font-heading
        font-semibold
        uppercase
        tracking-[0.18em]
        text-text-secondary
        outline-none
        hover:text-gold-400
        focus-visible:ring-2
        focus-visible:ring-[rgba(255,215,0,0.7)]
        focus-visible:ring-offset-0
        after:absolute
        after:bottom-[-4px]
        after:left-[var(--nav-item-px)]
        after:right-[var(--nav-item-px)]
        after:h-px
        after:origin-left
        after:scale-x-0
        after:rounded-full
        after:bg-[var(--action-primary-bg)]
        after:transition-transform
        after:duration-[var(--header-transition)]
        hover:after:scale-x-100
        focus-visible:after:scale-x-100
      "
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
      className="
        nav-item
        w-full
        justify-start
        rounded-md
        font-heading
        font-semibold
        uppercase
        tracking-[0.16em]
        text-text-secondary
        transition-colors
        hover:bg-white/5
        hover:text-gold-400
        focus-visible:ring-2
        focus-visible:ring-[rgba(255,215,0,0.7)]
      "
    >
      {props.children}
    </Link>
  );
}