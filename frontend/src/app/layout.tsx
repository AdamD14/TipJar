import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { mukta, inter, ibm, playfair } from './fonts';
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mukta.variable} ${inter.variable} ${ibm.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-[#003737] font-sans text-white antialiased">
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
