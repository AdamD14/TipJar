import { http } from "./http";
import { API } from "./api-routes";

export async function fetchNotifications() {
  return http(API.NOTIFICATIONS, { method: "GET" });
}
