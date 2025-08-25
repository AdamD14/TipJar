'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> & {
  href?: string;          // domyślnie /register
  label?: string;         // domyślnie "Creare profil"
  className?: string;
};

export default function CtaGoldButton({
  href = '/register',
  label = 'create profil',
  className,
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        // --- TWÓJ oryginalny zestaw klas (neomorficzny styl) ---
        'inline-flex items-center justify-center rounded-xl px-6 py-3 text-2xl font-bold tracking-wide cursor-pointer transition-all duration-400',
        'text-[#000108]  border-2 border-solid border-yellow-500',
        'shadow-[inset_4px_4px_8px_#A98C22,inset_-4px_-4px_8px_#ffeb99]',
        'hover:shadow-[rgba(45,35,66,0.3)_0_4px_8px,rgba(45,35,66,0.2)_0_7px_13px_-3px,#fff500_0_-3px_0_inset] hover:translate-y-[-2px] hover:scale-[1.02]',
        '[&>span.arrow]:transition-transform [&>span.arrow]:duration-500 [&>span.arrow]:hover:translate-x-2',
        'active:shadow-[inset_8px_8px_16px_#A98C22,inset_-8px_-8px_16px_#ffeb99] active:scale-[0.98]',
        'focus:shadow-[inset_2.5px_2.5px_0_#fff500,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#dbb900_-3px_0_0_inset]',
        className
      )}
      style={{
        borderRadius: '16px',
        background: 'linear-gradient(45deg, #e6c200, #ffe600)',
        filter:
          "progid: DXImageTransform.Microsoft.gradient( startColorstr='#FBEB00', endColorstr='#FFEC12', GradientType=1 )",
      }}
      {...rest}
    >
      <span className="transition-transform duration-400">{label}</span>
      <span className="ml-2 font-black arrow">»</span>
    </Link>
  );
}
