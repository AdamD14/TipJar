import axios from 'axios';
import { useOnboardingStore } from './stores/onboardingStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // pozwala na sesje HttpOnly z backendu
});

apiClient.interceptors.request.use((config) => {
  const token = useOnboardingStore.getState().tokens.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
