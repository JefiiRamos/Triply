"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Search } from "lucide-react"

interface SearchFormProps {
  origin: string
  setOrigin: (v: string) => void
  destination: string
  setDestination: (v: string) => void
  dateFrom: string
  setDateFrom: (v: string) => void
  dateTo: string
  setDateTo: (v: string) => void
  passengers: string
  setPassengers: (v: string) => void
  onSearch: () => void
  isLoading: boolean
}

export default function SearchForm({
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
}: SearchFormProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mx-auto mt-10 max-w-5xl rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-5">
        {/* Origin */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="origin"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <MapPin className="h-3.5 w-3.5" />
            Origem
          </label>
          <input
            id="origin"
            type="text"
            placeholder="Ex: Sao Paulo"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Destination */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="destination"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <MapPin className="h-3.5 w-3.5" />
            Destino
          </label>
          <input
            id="destination"
            type="text"
            placeholder="Ex: Lisboa"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Date From */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="dateFrom"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <Calendar className="h-3.5 w-3.5" />
            Ida
          </label>
          <input
            id="dateFrom"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="dateTo"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <Calendar className="h-3.5 w-3.5" />
            Volta
          </label>
          <input
            id="dateTo"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Passengers */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="passengers"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <Users className="h-3.5 w-3.5" />
            Passageiros
          </label>
          <select
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="1">1 Passageiro</option>
            <option value="2">2 Passageiros</option>
            <option value="3">3 Passageiros</option>
            <option value="4">4 Passageiros</option>
            <option value="5">5+ Passageiros</option>
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSearch}
        disabled={isLoading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 disabled:opacity-70 md:w-auto"
      >
        <Search className="h-5 w-5" />
        {isLoading ? "Buscando..." : "Buscar"}
      </motion.button>
    </motion.div>
  )
}
