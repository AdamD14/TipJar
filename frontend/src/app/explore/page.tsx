import SearchBar from '@/components/explore/SearchBar';
import CreatorCard from '@/components/explore/CreatorCard';

export const metadata = {
  title: 'Explorer — tipjar+',
  description: 'Znajdź twórców i wysyłaj napiwki.',
  alternates: { canonical: '/explore' },
  robots: { index: true, follow: true },
};

export default function ExplorePage() {
  const creators = [
    { name: 'Agnieszka', alias: 'aga_music', avatarUrl: '', category: 'muzyka', stats: { tips: 120 } },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Odkrywaj twórców</h1>
      <SearchBar />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creators.map((c) => (
          <CreatorCard key={c.alias} {...c} />
        ))}
      </div>
    </main>
  );
}

