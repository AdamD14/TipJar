import { ReactNode } from 'react';
import './globals.css';
import type { Metadata } from 'next';

import { ibm, inter, mukta, playfair } from '@/fonts';
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
  const bgClass = bgClasses[Math.floor(Math.random() * bgClasses.length)];

  return (
    <html lang="en">
      <body
        className={`${bgClass} ${ibm.variable} ${inter.variable} ${mukta.variable} ${playfair.variable}`}
      >
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
