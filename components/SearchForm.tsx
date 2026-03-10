"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Search, ArrowLeftRight } from "lucide-react"
import SectionCard from "@/components/ui/section-card"
import OrbLayer from "@/components/ui/orb-layer"
import PrettySelect from "@/components/ui/pretty-select"

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
  showOrbBackground?: boolean
  orbSize?: number
  eyebrow?: string
  title?: string
  description?: string
  headerRight?: React.ReactNode
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
  showOrbBackground = false,
  orbSize,
  eyebrow = "Primeiro passo",
  title = "Vamos fazer a sua primeira pesquisa de viagem?",
  description = "Preencha os dados abaixo e encontre as melhores ofertas.",
  headerRight,
}: SearchFormProps) {
  const canSearch = useMemo(() => {
    return origin.trim().length > 0 && destination.trim().length > 0
  }, [origin, destination])

  const passengerOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ]

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
      <div
        className={
          showOrbBackground
            ? "relative flex min-h-[420px] items-center justify-center py-20"
            : "relative"
        }
      >
        {showOrbBackground ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
            <OrbLayer className="opacity-60" size={orbSize ?? 880} />
          </div>
        ) : null}

        <SectionCard
          eyebrow={eyebrow}
          title={title}
          description={description}
          icon={Search}
          className="relative z-10 w-full"
          headerRight={headerRight}
        >
          <div className="grid gap-4 md:grid-cols-12">
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

            <div className="md:col-span-2">
              <PrettySelect
                label="Passageiros"
                icon={Users}
                value={passengers}
                onValueChange={setPassengers}
                options={passengerOptions}
                placeholder="Selecione"
              />
            </div>
          </div>

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
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative inline-flex items-center gap-2">
                <Search className="h-4 w-4" />
                {isLoading ? "Buscando..." : "Buscar ofertas"}
              </span>
            </motion.button>
          </div>
        </SectionCard>
      </div>
    </motion.section>
  )
}
