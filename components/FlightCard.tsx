"use client"

import { motion } from "framer-motion"
import { Plane, Clock, ArrowRight } from "lucide-react"

export interface Flight {
  id: number
  destination: string
  airline: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  stops: number
}

interface FlightCardProps {
  flight: Flight
  index: number
}

export default function FlightCard({ flight, index }: FlightCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.15)" }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Plane className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{flight.airline}</p>
            <p className="text-xs text-muted-foreground">
              {flight.stops === 0 ? "Direto" : `${flight.stops} parada${flight.stops > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-heading text-2xl font-bold text-primary">
            {"R$ " + flight.price.toLocaleString("pt-BR")}
          </p>
          <p className="text-xs text-muted-foreground">por pessoa</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{flight.departureTime}</p>
          <p className="text-xs text-muted-foreground">Partida</p>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 px-4">
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {flight.duration}
          </div>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{flight.arrivalTime}</p>
          <p className="text-xs text-muted-foreground">{flight.destination}</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:mt-auto"
      >
        Ver oferta
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </motion.div>
  )
}
