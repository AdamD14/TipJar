"use client";

import { useEffect } from 'react';
import { useNotificationStore } from '@/lib/store/notificationStore';

export function useNotificationsLive() {
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    const token = (() => {
      if (typeof window === 'undefined') return '';
      try {
        const raw = sessionStorage.getItem('auth-storage');
        if (raw) {
          const parsed = JSON.parse(raw);
          return parsed?.state?.accessToken || '';
        }
      } catch {}
      return '';
    })();

    const origin =
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
      'http://localhost:3001';

    const eventSource = new EventSource(
      `${origin}/api/v1/notifications/stream?token=${token}`
    );

    eventSource.onmessage = (event) => {
      const notif = JSON.parse(event.data);
      addNotification({
        title: notif.title,
        message: notif.message,
        type: notif.type as 'info' | 'success' | 'warning' | 'error',
      });
    };

    eventSource.onerror = () => {
      console.error('Notification SSE connection error');
      eventSource.close();
    };

    return () => eventSource.close();
  }, [addNotification]);
}