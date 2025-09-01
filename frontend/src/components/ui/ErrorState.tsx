export default function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm" role="alert">
      <p className="text-[#DDE0DA]">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg border border-white/15 px-3 py-1.5 text-[#DDE0DA] hover:bg-white/10"
          aria-label="Retry"
        >
          Try again
        </button>
      )}
    </div>
  );
}
