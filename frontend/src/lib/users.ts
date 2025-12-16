import { api } from "./api/http";
import { API } from "./api-routes";

export async function checkUsername(u: string) {
  const q = new URLSearchParams({ username: u }).toString();
  const { data } = await api.get(`${API.USERS.USERNAME_CHECK}?${q}`);
  return data;
}
export async function setUsername(username: string) {
  // Deprecated: use setUsernameAndConsents in onboarding flow.
  const { data } = await api.post(API.USERS.SET_USERNAME, { username });
  return data;
}

export async function setUsernameAndConsents(
  username: string,
  consents: { terms: boolean; privacy: boolean; age: boolean; marketing?: boolean },
) {
  const payload = { username, consents };
  const { data } = await api.post(API.USERS.SET_USERNAME, payload);
  return data;
}

export async function getPublicProfile(username: string) {
  const path = API.USERS.PUBLIC_BY_USERNAME.replace(
    ":username",
    encodeURIComponent(username),
  );
  const { data } = await api.get(path);
  return data;
}
