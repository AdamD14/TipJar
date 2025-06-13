import { create } from 'zustand';

interface AuthState {
  user: { id: string; email: string | null; role: string } | null;
  isLoading: boolean;
  login: (user: AuthState['user']) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  login: (user) => set({ user, isLoading: false }),
  logout: () => set({ user: null, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
