"use client";
import { useState } from "react";
import { TipModal } from "@/components/TipModal";
import { FanWall } from "@/components/FanWall";
import { Button } from "@/components/Button";

export default function CreatorProfilePage({ params }: { params: { handle: string } }) {
  const [open, setOpen] = useState(false);
  // In real app, fetch profile by handle
  const creator = {
    handle: params.handle,
    name: params.handle.replace(/(^.|_.)/g, (m) => m.toUpperCase()),
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    bio: "Short bio about the creator.",
  };
  const fans = Array.from({ length: 14 }).map((_, i) => ({
    id: String(i),
    avatarUrl: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
    amount: i % 3 ? 3 : 5,
    timeAgo: `${i + 1}h`,
  }));
  return (
    <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
      {/* Left column */}
      <div>
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={creator.avatarUrl}
            alt={creator.name}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {creator.name}{" "}
              <span className="align-middle text-base text-[#FFD700]">✔</span>
            </h1>
            <p className="text-white/70">@{creator.handle}</p>
          </div>
        </div>
        <p className="mt-4 text-white/80">{creator.bio}</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => setOpen(true)} variant="gold">
            Wesprzyj / Tip
          </Button>
          <Button variant="outline">Subscribe NFT</Button>
        </div>
        <section className="mt-10">
          <h2 className="text-xl font-bold">Latest tips</h2>
          <div className="mt-3 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#140a2a] p-3"
              >
                <div className="flex justify-between text-sm">
                  <span>Fan {i + 1}</span>
                  <span className="text-white/70">{i % 2 ? 3 : 5} USDC</span>
                </div>
                <p className="mt-1 text-sm text-white/80">
                  Great work! Keep it up.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Right column */}
      <aside className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-[#140a2a] p-4">
          <h3 className="font-semibold">Recent supporters</h3>
          <div className="mt-3">
            <FanWall fans={fans} />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#140a2a] p-4">
          <h3 className="font-semibold">Socials</h3>
          <ul className="mt-2 space-y-1 text-sm text-white/80">
            <li>X: @{creator.handle}</li>
            <li>Youtube: /{creator.handle}</li>
            <li>Twitch: /{creator.handle}</li>
          </ul>
        </div>
      </aside>
      <TipModal
        open={open}
        onClose={() => setOpen(false)}
        creator={{ name: creator.name, handle: creator.handle }}
      />
    </div>
  );
}
