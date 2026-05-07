
import { create } from 'zustand';

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
  setDrawerOpen: (open: boolean) => void;
  markAsRead: (id: string) => void;
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'time'>) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  isDrawerOpen: false,
  notifications: [
    { id: '1', title: 'Nowy Napiwek!', message: 'CryptoPanda przesłał 50 USDC. Sprawdź wiadomość.', type: 'success', time: '2m temu', read: false },
    { id: '2', title: 'Gemini Insight', message: 'Twoja retencja wzrosła o 5% w tym miesiącu. Tak trzymaj!', type: 'info', time: '1h temu', read: false },
    { id: '3', title: 'Wypłata zakończona', message: 'Środki (1,000 USDC) trafiły na Twój portfel Polygon.', type: 'success', time: '3h temu', read: true },
    { id: '4', title: 'Alert Bezpieczeństwa', message: 'Nowe logowanie z urządzenia: iPhone 15 Pro.', type: 'warning', time: '5h temu', read: true },
  ],
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  addNotification: (n) => set((state) => ({
    notifications: [
      { ...n, id: Math.random().toString(), read: false, time: 'Teraz' },
      ...state.notifications
    ]
  })),
}));
