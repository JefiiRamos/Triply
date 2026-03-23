"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  Star,
  MapPin,
  Calendar,
  Plane,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Filter,
  ArrowRight,
  Bell,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const favorites = [
    {
      id: "f-1",
      route: "Sao Paulo → Lisboa",
      price: "R$ 2.480",
      status: "queda",
      savedAt: "Salvo ha 2 dias",
      dates: "12/02/2026 · 20/02/2026",
    },
    {
      id: "f-2",
      route: "Rio de Janeiro → Santiago",
      price: "R$ 1.320",
      status: "estavel",
      savedAt: "Salvo ha 5 dias",
      dates: "18/03/2026 · 22/03/2026",
    },
    {
      id: "f-3",
      route: "Curitiba → Recife",
      price: "R$ 980",
      status: "queda",
      savedAt: "Salvo ha 1 semana",
      dates: "05/04/2026 · 12/04/2026",
    },
  ]

  const stats = useMemo(
    () => [
      { label: "Rotas favoritas", value: "12", icon: Heart },
      { label: "Alertas ativos", value: "6", icon: Bell },
      { label: "Economia media", value: "R$ 420", icon: TrendingDown },
    ],
    [],
  )

  const tags = [
    { label: "Internacional", count: "7" },
    { label: "Domestico", count: "5" },
    { label: "Com hotel", count: "4" },
  ]

  const deals = [
    {
      title: "Lisboa com 15% off",
      route: "Sao Paulo → Lisboa",
      price: "R$ 2.210",
    },
    {
      title: "Pacote Santiago",
      route: "Rio → Santiago",
      price: "R$ 1.180",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(255,255,255,1))]" />

          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-3xl border border-border/60 bg-white/85 p-6 shadow-[0_24px_80px_-55px_rgba(15,23,42,0.35)] backdrop-blur-xl md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Heart className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Favoritos
                  </p>
                  <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                    Suas rotas favoritas em um so lugar
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Salve as rotas que voce mais gosta e acompanhe as ofertas.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {stats.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="rounded-2xl border border-border/60 bg-white/75 p-5 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)] backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {item.label}
                      </p>
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-foreground">
                      {item.value}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Star className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Rotas favoritas
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {favorites.map((item) => {
                    const isDrop = item.status === "queda"
                    return (
                      <div
                        key={item.id}
                        className="rounded-3xl border border-border/60 bg-white/80 p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.25)] backdrop-blur-xl"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {item.route}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {item.dates}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              isDrop
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-slate-100 text-muted-foreground"
                            }`}
                          >
                            {isDrop ? (
                              <TrendingDown className="h-3 w-3" />
                            ) : (
                              <TrendingUp className="h-3 w-3" />
                            )}
                            {isDrop ? "queda" : "estavel"}
                          </span>
                        </div>
                        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            {item.savedAt}
                          </p>
                          <p className="flex items-center gap-2">
                            <Plane className="h-3.5 w-3.5 text-primary" />
                            Preco atual:{" "}
                            <span className="font-semibold text-foreground">
                              {item.price}
                            </span>
                          </p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-2xl border-border/70 bg-white/70"
                          >
                            Ver detalhes
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)]"
                          >
                            Repetir busca
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Ofertas favoritas
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {deals.map((deal) => (
                    <div
                      key={deal.title}
                      className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_50px_-44px_rgba(15,23,42,0.2)] backdrop-blur-xl"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {deal.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {deal.route}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        {deal.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Filter className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Filtros rapidos
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {tag.label}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                        {tag.count}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="rounded-3xl border border-border/60 bg-white/85 p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Sugestao
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Baseado nos seus favoritos, tente explorar novos destinos.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-foreground">
                    <p>Amsterdam · R$ 2.980</p>
                    <p>Roma · R$ 3.120</p>
                  </div>
                  <Button
                    size="sm"
                    className="mt-4 w-full rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)]"
                  >
                    Ver sugestoes
                  </Button>
                </div>

                <div className="rounded-3xl border border-border/60 bg-white/85 p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Acoes rapidas
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Repita uma rota favorita ou adicione uma nova.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-2xl border-border/70 bg-white/70"
                    >
                      Repetir rota
                    </Button>
                    <Button
                      type="button"
                      className="rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
                    >
                      Nova rota
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
