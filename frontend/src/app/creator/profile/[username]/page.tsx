"use client";
import { notFound } from "next/navigation";
import Image from "next/image";

interface CreatorProfileProps {
  params: { username: string };
}

/**
 * Public creator profile page
 *
 * This dynamic route fetches the creator's public profile by username and
 * renders a hero section with avatar, display name and tagline, an About
 * section, quick tip panel with suggested amounts, a slider for custom
 * donations and a list of recent supporters.  If the creator does not exist
 * the page returns a 404 via notFound().  The actual data fetching is
 * currently mocked – integrate with your backend API or database as needed.
 */
async function fetchCreator(username: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile/${username}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const user = await res.json();
    return {
      username: user.username,
      displayName: user.displayName,
      tagline: "",
      bio: user.profile?.bio ?? "",
      avatarUrl: user.avatarUrl || "/placeholder_light_gray_block.png",
      bannerUrl: user.profile?.bannerUrl || "/placeholder_light_gray_block.png",
      goal: 0,
      raised: 0,
      quickAmounts: [1, 5, 10, 25],
      accentColor: "#1EB589",
      supporters: [],
      donationAddress: user.mainWalletAddress || "",
    };
  } catch {
    return null;
  }
}

export default async function CreatorProfile({ params }: CreatorProfileProps) {
  const data = await fetchCreator(params.username);
  if (!data) return notFound();
  return (
    <div className="mx-auto max-w-4xl mt-6">
      {/* Hero section */}
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <div className="h-48 bg-gray-200 relative">
          {data.bannerUrl && (
            <Image
              src={data.bannerUrl}
              alt="Banner"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="absolute -bottom-12 left-6 rounded-full border-4 border-white w-24 h-24 overflow-hidden">
          <Image
            src={data.avatarUrl}
            alt="Avatar"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="mt-16 px-6">
        <h1 className="text-3xl font-semibold">{data.displayName}</h1>
        <p className="text-teal-600 mt-1">@{data.username}</p>
        <p className="mt-4 text-gray-700">{data.bio}</p>
        {/* Social links placeholder – update when available */}
        <div className="flex space-x-4 mt-4">{/* Icons would go here */}</div>
      </div>
      {/* Fundraising stats */}
      <div className="px-6 mt-8 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-medium">${data.raised.toFixed(0)}</span>
          <span className="text-gray-500">raised</span>
        </div>
        <div className="h-2 flex-1 bg-gray-200 rounded">
          <div
            className="h-full rounded"
            style={{
              width: `${(data.raised / data.goal) * 100}%`,
              backgroundColor: data.accentColor,
            }}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-medium">
            {((data.raised / data.goal) * 100).toFixed(0)}%
          </span>
          <span className="text-gray-500">of ${data.goal}</span>
        </div>
      </div>
      {/* Tip panel */}
      <div className="px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suggested amounts */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Support with a quick tip</h2>
          <div className="flex flex-wrap gap-3">
            {data.quickAmounts.map((amt) => (
              <button
                key={amt}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>
        {/* Custom amount slider */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Custom amount</h2>
          {/* slider placeholder – integrate with component library if available */}
          <input type="range" min="1" max="100" className="w-full" />
          <button className="mt-4 w-full px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
            Send Tip
          </button>
        </div>
      </div>
      {/* Donation address / QR */}
      <div className="px-6 mt-10">
        <h2 className="font-semibold mb-2">Donation address</h2>
        <p className="font-mono text-gray-700 break-all">
          {data.donationAddress}
        </p>
        {/* A QR code could be generated and rendered here via a library */}
      </div>
      {/* Recent supporters */}
      <div className="px-6 mt-10">
        <h2 className="font-semibold mb-4">Recent Supporters</h2>
        <ul className="space-y-2">
          {data.supporters.map((s, idx) => (
            <li key={idx} className="border-b pb-2 flex justify-between">
              <span className="font-medium">{s.name}</span>
              <span>${s.amount}</span>
              <span className="text-gray-500">{s.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
