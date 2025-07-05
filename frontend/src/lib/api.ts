export interface CreatorProfile {
  avatarUrl?: string | null;
  goal?: string | null;
}

export async function getCreatorProfile(handle: string): Promise<CreatorProfile> {
  // Placeholder implementation fetching from a future API
  try {
    const res = await fetch(`/api/profile?handle=${encodeURIComponent(handle)}`);
    if (res.ok) {
      const data = await res.json();
      return {
        avatarUrl: data.avatarUrl ?? null,
        goal: data.goal ?? null,
      };
    }
  } catch {
    // ignore errors and fall back to mock
  }
  return { avatarUrl: null, goal: null };
}
