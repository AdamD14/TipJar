// frontend/src/components/cta/PrimaryCta.tsx
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

export type PrimaryCtaProps = AnchorCtaProps | ButtonCtaProps;

type CommonProps = {
  children?: React.ReactNode;     // Default: "Begin as a Creator"
  isLoading?: boolean;
  analyticsId?: string;
  ariaLabel?: string;
};

function Spinner(): JSX.Element {
  return (
    <span
      aria-hidden
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#E6C200] border-t-transparent"
    />
  );
}

function isAnchorProps(p: PrimaryCtaProps): p is AnchorCtaProps {
  return typeof (p as { href?: unknown }).href === 'string';
}

/** Primary CTA — glossy gold; ten sam kształt/cienie; podmienione TYLKO kolory gradientu */
export default function PrimaryCta(
  props: PrimaryCtaProps & CommonProps,
): JSX.Element {
  const {
    children = 'Begin as a Creator',
    isLoading = false,
    analyticsId,
    ariaLabel,
    ...passthrough
  } = props as PrimaryCtaProps & CommonProps;

  const base =
    'group relative inline-flex items-center justify-center gap-2 h-12 px-8 text-lg font-ui font-bold rounded-[16px] ' +
    'text-[#0A0A0A] ' +
    // kolory gradientu (base/hover/active)
    'bg-[linear-gradient(180deg,#FFE658_0%,#FFD700_40%,#B38F00_100%)] ' +
    'hover:bg-[linear-gradient(180deg,#FFF085_0%,#FFE331_40%,#C19A00_100%)] ' +
    'active:bg-[linear-gradient(180deg,#E6C200_0%,#E0B700_38%,#A07600_100%)] ' +
    // cienie/efekty jak było
    'shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-black/10 ' +
    'transform-gpu will-change-transform transition-transform transition-colors duration-150 hover:scale-[1.015] active:translate-y-[1px] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A0F14] ' +
    'disabled:opacity-60 disabled:cursor-not-allowed ' +
    `${styles.sheen} ${styles.bevel}`;

  if (isAnchorProps(props)) {
    // MERGE className z zewnątrz, ale nie rozlewaj go do ...anchorAttrs
    const { href, onClick, className: outerClassName, ...anchorAttrs } = props as AnchorCtaProps & {
      className?: string;
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isLoading) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <Link
        href={href || '/onboarding/start'}
        aria-label={ariaLabel || String(children)}
        data-analytics-id={analyticsId || 'cta-begin'}
        className={`${base} ${outerClassName ?? ''}`}
        aria-busy={isLoading || undefined}
        aria-disabled={isLoading ? true : undefined}
        onClick={handleClick}
        {...anchorAttrs}
      >
        {isLoading ? <Spinner /> : null}
        <span
          className={
            (isLoading ? 'opacity-0' : 'opacity-100') +
            ' transition-colors group-hover:text-[#003737]'
          }
        >
          {children}
        </span>
      </Link>
    );
  }

  const { onClick, disabled, className: outerClassName, ...btnAttrs } = passthrough as ButtonCtaProps & {
    className?: string;
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleBtnClick}
      aria-label={ariaLabel || String(children)}
      data-analytics-id={analyticsId || 'cta-begin'}
      className={`${base} ${outerClassName ?? ''}`}
      disabled={isLoading || Boolean(disabled)}
      aria-busy={isLoading || undefined}
      {...btnAttrs}
    >
      {isLoading ? <Spinner /> : null}
      <span
        className={
          (isLoading ? 'opacity-0' : 'opacity-100') +
          ' transition-colors group-hover:text-white'
        }
      >
        {children}
      </span>
    </button>
  );
}
