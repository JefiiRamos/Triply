"use client"

import { motion } from "framer-motion"
import SearchForm from "@/components/SearchForm"

type SearchFormSectionProps = {
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

export default function SearchFormSection({
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
}: SearchFormSectionProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-16 md:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.14),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(248,250,252,0.9),rgba(255,255,255,1))]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl opacity-50 motion-safe:animate-pulse" />
      <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-border/80 bg-card/85 p-6 shadow-[0_20px_80px_-50px_rgba(15,23,42,0.3)] backdrop-blur-xl"
        >
          <div className="rounded-xl border border-border/60 bg-background/70 p-4">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
