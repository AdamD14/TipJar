// frontend/src/components/cta/SecondaryCta.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import styles from './cta.module.css';

type AnchorCtaProps = {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonCtaProps = {
  href?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type SecondaryCtaProps = AnchorCtaProps | ButtonCtaProps;

type CommonProps = {
  children?: React.ReactNode;    // Default: "Explore as a Fan"
  isLoading?: boolean;
  analyticsId?: string;
  ariaLabel?: string;
};

function Spinner(): JSX.Element {
  return (
    <span
      aria-hidden
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#4d194d] border-t-transparent"
    />
  );
}

function isAnchorProps(
  p: SecondaryCtaProps,
): p is AnchorCtaProps {
  return typeof (p as { href?: unknown }).href === 'string';
}

/** Secondary CTA — glossy purple; kształt/cienie jak było, podmienione TYLKO kolory gradientu */
export default function SecondaryCta(
  props: SecondaryCtaProps & CommonProps,
): JSX.Element {
  const {
    children = 'Explore as a Fan',
    isLoading = false,
    analyticsId,
    ariaLabel,
    ...passthrough
  } = props as SecondaryCtaProps & CommonProps;

  const base =
    'group relative inline-flex items-center justify-center gap-2 h-12 px-10 text-lg font-ui font-bold rounded-[16px] ' +
    'text-white ' +
    // ⬇️ PODMIANA TYLKO KOLORÓW GRADIENTU (reszta bez zmian)
    'bg-[linear-gradient(180deg,#5a2b5a_0%,#4d194d_40%,#2b0f2b_100%)] ' +                          // base
    'hover:bg-[linear-gradient(180deg,#7a347a_0%,#4d194d_40%,#3a113a_100%)] ' +                     // hover
    'active:bg-[linear-gradient(180deg,#541a54_0%,#451245_38%,#2b0f2b_100%)] ' +                    // active (zachowano 38%)
    // ⬆️ TYLKO kolory; wszystko poniżej jak w oryginale
    'shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-black/10 ' +
    'transform-gpu will-change-transform transition-transform transition-colors duration-150 hover:scale-[1.015] active:translate-y-[1px] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A0F14] ' +
    'disabled:opacity-60 disabled:cursor-not-allowed ' +
    `${styles.sheen} ${styles.bevel}`;

  if (isAnchorProps(props)) {
    const { href, onClick, ...anchorAttrs } = props as AnchorCtaProps;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isLoading) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <Link
        href={href || '/explore'}
        aria-label={ariaLabel || String(children)}
        data-analytics-id={analyticsId || 'cta-explore'}
        className={base}
        aria-busy={isLoading || undefined}
        aria-disabled={isLoading ? true : undefined}
        onClick={handleClick}
        {...anchorAttrs}
      >
        {isLoading ? <Spinner /> : null}
        <span
          className={
            (isLoading ? 'opacity-0' : 'opacity-100') +
            ' transition-colors group-hover:text-[#0A0A0A]'
          }
        >
          {children}
        </span>
      </Link>
    );
  }

  const { onClick, disabled, ...btnAttrs } = passthrough as ButtonCtaProps;

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleBtnClick}
      aria-label={ariaLabel || String(children)}
      data-analytics-id={analyticsId || 'cta-explore'}
      className={base}
      disabled={isLoading || Boolean(disabled)}
      aria-busy={isLoading || undefined}
      {...btnAttrs}
    >
      {isLoading ? <Spinner /> : null}
      <span
        className={
          (isLoading ? 'opacity-0' : 'opacity-100') +
          ' transition-colors group-hover:text-[#0A0A0A]'
        }
      >
        {children}
      </span>
    </button>
  );
}
