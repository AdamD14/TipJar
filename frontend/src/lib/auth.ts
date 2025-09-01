import { api } from "./api/http";
import { API } from "./api-routes";

export type RegisterDto = {
  email: string;
  password: string;
  displayName?: string;
  role?: 'FAN' | 'CREATOR';
};
export type LoginDto = { email: string; password: string };

export async function register(dto: RegisterDto) {
  const { data } = await api.post(API.AUTH.REGISTER, dto);
  return data;
}
export async function login(dto: LoginDto) {
  const { data } = await api.post(API.AUTH.LOGIN, dto);
  return data;
}
export async function me() {
  const { data } = await api.get(API.AUTH.ME);
  return data;
}
export async function refresh() {
  const { data } = await api.post(API.AUTH.REFRESH);
  return data;
}
export async function logout() {
  const { data } = await api.post(API.AUTH.LOGOUT);
  return data;
}
