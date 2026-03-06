import { type ReactNode } from "react"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type SectionCardProps = {
  eyebrow: string
  title: string
  description?: string
  icon: LucideIcon
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export default function SectionCard({
  eyebrow,
  title,
  description,
  icon: Icon,
  children,
  className,
  headerClassName,
  contentClassName,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/70 bg-white/55 shadow-[0_30px_120px_-70px_rgba(15,23,42,0.35)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_55%)]" />

      <div
        className={cn(
          "flex items-start gap-4 border-b border-border/60 px-6 py-5 md:px-8",
          headerClassName,
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-lg font-bold text-foreground md:text-xl">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>

      <div className={cn("px-6 py-6 md:px-8 md:py-8", contentClassName)}>
        {children}
      </div>
    </div>
  )
}
