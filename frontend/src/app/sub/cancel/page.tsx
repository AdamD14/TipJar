export default function Page({ searchParams }:{ searchParams:{ u?:string; tier?:string } }) {
  const u = searchParams.u || '';
  return (
    <main className="min-h-[60vh] grid place-items-center bg-[#003737] text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Checkout cancelled</h1>
        <p className="text-white/70 mt-2">No subscription has been created.</p>
        <a href={`/@${u}`} className="mt-6 inline-block px-4 py-2 rounded-lg border border-white/20">Back to profile</a>
      </div>
    </main>
  );
}

