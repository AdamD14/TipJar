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

