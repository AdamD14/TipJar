import axios, { AxiosError } from 'axios';

export type HttpError = AxiosError;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();
  if (method && ['post', 'put', 'patch', 'delete'].includes(method)) {
    config.headers = config.headers ?? {};
    if (!config.headers['Idempotency-Key']) {
      const key =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
      config.headers['Idempotency-Key'] = key;
    }
  }
  return config;
});

