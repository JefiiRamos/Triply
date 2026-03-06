import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type ResultsCardSkeletonProps = {
  variant?: "flight" | "hotel"
  className?: string
}

export default function ResultsCardSkeleton({
  variant = "flight",
  className,
}: ResultsCardSkeletonProps) {
  if (variant === "hotel") {
    return (
      <div
        className={cn(
          "animate-pulse overflow-hidden rounded-2xl border border-border bg-card",
          className,
        )}
      >
        <Skeleton className="h-48 w-full rounded-none" />
        <div className="p-5">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/2" />
          <Skeleton className="mt-1 h-3 w-1/3" />
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-3 w-14" />
            </div>
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl border border-border bg-card p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
      <Skeleton className="mt-5 h-16 rounded-xl" />
      <Skeleton className="mt-4 h-11 rounded-xl" />
    </div>
  )
}
