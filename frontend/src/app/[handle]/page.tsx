import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';   // SSR na każde żądanie

// ───────────────────────────────────────────────────────────
//  Strona profilu
// ───────────────────────────────────────────────────────────
export default async function CreatorPage({
  params,
}: {
  params: { handle: string };
}) {
  /* 1️⃣  czekamy na params, spełniając wymóg Next */
  const { handle } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center text-white bg-[#0d2f3f]">
      <h1 className="text-4xl font-bold">Profile placeholder for @{handle}</h1>
    </main>
  );
}

// ───────────────────────────────────────────────────────────
//  SEO / OG – tu też używamy await params
// ───────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: { handle: string } }
): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: `Support @${handle} on TipJar+`,
    metadataBase: new URL('http://localhost:3000'),  // ← PROD: env SITE_URL
    openGraph: { images: [`/api/og?handle=${handle}`] },
  };
}
