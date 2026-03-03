"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
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

  const card = (
    <div className="rounded-2xl border border-border/80 bg-card/85 p-6 shadow-[0_30px_120px_-50px_rgba(15,23,42,0.35)] backdrop-blur-xl">
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
    </div>
  )

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40">
        <div className="mx-auto w-full max-w-[1200px] px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: isDocked ? 0 : 1, y: isDocked ? 24 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto mx-auto w-full max-w-[960px]"
          >
            {card}
          </motion.div>
        </div>
      </div>

      <div ref={dockRef} className="mx-auto w-full max-w-[1200px] px-4 pb-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto w-full max-w-[960px]"
        >
          {card}
        </motion.div>
      </div>
    </>
  )
}
