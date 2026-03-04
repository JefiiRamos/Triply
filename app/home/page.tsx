"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Search, Sparkles, Users } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useRouter } from "next/navigation"
import { type Flight } from "@/components/FlightCard"
import { type Hotel } from "@/components/HotelCard"
import ResultsSection from "@/components/ResultsSection"
import ResultsSkeleton from "@/components/ResultsSkeleton"

type SearchEntry = {
  id: string
  origin: string
  destination: string
  dateFrom?: string
  dateTo?: string
  passengers: string
  createdAt: string
}

export default function HomePage() {
  const router = useRouter()
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [passengers, setPassengers] = useState("1")
  const [flights, setFlights] = useState<Flight[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const resultsAnchorRef = useRef<HTMLDivElement | null>(null)
  const storageKey = "planair:user"

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) {
      router.replace("/")
    }
  }, [router, storageKey])

  const canSearch = useMemo(() => {
    return origin.trim().length > 0 && destination.trim().length > 0
  }, [origin, destination])

  async function handleSearch() {
    if (!canSearch) return
    const entry: SearchEntry = {
      id: crypto.randomUUID(),
      origin,
      destination,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      passengers,
      createdAt: "Agora",
    }
    setIsLoading(true)
    setHasSearched(true)

    try {
      const [flightsRes, hotelsRes] = await Promise.all([
        fetch("/api/flights"),
        fetch("/api/hotels"),
      ])

      const flightsData = await flightsRes.json()
      const hotelsData = await hotelsRes.json()

      setFlights(flightsData)
      setHotels(hotelsData)
    } catch {
      console.error("Erro ao buscar dados")
    } finally {
      setIsLoading(false)
      requestAnimationFrame(() => {
        resultsAnchorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-8 md:pt-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(255,255,255,1))]" />

          <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6">
              <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="rounded-3xl border border-border/60 bg-white/85 p-6 shadow-[0_24px_80px_-55px_rgba(15,23,42,0.35)] backdrop-blur-xl md:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Home
                      </p>
                      <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                        O que voce quer planejar hoje?
                      </h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Monte uma nova rota e acompanhe as ofertas em tempo
                        real.
                      </p>
                    </div>
                    <div className="hidden items-center gap-2 rounded-2xl border border-border/60 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground shadow-[0_12px_30px_-28px_rgba(15,23,42,0.2)] md:flex">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Premium
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-12">
                    <div className="md:col-span-3">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Origem
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                        <MapPin className="h-4 w-4 text-primary" />
                        <input
                          value={origin}
                          onChange={(event) => setOrigin(event.target.value)}
                          placeholder="Ex: Sao Paulo"
                          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Destino
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                        <MapPin className="h-4 w-4 text-primary" />
                        <input
                          value={destination}
                          onChange={(event) =>
                            setDestination(event.target.value)
                          }
                          placeholder="Ex: Lisboa"
                          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Ida
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                        <Calendar className="h-4 w-4 text-primary" />
                        <input
                          type="date"
                          value={dateFrom}
                          onChange={(event) => setDateFrom(event.target.value)}
                          className="w-full bg-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Volta
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                        <Calendar className="h-4 w-4 text-primary" />
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(event) => setDateTo(event.target.value)}
                          className="w-full bg-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Passageiros
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                        <Users className="h-4 w-4 text-primary" />
                        <select
                          value={passengers}
                          onChange={(event) => setPassengers(event.target.value)}
                          className="w-full bg-transparent outline-none"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <p className="text-xs text-muted-foreground">
                      Dica: voce pode salvar varias rotas e acompanhar as
                      ofertas.
                    </p>
                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={!canSearch}
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)] transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Search className="h-4 w-4" />
                      Buscar viagens
                    </button>
                  </div>
              </motion.div>
              <div ref={resultsAnchorRef} className="h-6" />
            </div>
            {hasSearched && (
              <div className="mt-8 rounded-3xl border border-border/60 bg-white/70 p-6 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.25)] backdrop-blur-xl md:p-8">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                      Resultados
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground">
                      {isLoading
                        ? "Procurando as melhores opcoes para voce."
                        : "Separamos as melhores opcoes para a sua viagem."}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {isLoading
                        ? "Aguarde alguns segundos enquanto consultamos as ofertas."
                        : `${flights.length} opcoes de voo e ${hotels.length} hoteis encontrados.`}
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 rounded-2xl border border-border/60 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground md:flex">
                    <span
                      className={
                        isLoading
                          ? "h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400/80"
                          : "h-2.5 w-2.5 rounded-full bg-primary/70"
                      }
                    />
                    {isLoading ? "Pesquisando" : "Resultados prontos"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {hasSearched && (
          <div className="mx-auto w-full max-w-7xl px-4 pb-16 lg:px-8">
            {isLoading ? (
              <ResultsSkeleton />
            ) : (
              <ResultsSection flights={flights} hotels={hotels} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
