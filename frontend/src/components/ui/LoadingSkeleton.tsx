import Skeleton from './Skeleton';

export default function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div aria-hidden className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}
