"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Plane,
  Calendar,
  Hotel,
  Ticket,
  Sparkles,
  MapPin,
  Clock,
  Bookmark,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Wallet,
  Globe,
  History,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

export default function TripsPage() {
  const upcomingTrips = [
    {
      destination: "Lisboa, PT",
      dateFrom: "2026-04-18",
      dateTo: "2026-04-25",
      airline: "TAP Air Portugal",
      hotel: "Bairro Alto Hotel",
    },
    {
      destination: "Buenos Aires, AR",
      dateFrom: "2026-05-06",
      dateTo: "2026-05-12",
      airline: "LATAM Airlines",
      hotel: "Palladio Hotel",
    },
  ]

  const plannedTrips = [
    {
      destination: "Paris, FR",
      dateFrom: "2026-06-14",
      dateTo: "2026-06-21",
      summary: "Rota favorita + pacote com 3 opcoes de hotel.",
    },
    {
      destination: "Rio de Janeiro, BR",
      dateFrom: "2026-07-02",
      dateTo: "2026-07-08",
      summary: "Itinerario com voos flexiveis.",
    },
  ]

  const draftTrips = [
    {
      destination: "Madrid, ES",
      updatedAt: "Atualizado ha 3 dias",
      note: "Faltam datas e passageiros.",
    },
    {
      destination: "Santiago, CL",
      updatedAt: "Atualizado ha 1 semana",
      note: "Comparando voos diretos.",
    },
  ]

  const priceAlerts = [
    {
      route: "Sao Paulo → Lisboa",
      price: "R$ 2.480",
      status: "queda",
    },
    {
      route: "Rio → Buenos Aires",
      price: "R$ 1.190",
      status: "estavel",
    },
    {
      route: "Belo Horizonte → Paris",
      price: "R$ 3.540",
      status: "queda",
    },
  ]

  const travelHistory = [
    {
      destination: "Santiago, CL",
      date: "Nov 2025",
      stats: "5 dias · 2 reservas",
    },
    {
      destination: "Nova York, EUA",
      date: "Ago 2025",
      stats: "7 dias · 3 reservas",
    },
    {
      destination: "Fortaleza, BR",
      date: "Jan 2025",
      stats: "4 dias · 1 reserva",
    },
  ]

  const stats = useMemo(
    () => [
      { label: "Viagens totais", value: "18", icon: Plane },
      { label: "Paises visitados", value: "9", icon: Globe },
      { label: "Economia em deals", value: "R$ 6.400", icon: Wallet },
    ],
    [],
  )

  const daysUntil = (dateStr: string) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diff = date.getTime() - now.getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

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
                  <Plane className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Conta
                  </p>
                  <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                    Minhas viagens
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Gerencie seus planos, reservas e itinerarios.
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

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Proximas viagens
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {upcomingTrips.map((trip) => (
                    <div
                      key={`${trip.destination}-${trip.dateFrom}`}
                      className="rounded-3xl border border-border/60 bg-white/80 p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.25)] backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {trip.destination}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {trip.dateFrom} · {trip.dateTo}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70">
                          <Clock className="h-3.5 w-3.5" />
                          {daysUntil(trip.dateFrom)} dias
                        </span>
                      </div>
                      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Ticket className="h-3.5 w-3.5 text-primary" />
                          {trip.airline}
                        </p>
                        <p className="flex items-center gap-2">
                          <Hotel className="h-3.5 w-3.5 text-primary" />
                          {trip.hotel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Viagens planejadas
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {plannedTrips.map((trip) => (
                    <div
                      key={`${trip.destination}-${trip.dateFrom}`}
                      className="rounded-3xl border border-border/60 bg-white/80 p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.25)] backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {trip.destination}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {trip.dateFrom} · {trip.dateTo}
                          </p>
                        </div>
                        <Bookmark className="h-4 w-4 text-primary" />
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {trip.summary}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4 rounded-2xl border-border/70 bg-white/70"
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Rascunhos salvos
                  </p>
                </div>
                <div className="space-y-3">
                  {draftTrips.map((trip) => (
                    <div
                      key={trip.destination}
                      className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_50px_-44px_rgba(15,23,42,0.2)] backdrop-blur-xl"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {trip.destination}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {trip.note}
                      </p>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/70">
                        {trip.updatedAt}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <TrendingDown className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Alertas de preco
                  </p>
                </div>
                <div className="space-y-3">
                  {priceAlerts.map((alert) => {
                    const isDrop = alert.status === "queda"
                    return (
                      <div
                        key={alert.route}
                        className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_50px_-44px_rgba(15,23,42,0.2)] backdrop-blur-xl"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground">
                            {alert.route}
                          </p>
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
                        <p className="mt-2 text-xs text-muted-foreground">
                          Preco atual:{" "}
                          <span className="font-semibold text-foreground">
                            {alert.price}
                          </span>
                        </p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <History className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Historico de viagens
                  </p>
                </div>
                <div className="space-y-3">
                  {travelHistory.map((trip) => (
                    <div
                      key={`${trip.destination}-${trip.date}`}
                      className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_50px_-44px_rgba(15,23,42,0.2)] backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {trip.destination}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {trip.date}
                          </p>
                        </div>
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {trip.stats}
                      </p>
                    </div>
                  ))}
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
