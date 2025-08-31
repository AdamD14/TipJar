import type { Metadata } from 'next';
import Page from '@/components/ui/Page';
import Card from '@/components/ui/Card';
import TipLauncher from '@/components/TipLauncher';

interface PageProps {
  params: { alias: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { alias } = params;
  return {
    title: `@${alias} — tipjar+`,
    description: `Profil twórcy @${alias}.`,
    alternates: { canonical: `/creators/${alias}` },
    robots: { index: true, follow: true },
  };
}

export default function CreatorProfilePage({ params }: PageProps) {
  const { alias } = params;
  return (
    <Page>
      <article className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-white">@{alias}</h1>
          <p className="text-[#DDE0DA]">
            Publiczny profil twórcy. Wyślij napiwek, aby okazać wsparcie.
          </p>
        </header>
        <Card>
          <TipLauncher username={alias} />
        </Card>
      </article>
    </Page>
  );
}

