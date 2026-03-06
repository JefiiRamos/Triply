import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type LoadingCardProps = {
  className?: string
  showHeader?: boolean
  showFooter?: boolean
  lines?: number
}

const lineWidths = ["w-full", "w-5/6", "w-2/3", "w-3/4"]

export default function LoadingCard({
  className,
  showHeader = true,
  showFooter = true,
  lines = 4,
}: LoadingCardProps) {
  const safeLines = Math.max(2, Math.min(8, lines))

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/70 bg-white/55 shadow-[0_30px_120px_-70px_rgba(15,23,42,0.35)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_55%)]" />

      {showHeader ? (
        <div className="flex items-start gap-4 border-b border-border/60 px-6 py-5 md:px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Skeleton className="h-5 w-5 rounded-lg bg-primary/20" />
          </div>
          <div className="min-w-0 flex-1">
            <Skeleton className="h-3 w-28 rounded-full" />
            <Skeleton className="mt-2 h-5 w-64" />
            <Skeleton className="mt-2 h-4 w-72" />
          </div>
        </div>
      ) : null}

      <div className="px-6 py-6 md:px-8 md:py-8">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-3">
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
          <div className="md:col-span-1">
            <Skeleton className="h-11 w-11 rounded-2xl" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {Array.from({ length: safeLines }).map((_, index) => (
            <Skeleton
              key={`line-${index}`}
              className={cn("h-3", lineWidths[index % lineWidths.length])}
            />
          ))}
        </div>

        {showFooter ? (
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-12 w-full rounded-2xl md:w-40" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
