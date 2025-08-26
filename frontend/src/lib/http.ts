export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ""; // np. ""

export type FetchOpts = RequestInit & { json?: any };

export async function http(path: string, opts: FetchOpts = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(opts.json ? { "Content-Type": "application/json" } : {}),
    ...(opts.headers as Record<string, string>),
  };
  const res = await fetch(url, {
    credentials: "include",
    ...opts,
    headers,
    body: opts.json ? JSON.stringify(opts.json) : opts.body,
  });
  let data: any = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(message);
  }
  return data;
}
