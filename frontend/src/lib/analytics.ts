type Analytics = {
  track: (event: string, properties: Record<string, unknown>) => void;
};

export function track(event: string, properties: Record<string, unknown> = {}) {
  try {
    if (typeof window !== 'undefined') {
      const analyticsWindow = window as Window & { analytics?: Analytics };
      analyticsWindow.analytics?.track(event, properties);
    }
  } catch {
    // silent
  }
}

export async function trackOnboarding(
  step: 'identity' | 'bio' | 'tiers' | 'payments' | 'publish',
  action: 'view' | 'save' | 'error' | 'complete',
) {
  try {
    await fetch('/api/v1/analytics/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step, action }),
    });
  } catch {
    // silent
  }
}

