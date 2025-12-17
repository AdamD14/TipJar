import { api } from "@/lib/api";
import { API } from "./api-routes";

export async function checkUsername(u: string) {
  const q = new URLSearchParams({ username: u }).toString();
  // api<T> returns the data directly, not { data }
  return api<{ available: boolean }>(`${API.USERS.USERNAME_CHECK}?${q}`);
}

export async function setUsername(username: string) {
  // Deprecated: use setUsernameAndConsents in onboarding flow.
  return api<void>(API.USERS.SET_USERNAME, {
    method: "POST",
    body: JSON.stringify({ username }),
  });
}

export async function setUsernameAndConsents(
  username: string,
  consents: { terms: boolean; privacy: boolean; age: boolean; marketing?: boolean },
) {
  const payload = { username, consents };
  return api<void>(API.USERS.SET_USERNAME, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getPublicProfile(username: string) {
  const path = API.USERS.PUBLIC_BY_USERNAME.replace(
    ":username",
    encodeURIComponent(username),
  );
  return api<any>(path);
}
