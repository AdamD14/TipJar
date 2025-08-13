// app/discover/page.tsx
import Link from 'next/link';

export default function DiscoverPage() {
  const creators = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];
  return (
    <main className="min-h-screen p-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-4xl font-bold text-[#003737] mb-4">Discover Creators</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {creators.map((creator) => (
          <div key={creator} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl mb-2">@{creator}</h2>
            <p className="mb-4 text-gray-600">Bio or short description of {creator}.</p>
            <Link href={`/@${creator}`}>
              <button className="bg-[#FFD700] text-[#003737] py-2 px-4 rounded">View Profile</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
