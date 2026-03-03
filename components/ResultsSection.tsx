"use client"

import { motion } from "framer-motion"
import { Plane, Building2 } from "lucide-react"
import FlightCard, { type Flight } from "@/components/FlightCard"
import HotelCard, { type Hotel } from "@/components/HotelCard"

type ResultsSectionProps = {
  flights: Flight[]
  hotels: Hotel[]
}

export default function ResultsSection({
  flights,
  hotels,
}: ResultsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Plane className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Voos mais baratos
            </h2>
            <p className="text-sm text-muted-foreground">
              {flights.length} voos encontrados
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flights.map((flight, i) => (
            <FlightCard key={flight.id} flight={flight} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Building2 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Hoteis disponiveis
            </h2>
            <p className="text-sm text-muted-foreground">
              {hotels.length} hoteis encontrados
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel, i) => (
            <HotelCard key={hotel.id} hotel={hotel} index={i} />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
