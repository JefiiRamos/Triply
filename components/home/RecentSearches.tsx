"use client"

import { motion } from "framer-motion"
import { Clock, Heart, RotateCcw, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type RouteEntry = {
  id: string
  origin: string
  destination: string
  dateFrom?: string
  dateTo?: string
  passengers: string
}

type RecentSearchesProps = {
  items: RouteEntry[]
  onRepeat: (item: RouteEntry) => void
  onRemove: (id: string) => void
  onAddFavorite: (item: Omit<RouteEntry, "id">) => void
}

export default function RecentSearches({
  items,
  onRepeat,
  onRemove,
  onAddFavorite,
}: RecentSearchesProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70">
              Pesquisas recentes
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              Retome rapidamente
            </h2>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {items.length} salvas
        </Badge>
      </div>

      {items.length === 0 ? (
        <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)]">
          <CardContent className="flex flex-col items-start gap-3 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Nenhuma busca recente ainda.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Faça sua primeira busca e veja suas rotas aqui.
              </p>
            </div>
            <Button size="sm" className="rounded-2xl">
              Faça sua primeira busca
            </Button>
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
              <Card className="rounded-3xl border border-border/60 bg-white/80 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)]">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.origin} → {item.destination}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.dateFrom || "Data flexivel"} ·{" "}
                        {item.dateTo || "Sem volta"}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[11px]">
                      {item.passengers} pax
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-2xl"
                      onClick={() => onRepeat(item)}
                      aria-label="Repetir pesquisa"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Repetir
                    </Button>

                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-2xl"
                              onClick={() => onAddFavorite(item)}
                              aria-label="Adicionar aos favoritos"
                            >
                              <Heart className="h-4 w-4 text-primary" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Adicionar aos favoritos
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-2xl"
                            aria-label="Acoes da pesquisa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => onRemove(item.id)}
                          >
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
