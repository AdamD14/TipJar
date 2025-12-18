import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';

interface CreatorStatus {
  completedSteps: number[];
}

export function useCreatorGuard(currentStep: number) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data } = await apiClient.get<CreatorStatus>('/api/v1/creator/onboarding/status');
        const completed = data.completedSteps || [];
        
        // Logic: 
        // 1. If we are on Step X, Step X-1 must be completed (unless it's Step 1).
        // 2. If we have completed Step X, we can stay here (editing) or move forward.
        // 3. "Auto-resume": If we visit a step we shouldn't be at, go to the last unfinished one.
        
        // Required strictly previous step?
        const canAccess = currentStep === 1 || completed.includes(currentStep - 1);
        
        if (!canAccess) {
            // Find the highest completed step
            const maxCompleted = Math.max(0, ...completed);
            const nextStep = maxCompleted + 1;
            
            // If we are at Step 4 but only completed Step 1, redirect to 2.
            // If nextStep is currentStep, we are good (edge case: skipped step logic? stick to strict seq)
            if (nextStep < currentStep) {
                console.warn(`Redirecting from Step ${currentStep} to Step ${nextStep} (Guard)`);
                router.replace(`/onboarding/creator/step-${nextStep}`);
                return;
            }
        }
        
      } catch (err) {
        console.error("Status check failed", err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [currentStep, router]);

  return { loading };
}
