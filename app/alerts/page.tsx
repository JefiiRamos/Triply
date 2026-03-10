"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  TrendingDown,
  TrendingUp,
  MapPin,
  Calendar,
  Plane,
  ShieldCheck,
  Sparkles,
  Filter,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

export default function AlertsPage() {
  const alerts = [
    {
      id: "a-1",
      route: "Sao Paulo → Lisboa",
      target: "R$ 2.600",
      current: "R$ 2.480",
      status: "queda",
      updated: "Atualizado ha 2h",
    },
    {
      id: "a-2",
      route: "Rio de Janeiro → Santiago",
      target: "R$ 1.500",
      current: "R$ 1.560",
      status: "estavel",
      updated: "Atualizado ha 6h",
    },
    {
      id: "a-3",
      route: "Belo Horizonte → Paris",
      target: "R$ 3.900",
      current: "R$ 3.540",
      status: "queda",
      updated: "Atualizado ha 1 dia",
    },
  ]

  const stats = useMemo(
    () => [
      { label: "Alertas ativos", value: "9", icon: Bell },
      { label: "Quedas recentes", value: "3", icon: TrendingDown },
      { label: "Economia media", value: "R$ 520", icon: Sparkles },
    ],
    [],
  )

  const suggestions = [
    { title: "Lisboa em baixa", route: "GRU → LIS", price: "R$ 2.390" },
    { title: "Pacote Santiago", route: "GIG → SCL", price: "R$ 1.180" },
  ]

  const filters = [
    { label: "Internacional", count: "6" },
    { label: "Domestico", count: "3" },
    { label: "Com hotel", count: "2" },
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
                  <Bell className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Alertas
                  </p>
                  <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                    Acompanhe as melhores oportunidades
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Crie alertas e receba notificacoes quando o preco baixar.
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
                    <TrendingDown className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Alertas ativos
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {alerts.map((item) => {
                    const isDrop = item.status === "queda"
                    return (
                      <div
                        key={item.id}
                        className="rounded-3xl border border-border/60 bg-white/80 p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.25)] backdrop-blur-xl"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {item.route}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Meta: {item.target}
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
                            {item.updated}
                          </p>
                          <p className="flex items-center gap-2">
                            <Plane className="h-3.5 w-3.5 text-primary" />
                            Preco atual:{" "}
                            <span className="font-semibold text-foreground">
                              {item.current}
                            </span>
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-2xl border-border/70 bg-white/70"
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)]"
                          >
                            Ver rota
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Regras inteligentes
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {["Alertar a cada 3h", "Pausar se preco subir 8%"].map(
                    (rule) => (
                      <div
                        key={rule}
                        className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_50px_-44px_rgba(15,23,42,0.2)] backdrop-blur-xl"
                      >
                        <p className="text-sm font-semibold text-foreground">
                          {rule}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Ajuste automatico para manter alertas uteis.
                        </p>
                      </div>
                    ),
                  )}
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
                  {filters.map((tag) => (
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
                      <SlidersHorizontal className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Configuracoes
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ajuste limites de preco e frequencia.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-foreground">
                    <p>Limite padrao: R$ 2.800</p>
                    <p>Frequencia: a cada 6h</p>
                  </div>
                  <Button
                    size="sm"
                    className="mt-4 w-full rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)]"
                  >
                    Atualizar configuracoes
                  </Button>
                </div>

                <div className="rounded-3xl border border-border/60 bg-white/85 p-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Sugestoes
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Novas rotas com preco atraente.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-foreground">
                    {suggestions.map((item) => (
                      <div key={item.title} className="flex justify-between">
                        <span>
                          {item.title}
                          <span className="text-xs text-muted-foreground">
                            {" "}
                            · {item.route}
                          </span>
                        </span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    className="mt-4 w-full rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)]"
                  >
                    Ver mais rotas
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
                        Crie um alerta novo ou pausar todos.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-2xl border-border/70 bg-white/70"
                    >
                      Pausar todos
                    </Button>
                    <Button
                      type="button"
                      className="rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
                    >
                      Novo alerta
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
