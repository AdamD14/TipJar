import { api } from "./api/http";
import { API } from "./api-routes";

export async function fetchNotifications() {
  const { data } = await api.get(API.NOTIFICATIONS);
  return data;
}
