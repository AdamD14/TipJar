'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { ReactNode } from 'react';

export type SecondaryCtaProps = {
  href: string;
  children: ReactNode;
  ariaLabel: string;
  analyticsId?: string;
  className?: string;
};

export default function SecondaryCta({ href, children, ariaLabel, analyticsId, className }: SecondaryCtaProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      data-analytics-id={analyticsId}
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium',
        'border-[rgba(255,215,0,0.16)] text-[#DDE0DA] hover:bg-[rgba(255,215,0,0.08)]',
        'focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2',
        className,
      )}
    >
      {children}
    </Link>
  );
}
