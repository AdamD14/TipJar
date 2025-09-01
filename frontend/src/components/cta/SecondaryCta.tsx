// frontend/src/components/cta/SecondaryCta.tsx
'use client';

import Link from 'next/link';
import * as React from 'react';

type AnchorCtaProps = { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonCtaProps = { href?: never } & React.ButtonHTMLAttributes<HTMLButtonElement>;

type SharedProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  analyticsId?: string;
  ariaLabel?: string;
};

export type SecondaryCtaProps = (AnchorCtaProps | ButtonCtaProps) & SharedProps;

function Spinner(): JSX.Element {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent"
    />
  );
}

function isAnchorProps(p: SecondaryCtaProps): p is AnchorCtaProps & SharedProps {
  return typeof (p as { href?: unknown }).href === 'string';
}

/** Secondary CTA — outline, size parity with Primary, gentle hover scale */
export default function SecondaryCta(props: SecondaryCtaProps): JSX.Element {
  const { children = 'Explore as a Fan', isLoading = false, analyticsId, ariaLabel, ...rest } = props;

const base =
  'inline-flex items-center justify-center gap-2 h-12 px-8 text-lg font-bold rounded-[16px] ' +
  'border-[3px] border-[#FFF500]/80 text-[#FFF500] bg-transparent ' +
  'shadow-[0_8px_18px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.70),inset_0_-6px_10px_rgba(0,0,0,0.12)] ' +
  'transition-colors transform-gpu will-change-transform transition-transform duration-150 ' +
  'hover:scale-[1.015] active:translate-y-[1px] ' +
  'hover:border-[#FFFF00] hover:text-[#FFd700] ' +
  'hover:bg-[rgba(255,200,0,0.10)] active:bg-[rgba(255,215,0,0.20)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737] ' +
  'disabled:opacity-60 disabled:cursor-not-allowed';

  if (isAnchorProps(props)) {
    const { href, onClick, ...anchorAttrs } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isLoading) { e.preventDefault(); return; }
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
        <span className={isLoading ? 'opacity-0' : 'opacity-100'}>{children}</span>
      </Link>
    );
  }

  const { onClick, disabled, ...btnAttrs } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

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
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>{children}</span>
    </button>
  );
}
