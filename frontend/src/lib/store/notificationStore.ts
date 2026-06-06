import { create } from 'zustand';
import { API } from '@/lib/api-routes';

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
}

function getAuthToken(): string {
  if (typeof window === 'undefined') return '';
  try {
    const raw = sessionStorage.getItem('auth-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.state?.accessToken || '';
    }
  } catch {}
  return '';
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  isDrawerOpen: false,
  notifications: [],
  loaded: false,

  setDrawerOpen: (open) => set({ isDrawerOpen: open }),

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
    const token = getAuthToken();
    if (!token) return;
    try {
      const origin =
        process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
        'http://localhost:3001';
      await fetch(`${origin}${API.NOTIFICATIONS}/read-all`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  },

  addNotification: (n) =>
    set((state) => ({
      notifications: [
        { ...n, id: Math.random().toString(), read: false, time: 'Just now' },
        ...state.notifications,
      ],
    })),

  loadHistory: async () => {
    if (get().loaded) return;
    const token = getAuthToken();
    if (!token) return;

    try {
      const origin =
        process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
        'http://localhost:3001';
      const res = await fetch(`${origin}${API.NOTIFICATIONS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
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
      set({ loaded: true });
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
