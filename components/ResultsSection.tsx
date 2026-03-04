"use client"

import { motion } from "framer-motion"
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flights.map((flight, i) => (
            <FlightCard key={flight.id} flight={flight} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel, i) => (
            <HotelCard key={hotel.id} hotel={hotel} index={i} />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
