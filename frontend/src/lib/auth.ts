// /home/ad/TipJar/frontend/src/lib/auth.ts
import { api } from "@/lib/api";
import { API } from "@/lib/api-routes";

export type RegisterDto = {
  email: string;
  password: string;
  displayName?: string;
  role?: "FAN" | "CREATOR";
};
export type LoginDto = { email: string; password: string };

// Typy lustrzane do backendu (ValidatedUser z AuthService)
export type UserRole = "FAN" | "CREATOR" | "ADMIN";
export interface ValidatedUser {
  id: string;
  email: string | null;
  role: UserRole;
  displayName: string;
  avatarUrl?: string | null;
  isEmailVerified: boolean;
  isActive: boolean;
  username?: string | null;
  hasCompletedOnboarding?: boolean;
  consents?: unknown;
}

// Kontrakty odpowiedzi zgodne z backendem
export interface RegisterResponse {
  user: ValidatedUser;
  accessToken: string;
}
export interface LoginResponse {
  message: string;
  user: ValidatedUser;
  accessToken: string;
}
export interface RefreshResponse {
  accessToken: string;
}
export interface LogoutResponse {
  message: string;
}

export async function register(dto: RegisterDto) {
  return api<RegisterResponse>(API.AUTH.REGISTER, {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export async function login(dto: LoginDto) {
  return api<LoginResponse>(API.AUTH.LOGIN, {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export async function me() {
  return api<ValidatedUser>(API.AUTH.ME);
}

export async function refresh() {
  return api<RefreshResponse>(API.AUTH.REFRESH, { method: "POST" });
}

export async function logout() {
  return api<LogoutResponse>(API.AUTH.LOGOUT, { method: "POST" });
}
