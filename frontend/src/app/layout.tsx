import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TipJar - Wspieraj Twórców w USDC',
  description: 'Platforma mikropłatności i napiwków dla twórców treści.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="bg-tipjar-turquoise-dark text-tipjar-gray-light font-sans">
        <main>{children}</main>
      </body>
    </html>
  );
}
