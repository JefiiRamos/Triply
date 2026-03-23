"use client"

import { motion } from "framer-motion"
import { Heart, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { DailyDeal } from "@/lib/mock/homeData"

type DailyDealsProps = {
  deals: DailyDeal[]
  isLoadingDeals: boolean
  onPickDeal: (deal: DailyDeal) => void
  onAddFavorite: (deal: {
    origin: string
    destination: string
    dateFrom?: string
    dateTo?: string
    passengers: string
  }) => void
}

export default function DailyDeals({
  deals,
  isLoadingDeals,
  onPickDeal,
  onAddFavorite,
}: DailyDealsProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70">
              Ofertas do dia
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              Rotas em destaque
            </h2>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          Atualizado agora
        </Badge>
      </div>

      {isLoadingDeals ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={`deal-skeleton-${index}`}
              className="rounded-3xl border border-border/60 bg-white/80 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)] dark:bg-slate-900/80"
            >
              <CardContent className="space-y-4 p-5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-10 w-full rounded-2xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="rounded-3xl border border-border/60 bg-white/85 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)] dark:bg-slate-900/80">
                <CardContent className="space-y-4 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                        {deal.origin} → {deal.destination}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">
                        R$ {deal.priceFrom.toLocaleString("pt-BR")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        por pessoa, ida e volta
                      </p>
                    </div>
                    {deal.discount ? (
                      <Badge className="rounded-full bg-emerald-100 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-200">
                        -{deal.discount}%
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="rounded-full">
                        Oferta
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      size="sm"
                      className="rounded-2xl"
                      onClick={() => onPickDeal(deal)}
                      aria-label="Ver oferta"
                    >
                      <Tag className="h-4 w-4" />
                      Ver oferta
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-2xl"
                      onClick={() =>
                        onAddFavorite({
                          origin: deal.origin,
                          destination: deal.destination,
                          passengers: "1",
                        })
                      }
                      aria-label="Adicionar aos favoritos"
                    >
                      <Heart className="h-4 w-4 text-primary" />
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
