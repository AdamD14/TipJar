import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001/api/v1',
  /**
   * To jest kluczowa opcja. Mówi przeglądarce, aby automatycznie
   * dołączała do każdego zapytania ciasteczka (cookies), które
   * zostały ustawione przez backend dla tej domeny.
   */
  withCredentials: true,
});

/**
 * UWAGA: W przyszłości możemy tutaj dodać interceptor odpowiedzi (response interceptor),
 * który będzie automatycznie odświeżał token. Jeśli API zwróci błąd 401,
 * interceptor mógłby wywołać endpoint /auth/refresh-token, a następnie
 * ponowić oryginalne zapytanie. Na razie zostawiamy to w tej prostej formie.
 */

export default apiClient;