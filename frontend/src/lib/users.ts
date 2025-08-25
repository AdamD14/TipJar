import { http } from "./http";
import { API } from "./api-routes";

export async function checkUsername(u: string) {
  const q = new URLSearchParams({ username: u }).toString();
  return http(`${API.USERS.USERNAME_CHECK}?${q}`);
}
export async function setUsername(username: string) {
  return http(API.USERS.SET_USERNAME, { method: "POST", json: { username } });
}
