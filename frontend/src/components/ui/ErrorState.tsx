"use client";

export default function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="grid gap-2 text-center">
      <p>Wystąpił błąd.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-white/20 px-4 py-2"
        >
          Spróbuj ponownie
        </button>
      )}
    </div>
  );
}
