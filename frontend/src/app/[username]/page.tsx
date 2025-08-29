"use client";
import Image from "next/image";
import Link from "next/link";
import TipLauncher from "@/components/TipLauncher";
import SubscribeLauncher from "@/components/SubscribeLauncher";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPublicProfile } from "@/lib/users";

type PublicProfile = {
  avatarUrl?: string;
  profile?: { bannerUrl?: string; bio?: string };
  displayName?: string;
  username?: string;
  tiers?: unknown[];
};

export default function CreatorProfile() {
  const { username } = useParams<{ username: string }>();
  const [data, setData] = useState<PublicProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res: unknown = await getPublicProfile(username);
        if (!alive) return;
        setData(res as PublicProfile);
      } catch (e: unknown) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Profile not found");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl mt-10 p-6 text-white/80">Loading profile…</div>
    );
  }
  if (error || !data) {
    return (
      <div className="mx-auto max-w-4xl mt-10 p-6 text-white/80">
        <p>Profile not found.</p>
        <Link href="/" className="underline">Go home</Link>
      </div>
    );
  }

  const avatar = data.avatarUrl || "/placeholder_light_gray_block.png";
  const banner = data.profile?.bannerUrl || "";
  const bio = data.profile?.bio || "";
  const displayName = data.displayName || data.username || username;

  return (
    <div className="mx-auto max-w-4xl mt-6">
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <div className="h-48 bg-gray-200 relative">
          {banner && (
            <Image src={banner} alt="Banner" fill style={{ objectFit: "cover" }} />
          )}
        </div>
        <div className="absolute -bottom-12 left-6 rounded-full border-4 border-white w-24 h-24 overflow-hidden">
          <Image src={avatar} alt="Avatar" fill style={{ objectFit: "cover" }} />
        </div>
      </div>

      <div className="mt-16 px-6">
        <h1 className="text-3xl font-semibold text-white">{displayName}</h1>
        <p className="text-teal-400 mt-1">@{data.username || username}</p>
        {bio && <p className="mt-4 text-white/80">{bio}</p>}
      </div>

      <div className="px-6 mt-8 flex items-center gap-3">
        <TipLauncher username={data.username || username} />
        {Array.isArray(data?.tiers) && data.tiers.length > 0 && (
          <SubscribeLauncher username={data.username || username} tiers={data.tiers} />
        )}
      </div>
    </div>
  );
}
