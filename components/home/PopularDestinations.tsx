"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { PopularDestination } from "@/lib/mock/homeData"

type PopularDestinationsProps = {
  items: PopularDestination[]
  onSelect: (name: string) => void
}

export default function PopularDestinations({
  items,
  onSelect,
}: PopularDestinationsProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70">
          Destinos populares
        </p>
        <h2 className="text-lg font-semibold text-foreground">
          Inspire sua proxima viagem
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((destination, index) => (
          <motion.button
            key={destination.id}
            type="button"
            onClick={() => onSelect(destination.name)}
            className="text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            aria-label={`Selecionar destino ${destination.name}`}
          >
            <Card className="overflow-hidden rounded-3xl border border-border/60 bg-white/85 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)]">
              <CardContent className="relative p-5">
                <div
                  className={`absolute inset-0 opacity-80 ${destination.gradient}`}
                />
                <div className="relative space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {destination.name}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A partir de R$ {destination.priceFrom.toLocaleString("pt-BR")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
