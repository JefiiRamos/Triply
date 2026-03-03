"use client"

import { useEffect, useState } from "react"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion"
import { TrendingDown } from "lucide-react"

const scrollHeroSteps = [
  {
    badge: "Precos exclusivos disponiveis",
    title: "Planeje sua proxima viagem em minutos",
    desc: "Busque voos e hoteis no mesmo lugar, com precos atualizados em tempo real.",
    cta: "Digite origem e destino para comecar",
  },
  {
    badge: "Comparacao inteligente",
    title: "Compare opcoes e encontre o melhor custo-beneficio",
    desc: "Filtre por datas, passageiros e veja ofertas que realmente valem a pena.",
    cta: "Ajuste as datas e veja as melhores combinacoes",
  },
  {
    badge: "Atualizacao constante",
    title: "Precos mudam rapido - voce ve primeiro",
    desc: "A cada busca, trazemos ofertas recentes direto das fontes.",
    cta: "Faca uma busca agora e veja resultados",
  },
  {
    badge: "Pronto para decolar",
    title: "Encontre sua viagem e economize",
    desc: "Um clique e voce ja tem voos e hoteis mais baratos para escolher.",
    cta: "Clique em Buscar para ver as ofertas",
  },
]

type ScrollHeroSectionProps = {
  origin: string
  setOrigin: (value: string) => void
  destination: string
  setDestination: (value: string) => void
  dateFrom: string
  setDateFrom: (value: string) => void
  dateTo: string
  setDateTo: (value: string) => void
  passengers: string
  setPassengers: (value: string) => void
  onSearch: () => void
  isLoading: boolean
}

export default function ScrollHeroSection({
  origin,
  setOrigin,
  destination,
  setDestination,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  passengers,
  setPassengers,
  onSearch,
  isLoading,
}: ScrollHeroSectionProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }
    const intervalId = setInterval(() => {
      setStepIndex((current) => (current + 1) % scrollHeroSteps.length)
    }, 5000)
    return () => clearInterval(intervalId)
  }, [prefersReducedMotion])

  const step = scrollHeroSteps[stepIndex]
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.45, ease: "easeOut" }

  return (
    <section className="relative overflow-x-hidden bg-white pb-0 pt-6 md:pt-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-white md:h-32" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.06),transparent_65%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,252,0.92),rgba(255,255,255,1))]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl opacity-35 motion-safe:animate-pulse" />
      <div className="pointer-events-none absolute left-8 top-32 hidden h-64 w-64 rounded-full bg-primary/6 blur-3xl opacity-30 md:block" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-start px-4 pb-12 pt-6 lg:px-8 lg:pb-16 lg:pt-10">
          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 16, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -12, filter: "blur(8px)" }
                }
                transition={transition}
              >
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_6px_24px_-12px_rgba(15,23,42,0.35)] md:text-sm">
                  <TrendingDown className="h-4 w-4" />
                  {step.badge}
                </span>

                <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-br from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
                    {step.title}
                  </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
                  {step.desc}
                </p>

                <p className="mt-6 text-sm font-semibold text-primary/90">
                  {step.cta}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(248,250,252,0.85)_100%)] opacity-80" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(248,250,252,0.9),rgba(248,250,252,1))]" />
    </section>
  )
}
