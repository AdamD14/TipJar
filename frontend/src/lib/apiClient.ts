import axios from 'axios';

const origin =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
  'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: origin, // tylko ORIGIN
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // ciasteczka HttpOnly lecą zawsze
});

export default apiClient;