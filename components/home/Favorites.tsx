"use client"

import { motion } from "framer-motion"
import { Heart, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type RouteEntry = {
  id: string
  origin: string
  destination: string
  dateFrom?: string
  dateTo?: string
  passengers: string
}

type FavoritesProps = {
  items: RouteEntry[]
  onRemove: (id: string) => void
}

export default function Favorites({ items, onRemove }: FavoritesProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
          <Heart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70">
            Favoritos
          </p>
          <h2 className="text-lg font-semibold text-foreground">
            Suas rotas preferidas
          </h2>
        </div>
      </div>

      {items.length === 0 ? (
        <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)]">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Voce ainda nao adicionou favoritos. Salve rotas para comparar mais
            rapido.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="rounded-3xl border border-border/60 bg-white/85 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)]">
                <CardContent className="space-y-2 p-5">
                  <p className="text-sm font-semibold text-foreground">
                    {item.origin} → {item.destination}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.dateFrom || "Data flexivel"} ·{" "}
                    {item.dateTo || "Sem volta"}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      {item.passengers} pax
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-2xl"
                      onClick={() => onRemove(item.id)}
                      aria-label="Remover favorito"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
