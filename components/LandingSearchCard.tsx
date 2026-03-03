"use client"

import { useCallback, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { TrendingDown } from "lucide-react"
import SearchForm from "@/components/SearchForm"

type LandingSearchCardProps = {
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

export default function LandingSearchCard({
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
}: LandingSearchCardProps) {
  const dockRef = useRef<HTMLDivElement | null>(null)
  const isDocked = useInView(dockRef, { amount: 0.6 })
  const prefersReducedMotion = useReducedMotion()
  const handleScrollToSearch = useCallback(() => {
    dockRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    })
  }, [prefersReducedMotion])

  const card = (
    <SearchForm
      origin={origin}
      setOrigin={setOrigin}
      destination={destination}
      setDestination={setDestination}
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      dateTo={dateTo}
      setDateTo={setDateTo}
      passengers={passengers}
      setPassengers={setPassengers}
      onSearch={onSearch}
      isLoading={isLoading}
    />
  )

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="mx-auto w-full max-w-[1320px] px-4 pb-12 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: isDocked ? 0 : 1, y: isDocked ? 24 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto mx-auto w-full max-w-[1120px]"
          >
            <div className="flex items-center justify-between rounded-2xl border border-primary/15 bg-white/85 px-4 py-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <TrendingDown className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Comece agora
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Vamos fazer a sua primeira pesquisa de viagem?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleScrollToSearch}
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_-18px_rgba(37,99,235,0.65)] transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Fazer pesquisa
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        ref={dockRef}
        id="landing-search-dock"
        className="mx-auto w-full max-w-[1320px] px-4 pb-12 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto w-full max-w-[1120px]"
        >
          {card}
        </motion.div>
      </div>
    </>
  )
}
