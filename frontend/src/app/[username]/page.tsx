// app/[username]/page.tsx

type RouteParams = {
  username: string;
};

export default function CreatorProfile({
  params,
}: {
  params: RouteParams;
}) {
  const { username } = params;

  return (
    <main
      className="min-h-screen bg-[#F0F4F4]"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* górny baner z nazwą twórcy */}
      <section className="bg-[#003737] text-white p-8">
        <h1 className="text-5xl font-bold">@{username}</h1>

        <p className="mt-2 text-lg">
          Thanks for stopping by&nbsp;
          <span className="font-semibold">@{username}</span>’s page!
        </p>

        {/* pasek postępu celu */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD700] rounded-full"
              style={{ width: '60%' }}
            />
          </div>
          <p className="mt-1 text-sm">
            Goal&nbsp;•&nbsp;$5 000&nbsp;—&nbsp;60 % achieved
          </p>
        </div>

        {/* przycisk tipowania */}
        <button className="mt-6 rounded bg-[#FFD700] px-4 py-2 text-[#003737] font-medium hover:opacity-90">
          Send tip
        </button>
      </section>

      {/* ostatnie wsparcia */}
      <section className="p-8 text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Recent supporters</h2>
        <ul className="space-y-1">
          <li>Alice — $50</li>
          <li>
            Bob — $20&nbsp;<span className="italic text-sm">(“Great stream!”)</span>
          </li>
          <li>Anonymous — $5</li>
        </ul>
      </section>
    </main>
  );
}
