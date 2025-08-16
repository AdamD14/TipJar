import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Mukta, IBM_Plex_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from './providers'; // wrapper dla wagmi

// Konfiguracja czcionek
const bodyFont = Mukta({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Regular, Medium, Bold
  variable: '--font-body',
});

const uiFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ui',
});

// SEO metadata
export const metadata: Metadata = {
  title: {
    default: 'tipjar+',
    template: '%s | tipjar+',
  },
  description: 'Platform for supporting your favorite creators in USDC',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-gradient-main text-white antialiased font-sans',
          bodyFont.variable,
          uiFont.variable
        )}
      >
        {/* 
          Opakowujemy całą aplikację w Providers.
          Dzięki temu hooki z wagmi (portfel) 
          są dostępne w każdym komponencie. 
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
