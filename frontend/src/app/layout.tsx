"use client";

import { ReactNode, useEffect, useState } from 'react';
import './globals.css';
import type { Metadata } from 'next';

import { Providers } from './providers'; // Importujemy nasz wrapper dla wagmi

const bgClasses = ['bg-fio', 'bg-tu'];

export const metadata: Metadata = {
  title: {
    default: 'TipJar+',
    template: '%s | TipJar+',
  },
  description: 'Instant micro-payments for your favourite creators',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const [bgClass, setBgClass] = useState('');

  useEffect(() => {
    const randomClass = bgClasses[Math.floor(Math.random() * bgClasses.length)];
    setBgClass(randomClass);
  }, []);

  return (
    <html lang="en">
      <body className={`${bgClass} bg-cover bg-center bg-fixed min-h-screen`}>
        {/*
          Opakowujemy całą aplikację w Providers.
          To sprawia, że hooki z wagmi (do obsługi portfela)
          będą dostępne w każdym komponencie.
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
