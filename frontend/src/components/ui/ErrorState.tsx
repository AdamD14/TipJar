'use client';

import { Button } from './Button';

export default function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center"
    >
      <p className="text-sm text-red-200">{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
