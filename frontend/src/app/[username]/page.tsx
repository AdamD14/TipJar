import React from "react";

/**
 * Dynamic creator profile page.
 * Lives under /app/[username]/page.tsx in the new (App Router) structure.
 *
 * 👉 100 % free of metadata & Head exports – just a plain component that
 *    receives the `username` param from the route and renders some mock UI.
 */

type CreatorProfilePageProps = {
  params: {
    username: string;
  };
};

export default function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  const { username } = params;

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: "#F0F4F4" }}>
      {/* TOP BANNER */}
      <section className="bg-[#003737] text-white p-8">
        <h1 className="text-5xl font-bold">@{username}</h1>
        <p className="mt-2 text-lg">
          Welcome to @{username}&apos;s profile! Thank you for your support.
        </p>

        {/* GOAL PROGRESS */}
        <div className="mt-6 max-w-xl">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div className="bg-[#FFD700] h-full" style={{ width: "60%" }} />
          </div>
          <p className="mt-1">Goal: $5000 (60% reached)</p>
        </div>

        <button className="mt-6 bg-[#FFD700] text-[#003737] py-2 px-6 rounded">
          Send Tip
        </button>
      </section>

      {/* RECENT SUPPORTERS */}
      <section className="p-8">
        <h2 className="text-2xl mb-4 text-[#003737]">Recent Supporters</h2>
        <ul className="space-y-1 text-gray-800 list-disc pl-5">
          <li>Alice — $50</li>
          <li>Bob — $20 (Great stream!)</li>
          <li>Anonymous — $5</li>
        </ul>
      </section>
    </main>
  );
}
