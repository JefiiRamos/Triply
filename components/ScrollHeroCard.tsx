"use client"

import { motion } from "framer-motion"
import SearchForm from "@/components/SearchForm"

type ScrollHeroCardProps = {
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
  cardY: number
  cardScale: number
}

export default function ScrollHeroCard({
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
  cardY,
  cardScale,
}: ScrollHeroCardProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-[1200px] px-4 lg:px-8">
        <div className="relative h-[220px] overflow-hidden md:h-[260px]">
          <motion.div
            style={{ y: cardY, scale: cardScale }}
            className="pointer-events-auto mx-auto w-full max-w-[960px]"
          >
            <div className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-[0_30px_120px_-50px_rgba(15,23,42,0.35)] backdrop-blur-xl">
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}
