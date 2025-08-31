import Skeleton from "@/components/ui/Skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-48 w-full" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
