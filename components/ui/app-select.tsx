"use client"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type AppSelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type AppSelectProps = {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: AppSelectOption[]
  disabled?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

export default function AppSelect({
  value,
  onValueChange,
  placeholder = "Selecione",
  options,
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
}: AppSelectProps) {
  return (
    <div className={cn("w-full", className)}>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            "h-11 rounded-2xl border border-border/60 bg-background px-4 text-sm text-foreground shadow-[0_16px_40px_-34px_rgba(15,23,42,0.18)] disabled:cursor-not-allowed disabled:bg-slate-100",
            triggerClassName,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className={cn(
            "rounded-2xl border border-border/70 bg-white/95 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.3)]",
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
  )
}
