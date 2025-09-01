import { api } from "./api/http";

// Simple UUID v4 matcher (case-insensitive)
const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuidV4(value: string): boolean {
  return UUID_V4_RE.test(value);
}

/**
 * Resolve a creator identifier from a route handle.
 * - If `handleOrId` is a UUID v4 → return as-is.
 * - Otherwise call a configurable endpoint to resolve username → id.
 *   Configure with `NEXT_PUBLIC_CREATOR_RESOLVE`.
 *   Examples:
 *     - "/api/v1/public/creators/:username" (uses path replacement)
 *     - "/api/v1/users/by-username" (query string ?username=)
 */
export async function resolveCreatorId(handleOrId: string): Promise<string> {
  if (isUuidV4(handleOrId)) return handleOrId;

  const base =
    process.env.NEXT_PUBLIC_CREATOR_RESOLVE || 
    "/api/v1/users/public/:username";
  let path: string;
  if (base.includes(":username")) {
    path = base.replace(":username", encodeURIComponent(handleOrId));
  } else {
    const sep = base.includes("?") ? "&" : "?";
    path = `${base}${sep}username=${encodeURIComponent(handleOrId)}`;
  }

  const { data } = await api.get(path);
  const id = data?.id || data?.user?.id || data?.creatorId || data?.data?.id;
  if (!id || typeof id !== "string") {
    throw new Error("Unknown creator");
  }
  return id;
}
