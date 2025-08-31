// frontend/src/components/cta/PrimaryCta.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import styles from './cta.module.css';

export type PrimaryCtaProps =
  | ({ href: string; onClick?: never } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: never; onClick: React.MouseEventHandler<HTMLButtonElement> } & React.ButtonHTMLAttributes<HTMLButtonElement>);

type CommonProps = {
  /** Label (Title Case, EN). Default: "Begin as a Creator" */
  children?: React.ReactNode;
  /** Loading state blocks interaction and shows spinner */
  isLoading?: boolean;
  /** data-analytics-id for CTR tracking */
  analyticsId?: string;
  /** aria-label for SR users; default mirrors text */
  ariaLabel?: string;
};

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#E6C200] border-t-transparent"
    />
  );
}

/** Primary CTA — Gold Solid, Pill, lg (h-12). Default route: /onboarding/start */
export default function PrimaryCta(props: PrimaryCtaProps & CommonProps) {
  const {
    children = 'Begin as a Creator',
    isLoading = false,
    analyticsId,
    ariaLabel,
    ...rest
  } = props as any;

  const base =
    'relative inline-flex items-center justify-center gap-2 h-12 px-6 text-lg font-semibold rounded-full ' +
    'bg-[#FFD700] text-[#0B0F12] shadow-[0_6px_16px_rgba(255,215,0,0.18)] ' +
    'transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737] ' +
    'hover:bg-[#E6C200] active:bg-[#C9A500] disabled:opacity-60 disabled:cursor-not-allowed ' +
    styles.sheen;

  if ('href' in props && props.href) {
    const { href, ...a } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link
        href={href || '/onboarding/start'}
        aria-label={ariaLabel || String(children)}
        data-analytics-id={analyticsId || 'cta-begin'}
        className={base}
        aria-busy={isLoading || undefined}
        aria-disabled={isLoading ? true : undefined}
        onClick={(e) => {
          if (isLoading) e.preventDefault();
          (a.onClick as any)?.(e);
        }}
      >
        {isLoading ? <Spinner /> : null}
        <span className={isLoading ? 'opacity-0' : 'opacity-100'}>{children}</span>
      </Link>
    );
  }

  const { onClick, ...btn } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || String(children)}
      data-analytics-id={analyticsId || 'cta-begin'}
      className={base}
      disabled={isLoading || btn.disabled}
      aria-busy={isLoading || undefined}
      {...btn}
    >
      {isLoading ? <Spinner /> : null}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>{children}</span>
    </button>
  );
}
