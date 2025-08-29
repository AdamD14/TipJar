import { API } from "./api-routes";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ""; // np. http://localhost:3001

export type FetchOpts = RequestInit & { json?: any; _noRetry?: boolean };

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
  const payload = await parse(res);

  if (res.status === 401 && !opts._noRetry && shouldRetry(path)) {
    const ok = await tryRefresh();
    if (ok) return http(path, { ...opts, _noRetry: true });
  }
  if (!res.ok) throw new Error(msg(payload, res.status));
  return payload;
}

function shouldRetry(path: string) {
  const blocked = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];
  return !blocked.some((b) => path.includes(b));
}

async function tryRefresh() {
  try {
    const res = await fetch(`${API_BASE}${API.AUTH.REFRESH}`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function parse(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

function msg(data: any, code: number) {
  return (data && (data.message || data.error)) || `HTTP ${code}`;
}
