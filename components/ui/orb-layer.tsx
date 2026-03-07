"use client"

import Orb from "@/components/Orb"
import { cn } from "@/lib/utils"

type OrbLayerProps = {
  className?: string
  size?: number
  hue?: number
  hoverIntensity?: number
  rotateOnHover?: boolean
  forceHoverState?: boolean
}

export default function OrbLayer({
  className,
  size = 900,
  hue = 0,
  hoverIntensity = 2,
  rotateOnHover = true,
  forceHoverState = false,
}: OrbLayerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Orb
        hue={hue}
        hoverIntensity={hoverIntensity}
        rotateOnHover={rotateOnHover}
        forceHoverState={forceHoverState}
      />
    </div>
  )
}
