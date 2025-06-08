import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TipJar - Wspieraj Twórców',
  description: 'Platforma mikropłatności Web3 dla twórców treści.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} font-sans bg-teal-900`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}