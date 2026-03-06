import { cn } from "@/lib/utils"

type LoadingSpinnerProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  label?: string
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-[3px]",
}

export default function LoadingSpinner({
  className,
  size = "md",
  label = "Carregando",
}: LoadingSpinnerProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full",
          sizeMap[size],
          "border-primary/25 border-t-primary shadow-[0_0_20px_rgba(59,130,246,0.35)] animate-spin",
        )}
      />
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
          {label}
        </span>
      ) : null}
    </div>
  )
}
