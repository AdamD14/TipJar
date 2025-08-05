import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import PurpleBackground from '@/components/PurpleBackground';
import { Providers } from './providers'; // Importujemy nasz wrapper dla wagmi

// Konfiguracja czcionki Montserrat z next/font
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans', // Definiujemy zmienną CSS dla naszej czcionki
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-screen font-sans text-white antialiased",
          montserrat.variable // Aplikujemy zmienną z czcionką do całego body
        )}
      >
        <PurpleBackground />
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
