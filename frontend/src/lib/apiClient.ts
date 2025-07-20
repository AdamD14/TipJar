import axios from 'axios';
import { useAuthStore } from './stores/authStore'; // <- nowy store

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do automatycznego dołączania tokena autoryzacyjnego
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Możesz dodać obsługę odświeżania tokena tutaj (401)

export default apiClient;
