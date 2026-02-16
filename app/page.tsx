"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, Building2, TrendingDown, Shield, Clock } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SearchForm from "@/components/SearchForm"
import FlightCard, { type Flight } from "@/components/FlightCard"
import HotelCard, { type Hotel } from "@/components/HotelCard"
import ResultsSkeleton from "@/components/ResultsSkeleton"

export default function Page() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [passengers, setPassengers] = useState("1")

  const [flights, setFlights] = useState<Flight[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch() {
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
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-16 pt-16 md:pt-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.08),transparent_60%)]" />

          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <TrendingDown className="h-4 w-4" />
                Precos exclusivos disponveis
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl"
            >
              Descubra voos e hoteis pelo melhor preco
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
            >
              Compare precos e encontre sua proxima viagem pagando menos.
              Milhares de ofertas atualizadas em tempo real.
            </motion.p>

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
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
        </section>

        {/* Feature Pills */}
        {!hasSearched && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto max-w-7xl px-4 pb-20 lg:px-8"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: TrendingDown,
                  title: "Melhores precos",
                  desc: "Comparamos dezenas de fontes para garantir que voce pague menos.",
                },
                {
                  icon: Shield,
                  title: "Reserva segura",
                  desc: "Transacoes protegidas e suporte dedicado para sua tranquilidade.",
                },
                {
                  icon: Clock,
                  title: "Busca em tempo real",
                  desc: "Precos atualizados a cada minuto, direto das companhias aereas e hoteis.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Loading State */}
        <AnimatePresence>{isLoading && <ResultsSkeleton />}</AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {!isLoading && hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Flights */}
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

              {/* Hotels */}
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
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
