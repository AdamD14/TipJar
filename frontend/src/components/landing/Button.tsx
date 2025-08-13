'use client';
import clsx from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-block font-bold rounded-md focus:outline-none transition transform';
  const sizeClasses =
    size === 'sm'
      ? 'px-4 py-2 text-sm'
      : size === 'lg'
      ? 'px-6 py-3 text-lg'
      : 'px-5 py-2.5 text-base';

  const variantClasses =
    variant === 'primary'
      ? 'bg-tj-gold text-tj-turquoise hover:brightness-110 active:brightness-90'
      : 'border border-tj-gold text-tj-gold bg-transparent hover:bg-tj-gold/10 active:bg-tj-gold/20';

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <button
      className={clsx(
        base,
        sizeClasses,
        variantClasses,
        disabled ? disabledClasses : 'hover:scale-105 active:scale-95',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
