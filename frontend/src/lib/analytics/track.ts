export function track(event: string, payload?: Record<string, unknown>) {
  try {
    fetch('/api/v1/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, ...(payload || {}) }),
    });
  } catch {
    // silent
  }
}
