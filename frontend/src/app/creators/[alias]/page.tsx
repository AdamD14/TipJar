export default function CreatorAliasPage({ params }: { params: { alias: string } }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-[#DDE0DA]">Creator: {params.alias}</h1>
      <p className="mt-2 text-sm text-[#BCC1B6]">Profile details coming soon.</p>
    </main>
  );
}
