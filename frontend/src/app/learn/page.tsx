import type { Metadata } from 'next';
import Page from '@/components/ui/Page';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Learn — tipjar+',
  description: 'Centrum wiedzy o kryptowalutach i tipowaniu w USDC.',
  alternates: { canonical: '/learn' },
  robots: { index: true, follow: true },
};

const articles = [
  { title: 'Jak kupić USDC?' },
  { title: 'Polecane portfele' },
  { title: 'Czy to bezpieczne?' },
];

export default function LearnPage() {
  return (
    <Page>
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Centrum wiedzy</h1>
          <p className="text-[#DDE0DA]">Dowiedz się, jak zacząć korzystać z kryptowalut w TipJar.</p>
        </header>
        <ul className="space-y-4">
          {articles.map(({ title }) => (
            <li key={title}>
              <Card>
                <p className="text-lg font-medium text-[#FFD700]">{title}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

