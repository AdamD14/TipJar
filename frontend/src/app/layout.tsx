import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Providers } from './providers'; // Importujemy nasz wrapper dla wagmi

export const metadata: Metadata = {
  title: {
    default: 'TipJar+',
    template: '%s | TipJar+',
  },
  description: 'Instant micro-payments for your favourite creators',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-[#551655] to-[#471347]">
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
