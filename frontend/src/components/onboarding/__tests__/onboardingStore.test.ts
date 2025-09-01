import { describe, it, expect } from 'vitest';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

describe('onboardingStore', () => {
  it('persists role and step changes', () => {
    const { setRole, setStep } = useOnboardingStore.getState();
    setRole('FAN');
    setStep('CONSENTS');
    const st = useOnboardingStore.getState();
    expect(st.role).toBe('FAN');
    expect(st.step).toBe('CONSENTS');
  });

  it('stores drafts and user', () => {
    const { setDraft, setUser } = useOnboardingStore.getState();
    setDraft({ email: 'a@b.c', username: 'alice' });
    setUser({ id: 'u1', email: 'a@b.c', role: 'CREATOR' });
    const st = useOnboardingStore.getState();
    expect(st.drafts.email).toBe('a@b.c');
    expect(st.user?.id).toBe('u1');
  });
});

