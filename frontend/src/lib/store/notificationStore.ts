import { create } from 'zustand';
import { API } from '@/lib/api-routes';
import { useAuthStore } from '@/lib/store/authStore';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

interface NotificationState {
  isDrawerOpen: boolean;
  notifications: Notification[];
  loaded: boolean;
  setDrawerOpen: (open: boolean) => void;
  markAsRead: (id: string) => void;
  markAllRead: () => Promise<void>;
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'time'>) => void;
  loadHistory: () => Promise<void>;
  resetLoaded: () => void;
}

const BACKEND_ORIGIN =
  (process.env.NEXT_PUBLIC_BACKEND_ORIGIN ?? 'http://localhost:3001').replace(
    /\/+$/,
    '',
  );

/**
 * Returns the JWT access token from authStore (in-memory) first,
 * then falls back to sessionStorage for page-refresh scenarios.
 */
function getAuthToken(): string {
  const storeToken = useAuthStore.getState().accessToken;
  if (storeToken) return storeToken;

  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem('auth-storage');
      if (raw) {
        const parsed = JSON.parse(raw) as { state?: { accessToken?: string } };
        return parsed?.state?.accessToken || '';
      }
    } catch {
      // ignore
    }
  }
  return '';
}

function buildHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  isDrawerOpen: false,
  notifications: [],
  loaded: false,

  setDrawerOpen: (open) => set({ isDrawerOpen: open }),

  resetLoaded: () => set({ loaded: false }),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),

  markAllRead: async () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
    try {
      await fetch(`${BACKEND_ORIGIN}${API.NOTIFICATIONS}/read-all`, {
        method: 'POST',
        headers: buildHeaders(),
        credentials: 'include',
      });
    } catch {
      // best-effort
    }
  },

  addNotification: (n) =>
    set((state) => ({
      notifications: [
        { ...n, id: Math.random().toString(), read: false, time: 'Just now' },
        ...state.notifications,
      ],
    })),

  loadHistory: async () => {
    // Guard: skip if already loaded — but allow reload after resetLoaded()
    if (get().loaded) return;

    try {
      const res = await fetch(`${BACKEND_ORIGIN}${API.NOTIFICATIONS}`, {
        headers: buildHeaders(),
        credentials: 'include',
      });
      if (!res.ok) {
        // Don't set loaded=true on auth failure so retry is possible
        if (res.status === 401) return;
        set({ loaded: true });
        return;
      }
      const rows: Array<{
        id: string;
        title: string;
        message: string;
        type: string;
        read: boolean;
        createdAt: string;
      }> = await res.json();

      const notifications: Notification[] = rows.map((r) => ({
        id: r.id,
        title: r.title || '',
        message: r.message,
        type: mapType(r.type),
        time: formatTime(r.createdAt),
        read: r.read,
      }));

      set({ notifications, loaded: true });
    } catch {
      // Network error — don't mark as loaded, allow retry
    }
  },
}));

function mapType(t: string): Notification['type'] {
  if (t === 'success') return 'success';
  if (t === 'warning') return 'warning';
  if (t === 'error') return 'error';
  return 'info';
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}
