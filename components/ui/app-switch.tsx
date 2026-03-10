"use client"

import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

type AppSwitchProps = React.ComponentProps<typeof Switch>

export default function AppSwitch({ className, ...props }: AppSwitchProps) {
  return (
    <Switch
      className={cn(
        "shadow-[0_10px_28px_-20px_rgba(15,23,42,0.35)] data-[state=checked]:shadow-[0_16px_32px_-24px_rgba(37,99,235,0.6)]",
        className,
      )}
      {...props}
    />
  )
}

