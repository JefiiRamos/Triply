"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Search, ArrowLeftRight } from "lucide-react"

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

function FieldShell({
  label,
  icon: Icon,
  children,
}: {
  label: string
  icon: any
  children: React.ReactNode
}) {
  return (
    <div className="group">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </p>
        </div>
      </div>

      <div className="relative">
        {/* glow on focus-within */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100" />
        <div className="relative rounded-2xl border border-border/70 bg-white/55 p-3 shadow-[0_16px_50px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  )
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
  const canSearch = useMemo(() => {
    // Você pode endurecer isso se quiser validar datas também
    return origin.trim().length > 0 && destination.trim().length > 0
  }, [origin, destination])

  function swapPlaces() {
    const o = origin
    setOrigin(destination)
    setDestination(o)
  }

  return (
    <motion.section
      initial={{ y: 26, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-5xl"
    >
      {/* Card container */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white/55 shadow-[0_30px_120px_-70px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_55%)]" />

        {/* Header */}
        <div className="flex items-start gap-4 border-b border-border/60 px-6 py-5 md:px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
              Primeiro passo
            </p>
            <h3 className="mt-1 text-lg font-bold text-foreground md:text-xl">
              Vamos fazer a sua primeira pesquisa de viagem?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Preencha os dados abaixo e encontre as melhores ofertas.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 md:px-8 md:py-8">
          <div className="grid gap-4 md:grid-cols-12">
            {/* Origem */}
            <div className="md:col-span-3">
              <FieldShell label="Origem" icon={MapPin}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="origin"
                    type="text"
                    placeholder="Ex: São Paulo"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </div>
              </FieldShell>
            </div>

            {/* Swap button */}
            <div className="flex items-end justify-center md:col-span-1">
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={swapPlaces}
                className="group mb-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-white/55 shadow-[0_16px_50px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl transition"
                aria-label="Trocar origem e destino"
              >
                <ArrowLeftRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
              </motion.button>
            </div>

            {/* Destino */}
            <div className="md:col-span-2">
              <FieldShell label="Destino" icon={MapPin}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="destination"
                    type="text"
                    placeholder="Ex: Lisboa"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </div>
              </FieldShell>
            </div>

            {/* Ida */}
            <div className="md:col-span-2">
              <FieldShell label="Ida" icon={Calendar}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground outline-none"
                  />
                </div>
              </FieldShell>
            </div>

            {/* Volta */}
            <div className="md:col-span-2">
              <FieldShell label="Volta" icon={Calendar}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground outline-none"
                  />
                </div>
              </FieldShell>
            </div>

            {/* Passageiros */}
            <div className="md:col-span-2">
              <FieldShell label="Passageiros" icon={Users}>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <select
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground outline-none"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </FieldShell>
            </div>
          </div>

          {/* Footer / CTA */}
          <div className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              Dica: você pode trocar origem e destino no botão do meio.
            </p>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSearch}
              disabled={isLoading || !canSearch}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground
                         shadow-[0_18px_40px_-20px_rgba(37,99,235,0.55)] transition
                         hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {/* shine */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative inline-flex items-center gap-2">
                <Search className="h-4 w-4" />
                {isLoading ? "Buscando..." : "Buscar ofertas"}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}