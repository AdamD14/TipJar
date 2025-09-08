'use client';

import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

type Props = {
  /** Stan ładowania – pokazuje spinner i blokuje kliknięcia. */
  isLoading?: boolean;
  /** Zablokowany przycisk. */
  disabled?: boolean;
  /** Treść widoczna (domyślnie „login"). */
  children?: React.ReactNode;
  /** Atrybut type – domyślnie "button". */
  type?: 'button' | 'submit' | 'reset';
  /** Href do przekierowania - domyślnie /login */
  href?: string;
  /** Zdarzenia i reszta atrybutów button. */
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LoginButton: React.FC<Props> = ({
  isLoading = false,
  disabled,
  children = 'Login',
  type = 'button',
  href = '/login',
  className = '',
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  const buttonElement = (
    <button
      type={type}
      aria-label="login"
      aria-busy={isLoading || undefined}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      className={[
        // Layout / typografia
        'relative inline-flex select-none items-center justify-center',
        'h-10  px-10 text-base font-ui font-bold',
        'rounded-[14px]',
        // „Mokre szkło" (glass) z kolorem teal
        'backdrop-blur-md',
        'bg-[#1a4d4d]/35',
        'border border-[#cfd6d8]/15',
        'text-[#DDE0DA]',
        // Cień (efekt wypukłości)
        'shadow-[0_8px_18px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.50),inset_0_-6px_10px_rgba(0,0,0,0.10)]',
        // Interakcje z kolorem teal
        'transition-all duration-200',
        'hover:bg-[#1a4d4d]/45 hover:scale-[1.02]',
        'active:scale-[0.99] active:bg-[#1a4d4d]/55',
        // Dostępność – focus-visible
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a4d4d]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f10]',
        // Blokada
        'disabled:opacity-60 disabled:cursor-not-allowed',
        // Pseudo-elementy tła z akcentem teal
        'before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none',
        'before:bg-[radial-gradient(12px_12px_at_20%_30%,rgba(26,77,77,0.12)_0%,rgba(26,77,77,0.00)_60%),radial-gradient(10px_10px_at_70%_60%,rgba(26,77,77,0.10)_0%,rgba(26,77,77,0.00)_70%)]',
        // Sheen z akcentem teal
        'after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none',
        'after:bg-gradient-to-r after:from-transparent after:via-[#1a4d4d]/25 after:to-transparent',
        'after:-translate-x-[140%] after:will-change-transform',
        'after:animate-sheen',
        className,
      ].join(' ')}
      {...rest}
    >
      {/* Spinner (CSS only) */}
      {isLoading && (
        <span
          aria-hidden
          className="absolute inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#1a4d4d]/70 border-t-transparent"
        />
      )}

      {/* Treść przycisku */}
      <span className={isLoading ? 'opacity-0' : 'opacity-100 flex items-center gap-2'}>
        <User size={16} />
        {children}
      </span>
    </button>
  );

  // Jeśli button jest disabled lub loading, nie wrapuj w Link
  if (isDisabled) {
    return buttonElement;
  }

  // W przeciwnym razie wrapuj w Link
  return (
    <Link href={href} className="inline-block">
      {buttonElement}
    </Link>
  );
};

export default LoginButton;