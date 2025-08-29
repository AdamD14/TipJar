import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PublicProfile {
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  profile?: {
    bio?: string | null;
    bannerUrl?: string | null;
    websiteUrl?: string | null;
    twitterUrl?: string | null;
    youtubeUrl?: string | null;
  } | null;
}

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const raw = params.username;
  const username = raw.replace(/^@/, "");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const res = await fetch(
    `${baseUrl}/api/v1/users/profile/${encodeURIComponent(username)}`,
    { next: { revalidate: 60 } },
  );
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  const profile: PublicProfile = await res.json();
  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="flex flex-col items-center text-center gap-4">
        {profile.avatarUrl && (
          <Image
            src={profile.avatarUrl}
            alt={`${profile.displayName}'s avatar`}
            width={120}
            height={120}
            className="rounded-full"
          />
        )}
        <h1 className="text-3xl font-bold text-white">@{profile.username}</h1>
        {profile.profile?.bio && (
          <p className="text-gray-300 max-w-prose">{profile.profile.bio}</p>
        )}
        <Link
          href={`/tip/${profile.username}`}
          className="mt-4 px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Send Tip
        </Link>
      </div>
    </main>
  );
}

