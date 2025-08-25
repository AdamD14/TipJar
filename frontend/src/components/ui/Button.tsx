'use client';
import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'link';
type Size = 'sm' | 'md' | 'lg';

type BaseProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonLinkProps = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string; prefetch?: boolean };

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFD700] ring-offset-transparent ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
};

const variants: Record<Variant, string> = {
  // brand: złoto #FFD700, tło #003737
  primary:
    'bg-[#FFD700] text-[#003737] hover:brightness-110 active:brightness-95 shadow-sm',
  secondary:
    'border border-white/25 text-white hover:bg-white/10 active:bg-white/15',
  ghost:
    'text-white hover:bg-white/10 active:bg-white/15',
  link:
    'text-[#FFD700] hover:underline underline-offset-4',
};

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
      aria-hidden
    />
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  leftIcon,
  rightIcon,
  loading,
  className,
  children,
  ...props
}: ButtonProps) {
  const cls =
    `${base} ${sizes[size]} ${variants[variant]} ` +
    (fullWidth ? 'w-full ' : '') +
    (className || '');
  return (
    <button
      className={cls}
      aria-busy={loading || undefined}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}

export function ButtonLink({
  href,
  prefetch,
  variant = 'primary',
  size = 'md',
  fullWidth,
  leftIcon,
  rightIcon,
  loading,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cls =
    `${base} ${sizes[size]} ${variants[variant]} ` +
    (fullWidth ? 'w-full ' : '') +
    (className || '');
  return (
    <Link href={href} prefetch={prefetch} className={cls} aria-busy={loading || undefined} {...rest}>
      {loading ? <Spinner /> : leftIcon}
      <span>{children}</span>
      {rightIcon}
    </Link>
  );
}
