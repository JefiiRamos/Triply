"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plane } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { type Flight } from "@/components/FlightCard"
import { type Hotel } from "@/components/HotelCard"
import ResultsSkeleton from "@/components/ResultsSkeleton"
import ScrollHeroSection from "@/components/ScrollHeroSection"
import SearchFormSection from "@/components/SearchFormSection"
import FeatureCardsSection from "@/components/FeatureCardsSection"
import FeatureSplitSection from "@/components/FeatureSplitSection"
import FeatureHighlightsSection from "@/components/FeatureHighlightsSection"
import ResultsSection from "@/components/ResultsSection"
import LandingSearchCard from "@/components/LandingSearchCard"

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
  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [typedLoadingText, setTypedLoadingText] = useState("")
  const [loadingTypingDone, setLoadingTypingDone] = useState(false)
  const resultsAnchorRef = useRef<HTMLDivElement | null>(null)
  const hasAutoScrolledRef = useRef(false)
  const typingTimeoutRef = useRef<number | null>(null)
  const loadingTypingTimeoutRef = useRef<number | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const storageKey = "planair:user"

  const resultsTitle =
    "Os resultados que conseguimos encontrar foram estes:"
  const loadingTitle =
    "Estamos reunindo as melhores oportunidades para voce."

  useEffect(() => {
    if (!hasSearched || hasAutoScrolledRef.current) return

    hasAutoScrolledRef.current = true
    requestAnimationFrame(() => {
      resultsAnchorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }, [hasSearched])

  useEffect(() => {
    const readUser = () => {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) {
        setIsLoggedIn(false)
        return
      }

      try {
        const parsed = JSON.parse(raw) as { email?: string }
        setIsLoggedIn(Boolean(parsed?.email))
      } catch {
        setIsLoggedIn(false)
      }
    }

    readUser()
    const handleAuthChange = () => readUser()
    window.addEventListener("planair-auth-change", handleAuthChange)
    window.addEventListener("storage", handleAuthChange)

    return () => {
      window.removeEventListener("planair-auth-change", handleAuthChange)
      window.removeEventListener("storage", handleAuthChange)
    }
  }, [storageKey])

  useEffect(() => {
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }

    if (!hasSearched || isLoading) {
      setTypedText("")
      setTypingDone(false)
      return
    }

    setTypedText("")
    setTypingDone(false)

    let index = 0
    const typeNext = () => {
      index += 1
      setTypedText(resultsTitle.slice(0, index))

      if (index < resultsTitle.length) {
        typingTimeoutRef.current = window.setTimeout(typeNext, 22)
      } else {
        setTypingDone(true)
      }
    }

    typingTimeoutRef.current = window.setTimeout(typeNext, 120)

    return () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
    }
  }, [hasSearched, isLoading, resultsTitle])

  useEffect(() => {
    if (loadingTypingTimeoutRef.current) {
      window.clearTimeout(loadingTypingTimeoutRef.current)
      loadingTypingTimeoutRef.current = null
    }

    if (!hasSearched || !isLoading) {
      setTypedLoadingText("")
      setLoadingTypingDone(false)
      return
    }

    setTypedLoadingText("")
    setLoadingTypingDone(false)

    let index = 0
    const typeNext = () => {
      index += 1
      setTypedLoadingText(loadingTitle.slice(0, index))

      if (index < loadingTitle.length) {
        loadingTypingTimeoutRef.current = window.setTimeout(typeNext, 20)
      } else {
        setLoadingTypingDone(true)
      }
    }

    loadingTypingTimeoutRef.current = window.setTimeout(typeNext, 120)

    return () => {
      if (loadingTypingTimeoutRef.current) {
        window.clearTimeout(loadingTypingTimeoutRef.current)
        loadingTypingTimeoutRef.current = null
      }
    }
  }, [hasSearched, isLoading, loadingTitle])

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
        {!hasSearched ? (
          <div className="relative">
            <ScrollHeroSection
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
            <FeatureCardsSection />
            <FeatureSplitSection />
            <FeatureHighlightsSection />
            <LandingSearchCard
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
        ) : (
          <>
            <SearchFormSection
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
            <div ref={resultsAnchorRef} className="h-4" />
          </>
        )}

        {!hasSearched && null}

        <AnimatePresence>
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 lg:px-8"
            >
              <motion.div
                animate={
                  isLoading
                    ? { y: 0, scale: 1 }
                    : { y: -4, scale: 1.01 }
                }
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/80 p-6 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.35)] backdrop-blur-xl md:p-8"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]" />
                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <motion.div
                      animate={
                        isLoading
                          ? { y: 0, opacity: 1 }
                          : { y: -2, opacity: 1 }
                      }
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <motion.p
                        key={isLoading ? "label-loading" : "label-ready"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70"
                      >
                        {isLoading ? "Buscando resultados" : "Sua pesquisa"}
                      </motion.p>
                      <motion.h2
                        key={isLoading ? "title-loading" : "title-ready"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-3 text-2xl font-semibold text-foreground md:text-3xl"
                      >
                        {isLoading ? typedLoadingText : typedText}
                        {isLoading ? (
                          !loadingTypingDone && (
                            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-amber-400/80 align-middle" />
                          )
                        ) : (
                          !typingDone && (
                            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary/60 align-middle" />
                          )
                        )}
                      </motion.h2>
                      <motion.p
                        key={isLoading ? "sub-loading" : "sub-ready"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mt-2 text-sm text-muted-foreground"
                      >
                        {isLoading
                          ? "Isso pode levar alguns segundos, dependendo das rotas e datas."
                          : `${flights.length} opcoes de voo e ${hotels.length} hoteis para comparar.`}
                      </motion.p>
                    </motion.div>
                  </div>
                  <motion.div
                    key={isLoading ? "status-loading" : "status-ready"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-[0_16px_40px_-32px_rgba(15,23,42,0.25)]"
                  >
                    <span
                      className={
                        isLoading
                          ? "h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400/80"
                          : "h-2.5 w-2.5 rounded-full bg-primary/70"
                      }
                    />
                    {isLoading ? "Pesquisando" : "Resultados prontos"}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && hasSearched && !isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mx-auto w-full max-w-7xl px-4 pb-6 lg:px-8"
            >
              <Link
                href="/login"
                className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-border/50 bg-white/60 p-4 text-left shadow-[0_12px_40px_-36px_rgba(15,23,42,0.22)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/25 md:flex-row md:items-center md:p-5"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/60">
                    Salve sua pesquisa
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground md:text-base">
                    Quer salvar essa pesquisa? Faca login em nossa plataforma
                    para ver suas pesquisas recentes e poder salvar quantas
                    viagens voce quiser!
                  </p>
                </div>
                <span className="inline-flex items-center justify-center rounded-xl bg-primary/90 px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-[0_12px_28px_-18px_rgba(37,99,235,0.45)] transition group-hover:bg-primary">
                  Fazer login
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{isLoading && <ResultsSkeleton />}</AnimatePresence>

        <AnimatePresence>
          {!isLoading && hasSearched && typingDone && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <ResultsSection flights={flights} hotels={hotels} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
