"use client"

import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type PrettySelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type PrettySelectProps = {
  label?: string
  icon?: LucideIcon
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  options: PrettySelectOption[]
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

export default function PrettySelect({
  label,
  icon: Icon,
  placeholder = "Selecione uma opcao",
  value,
  onValueChange,
  options,
  className,
  triggerClassName,
  contentClassName,
}: PrettySelectProps) {
  return (
    <div className={cn("group", className)}>
      {label ? (
        <div className="mb-2 flex items-center gap-2">
          {Icon ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          ) : null}
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </p>
        </div>
      ) : null}

      <div className="relative">
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100" />
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            className={cn(
              "h-12 rounded-2xl border border-border/70 bg-white/55 px-4 text-sm text-foreground shadow-[0_16px_50px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl",
              triggerClassName,
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent
            className={cn(
              "rounded-2xl border border-border/70 bg-white/95 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)]",
              contentClassName,
            )}
          >
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="rounded-xl focus:bg-muted"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

