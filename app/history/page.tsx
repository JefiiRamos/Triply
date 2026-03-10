"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Clock,
  Search,
  MapPin,
  Calendar,
  Plane,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Globe,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

export default function HistoryPage() {
  const searchHistory = [
    {
      id: "h-1",
      origin: "Sao Paulo",
      destination: "Lisboa",
      dateFrom: "12/02/2026",
      dateTo: "20/02/2026",
      passengers: "2",
      tag: "voos + hoteis",
    },
    {
      id: "h-2",
      origin: "Rio de Janeiro",
      destination: "Buenos Aires",
      dateFrom: "05/01/2026",
      dateTo: "10/01/2026",
      passengers: "1",
      tag: "voos",
    },
    {
      id: "h-3",
      origin: "Belo Horizonte",
      destination: "Paris",
      dateFrom: "24/11/2025",
      dateTo: "02/12/2025",
      passengers: "2",
      tag: "ofertas",
    },
    {
      id: "h-4",
      origin: "Sao Paulo",
      destination: "Santiago",
      dateFrom: "18/10/2025",
      dateTo: "22/10/2025",
      passengers: "3",
      tag: "voos + hoteis",
    },
  ]

  const stats = useMemo(
    () => [
      { label: "Pesquisas totais", value: "64", icon: Search },
      { label: "Destinos unicos", value: "22", icon: Globe },
      { label: "Repeticoes salvas", value: "14", icon: Sparkles },
    ],
    [],
  )

  const topDestinations = [
    { name: "Lisboa", count: "12 buscas" },
    { name: "Paris", count: "9 buscas" },
    { name: "Buenos Aires", count: "7 buscas" },
    { name: "Santiago", count: "6 buscas" },
  ]

  const insights = [
    {
      title: "Janela favorita",
      value: "10-20 dias",
      description: "Seu periodo medio entre ida e volta.",
      icon: Calendar,
    },
    {
      title: "Origem mais usada",
      value: "Sao Paulo",
      description: "62% das suas pesquisas.",
      icon: MapPin,
    },
    {
      title: "Preferencia",
      value: "Voos + hoteis",
      description: "Pacotes com mais comparacoes.",
      icon: Plane,
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
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Conta
                  </p>
                  <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                    Historico de pesquisas
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Consulte todas as rotas que voce ja pesquisou.
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
                    <Search className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Pesquisas recentes
                  </p>
                </div>
                <div className="space-y-3">
                  {searchHistory.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_50px_-44px_rgba(15,23,42,0.2)] backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {item.origin} → {item.destination}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.dateFrom} · {item.dateTo} · {item.passengers} pax
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/70">
                          {item.tag}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          Datas planejadas
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Plane className="h-3.5 w-3.5 text-primary" />
                          Comparou tarifas
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Insights de busca
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {insights.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_50px_-44px_rgba(15,23,42,0.2)] backdrop-blur-xl"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {item.title}
                          </p>
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <p className="mt-2 text-lg font-semibold text-foreground">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <BarChart3 className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Top destinos
                  </p>
                </div>
                <div className="space-y-3">
                  {topDestinations.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_50px_-44px_rgba(15,23,42,0.2)] backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground">
                          {item.name}
                        </p>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                          {item.count}
                        </span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-primary/60" />
                      </div>
                    </div>
                  ))}
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
                        Repita uma pesquisa ou salve uma nova rota.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-2xl border-border/70 bg-white/70"
                    >
                      Repetir ultima busca
                    </Button>
                    <Button
                      type="button"
                      className="rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
                    >
                      Nova pesquisa
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
