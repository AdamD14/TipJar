import axios from 'axios';

const origin =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
  'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: origin,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem('auth-storage');
      if (raw) {
        const parsed = JSON.parse(raw);
        const token: string | null | undefined =
          parsed?.state?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {}
  }
  return config;
});

export default apiClient;