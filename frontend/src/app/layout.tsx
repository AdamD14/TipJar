import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';

import { Providers } from './providers'; // Importujemy nasz wrapper dla wagmi

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: 'TipJar+',
    template: '%s | TipJar+',
  },
  description: 'Instant micro-payments for your favourite creators',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans min-h-screen bg-tj-turquoise text-white">
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
