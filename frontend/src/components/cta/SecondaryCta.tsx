// frontend/src/components/cta/SecondaryCta.tsx
'use client';

import Link from 'next/link';
import React from 'react';

export type SecondaryCtaProps =
  | ({ href: string; onClick?: never } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: never; onClick: React.MouseEventHandler<HTMLButtonElement> } & React.ButtonHTMLAttributes<HTMLButtonElement>);

type CommonProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  analyticsId?: string;
  ariaLabel?: string;
};

/** Secondary CTA — Gold Outline, Rounded-12, md (h-11). Default route: /discover */
export default function SecondaryCta(props: SecondaryCtaProps & CommonProps) {
  const {
    children = 'Explore Creators',
    isLoading = false,
    analyticsId,
    ariaLabel,
    ...rest
  } = props as any;

  const base =
    'inline-flex items-center justify-center gap-2 h-11 px-5 text-base font-medium rounded-[12px] ' +
    'border border-[#FFD700CC] text-[#FFD700] bg-transparent transition ' +
    'hover:bg-[rgba(255,215,0,0.12)] active:bg-[rgba(255,215,0,0.20)] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737] ' +
    'disabled:opacity-60 disabled:cursor-not-allowed';

  const spinner = (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#FFD700] border-t-transparent"
    />
  );

  if ('href' in props && props.href) {
    const { href, ...a } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link
        href={href || '/discover'}
        aria-label={ariaLabel || String(children)}
        data-analytics-id={analyticsId || 'cta-explore'}
        className={base}
        aria-busy={isLoading || undefined}
        aria-disabled={isLoading ? true : undefined}
        onClick={(e) => {
          if (isLoading) e.preventDefault();
          (a.onClick as any)?.(e);
        }}
      >
        {isLoading ? spinner : null}
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
      data-analytics-id={analyticsId || 'cta-explore'}
      className={base}
      disabled={isLoading || btn.disabled}
      aria-busy={isLoading || undefined}
      {...btn}
    >
      {isLoading ? spinner : null}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>{children}</span>
    </button>
  );
}
