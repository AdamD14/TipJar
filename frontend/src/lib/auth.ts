import { http } from "./http";
import { API } from "./api-routes";

export type RegisterDto = {
  email: string;
  password: string;
  displayName?: string;
};
export type LoginDto = { email: string; password: string };

export async function register(dto: RegisterDto) {
  return http(API.AUTH.REGISTER, { method: "POST", json: dto });
}
export async function login(dto: LoginDto) {
  return http(API.AUTH.LOGIN, { method: "POST", json: dto });
}
export async function me() {
  return http(API.AUTH.ME, { method: "GET" });
}
export async function refresh() {
  return http(API.AUTH.REFRESH, { method: "POST" });
}
export async function logout() {
  return http(API.AUTH.LOGOUT, { method: "POST" });
}
