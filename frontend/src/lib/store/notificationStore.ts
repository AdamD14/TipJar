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
    { id: '1', title: 'New Tip!', message: 'CryptoPanda sent you 50 USDC.', type: 'success', time: '2m ago', read: false },
    { id: '2', title: 'Gemini Insight', message: 'Your retention increased by 5% this month. Keep it up!', type: 'info', time: '1h ago', read: false },
    { id: '3', title: 'Payout Complete', message: 'Funds (1,000 USDC) have been sent to your Polygon wallet.', type: 'success', time: '3h ago', read: true },
    { id: '4', title: 'Security Alert', message: 'New login from device: iPhone 15 Pro.', type: 'warning', time: '5h ago', read: true },
  ],
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  addNotification: (n) => set((state) => ({
    notifications: [
      { ...n, id: Math.random().toString(), read: false, time: 'Just now' },
      ...state.notifications
    ]
  })),
}));
