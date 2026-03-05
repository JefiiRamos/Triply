"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bell,
  Calendar,
  Clock,
  MapPin,
  Search,
  Sparkles,
  Users,
  Heart,
  ArrowRight,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useRouter, useSearchParams } from "next/navigation"
import { type Flight } from "@/components/FlightCard"
import { type Hotel } from "@/components/HotelCard"
import ResultsSection from "@/components/ResultsSection"
import ResultsSkeleton from "@/components/ResultsSkeleton"
import {
  dailyDeals,
  generalSuggestions,
  popularDestinations,
  type DailyDeal,
} from "@/lib/mock/homeData"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"
import RecentSearches from "@/components/home/RecentSearches"
import DailyDeals from "@/components/home/DailyDeals"
import PopularDestinations from "@/components/home/PopularDestinations"
import Favorites from "@/components/home/Favorites"
import PriceAlerts from "@/components/home/PriceAlerts"
import Recommendations from "@/components/home/Recommendations"
import PremiumBanner from "@/components/home/PremiumBanner"
import { Button } from "@/components/ui/button"

type RouteEntry = {
  id: string
  origin: string
  destination: string
  dateFrom?: string
  dateTo?: string
  passengers: string
}

type RouteInput = Omit<RouteEntry, "id">

type AlertEntry = {
  id: string
  origin: string
  destination: string
  targetPrice?: number
  status: "ativo" | "pausado"
}

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
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
  const [greeting, setGreeting] = useState("Ola")
  const [userName, setUserName] = useState("Viajante")
  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [typedLoadingText, setTypedLoadingText] = useState("")
  const [loadingTypingDone, setLoadingTypingDone] = useState(false)
  const typingTimeoutRef = useRef<number | null>(null)
  const loadingTypingTimeoutRef = useRef<number | null>(null)

  const [recentSearches, setRecentSearches] = useLocalStorageState<RouteEntry[]>(
    "triply:recentSearches",
    [],
  )
  const [favorites, setFavorites] = useLocalStorageState<RouteEntry[]>(
    "triply:favorites",
    [],
  )
  const [alerts, setAlerts] = useLocalStorageState<AlertEntry[]>(
    "triply:alerts",
    [],
  )

  useEffect(() => {
    const raw = window.localStorage.getItem("planair:user")
    if (!raw) {
      router.replace("/")
    }
  }, [router])

  useEffect(() => {
    const raw = window.localStorage.getItem("planair:user")
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as { name?: string }
      if (parsed?.name) {
        setUserName(parsed.name)
      }
    } catch {
      // ignore invalid data
    }
  }, [])

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    if (hour < 12) {
      setGreeting("Bom dia")
    } else if (hour < 18) {
      setGreeting("Boa tarde")
    } else {
      setGreeting("Boa noite")
    }
  }, [])

  const canSearch = useMemo(() => {
    return origin.trim().length > 0 && destination.trim().length > 0
  }, [origin, destination])

  const personalizedRecommendations = useMemo(() => {
    const mapping: Record<string, string[]> = {
      Lisboa: ["Porto", "Madrid", "Paris"],
      Paris: ["Londres", "Bruxelas", "Amsterda"],
      "Rio de Janeiro": ["Buzios", "Ilha Grande", "Arraial do Cabo"],
      "Buenos Aires": ["Mendoza", "Bariloche", "Santiago"],
    }

    const sources = [
      ...recentSearches.map((item) => item.destination),
      ...favorites.map((item) => item.destination),
    ]

    const match = sources.find((item) => mapping[item])
    if (!match) return []

    return mapping[match]
  }, [favorites, recentSearches])

  const activeFilter = (searchParams.get("filter") || "tudo").toLowerCase()
  const filterTitleMap: Record<string, string> = {
    tudo: "Tudo",
    voos: "Voos",
    hoteis: "Hoteis",
    ofertas: "Ofertas",
    favoritos: "Favoritos",
    alertas: "Alertas",
  }

  const todayLabel = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }).format(new Date())
    } catch {
      return ""
    }
  }, [])

  const activeAlertsCount = useMemo(() => {
    return alerts.filter((a) => a.status === "ativo").length
  }, [alerts])

  const lastRecent = useMemo(() => {
    return recentSearches?.[0] ?? null
  }, [recentSearches])

  const resultsTitle = useMemo(() => {
    switch (activeFilter) {
      case "voos":
        return "Os voos que encontramos para voce foram estes:"
      case "hoteis":
        return "Os hoteis que encontramos para voce foram estes:"
      case "ofertas":
        return "As ofertas que selecionamos para voce foram estas:"
      case "favoritos":
        return "Suas rotas favoritas em destaque:"
      case "alertas":
        return "Seus alertas ativos no momento:"
      default:
        return "Os resultados que conseguimos encontrar foram estes:"
    }
  }, [activeFilter])
  const loadingTitle = "Estamos reunindo as melhores oportunidades para voce."

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
    if (!canSearch) return

    const entry: RouteEntry = {
      id: crypto.randomUUID(),
      origin,
      destination,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      passengers,
    }

    setRecentSearches((current) => {
      const filtered = current.filter(
        (item) =>
          !(
            item.origin === entry.origin &&
            item.destination === entry.destination &&
            item.dateFrom === entry.dateFrom &&
            item.dateTo === entry.dateTo &&
            item.passengers === entry.passengers
          ),
      )
      return [entry, ...filtered].slice(0, 6)
    })

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

  useEffect(() => {
    if (!lastRecent || hasSearched) return

    setOrigin(lastRecent.origin)
    setDestination(lastRecent.destination)
    setDateFrom(lastRecent.dateFrom ?? "")
    setDateTo(lastRecent.dateTo ?? "")
    setPassengers(lastRecent.passengers)

    setIsLoading(true)
    setHasSearched(true)

    Promise.all([fetch("/api/flights"), fetch("/api/hotels")])
      .then(async ([flightsRes, hotelsRes]) => {
        const flightsData = await flightsRes.json()
        const hotelsData = await hotelsRes.json()
        setFlights(flightsData)
        setHotels(hotelsData)
      })
      .catch(() => {
        console.error("Erro ao buscar dados")
      })
      .finally(() => {
        setIsLoading(false)
        requestAnimationFrame(() => {
          resultsAnchorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        })
      })
  }, [hasSearched, lastRecent])

  function handleRepeatSearch(item: RouteEntry) {
    setOrigin(item.origin)
    setDestination(item.destination)
    setDateFrom(item.dateFrom ?? "")
    setDateTo(item.dateTo ?? "")
    setPassengers(item.passengers)
  }

  function handleRemoveRecent(id: string) {
    setRecentSearches((current) => current.filter((item) => item.id !== id))
  }

  function handleAddFavorite(item: RouteInput) {
    setFavorites((current) => {
      if (
        current.some(
          (favorite) =>
            favorite.origin === item.origin &&
            favorite.destination === item.destination,
        )
      ) {
        return current
      }
      return [{ ...item, id: crypto.randomUUID() }, ...current].slice(0, 10)
    })
  }

  function handleRemoveFavorite(id: string) {
    setFavorites((current) => current.filter((item) => item.id !== id))
  }

  function handlePickDeal(deal: DailyDeal) {
    setOrigin(deal.origin)
    setDestination(deal.destination)
  }

  function handlePickDestination(name: string) {
    setDestination(name)
  }

  function handleCreateAlert(targetPrice?: number) {
    if (!origin || !destination) return
    setAlerts((current) => {
      const exists = current.find(
        (item) => item.origin === origin && item.destination === destination,
      )
      if (exists) return current
      return [
        {
          id: crypto.randomUUID(),
          origin,
          destination,
          targetPrice,
          status: "ativo",
        },
        ...current,
      ]
    })
  }

  function handleToggleAlert(id: string) {
    setAlerts((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "ativo" ? "pausado" : "ativo" }
          : item,
      ),
    )
  }

  function handleRemoveAlert(id: string) {
    setAlerts((current) => current.filter((item) => item.id !== id))
  }

  // CTA inteligente: se tiver recente, repete o último. Senão, foca no formulário.
  function handleQuickStart() {
    if (lastRecent) {
      handleRepeatSearch(lastRecent)
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      })
      return
    }
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-12 pt-8 md:pt-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,1))]" />
          <div className="absolute -top-20 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_62%)] blur-2xl" />

          <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
            {/* WELCOME HERO (novo) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-7"
            >
              <div className="flex flex-col gap-5 rounded-3xl border border-border/60 bg-white/75 p-5 shadow-[0_24px_80px_-60px_rgba(15,23,42,0.35)] backdrop-blur-xl md:p-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary/75" />
                        </span>
                        Triply ao vivo
                      </span>

                      {todayLabel ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          {todayLabel}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground md:text-3xl">
                      <span className="text-muted-foreground">{greeting},</span>{" "}
                      <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                        {userName}
                      </span>
                      <span className="text-foreground">.</span>
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground md:text-base">
                      Seu painel está pronto: salve rotas, acompanhe preços e pegue
                      oportunidades no timing certo.
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/alerts")}
                      className="rounded-2xl border-border/70 bg-white/70 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.25)]"
                    >
                      <Bell className="h-4 w-4" />
                      Ver alertas
                    </Button>

                    <Button
                      type="button"
                      onClick={handleQuickStart}
                      className="rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
                    >
                      <Sparkles className="h-4 w-4" />
                      Começar rápido
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Favoritos
                      </p>
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                      {favorites.length}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Rotas salvas para acompanhar.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Alertas ativos
                      </p>
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                      {activeAlertsCount}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Monitorando quedas de preço.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Recentes
                      </p>
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                      {recentSearches.length}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Pesquisas prontas pra repetir.
                    </p>
                  </div>
                </div>

                {lastRecent ? (
                  <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-white/60 p-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-muted-foreground">
                      Última rota:{" "}
                      <span className="font-semibold text-foreground">
                        {lastRecent.origin}
                      </span>{" "}
                      →{" "}
                      <span className="font-semibold text-foreground">
                        {lastRecent.destination}
                      </span>
                      <span className="text-muted-foreground"> · </span>
                      <span className="text-muted-foreground">
                        {lastRecent.passengers} passageiro(s)
                      </span>
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRepeatSearch(lastRecent)}
                      className="rounded-2xl border-border/70 bg-white/70"
                    >
                      <Search className="h-4 w-4" />
                      Repetir agora
                    </Button>
                  </div>
                ) : null}
              </div>
            </motion.div>

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
                    <h1 className="mt-4 text-2xl font-semibold text-foreground md:text-3xl">
                      O que voce quer planejar hoje?
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Monte uma nova rota e acompanhe as ofertas em tempo real.
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 rounded-2xl border border-border/60 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground shadow-[0_12px_30px_-28px_rgba(15,23,42,0.2)] md:flex">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Premium
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <label
                      htmlFor="home-origin"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Origem
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                      <MapPin className="h-4 w-4 text-primary" />
                      <input
                        id="home-origin"
                        value={origin}
                        onChange={(event) => setOrigin(event.target.value)}
                        placeholder="Ex: Sao Paulo"
                        className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label
                      htmlFor="home-destination"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Destino
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                      <MapPin className="h-4 w-4 text-primary" />
                      <input
                        id="home-destination"
                        value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                        placeholder="Ex: Lisboa"
                        className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="home-date-from"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Ida
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                      <Calendar className="h-4 w-4 text-primary" />
                      <input
                        id="home-date-from"
                        type="date"
                        value={dateFrom}
                        onChange={(event) => setDateFrom(event.target.value)}
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="home-date-to"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Volta
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                      <Calendar className="h-4 w-4 text-primary" />
                      <input
                        id="home-date-to"
                        type="date"
                        value={dateTo}
                        onChange={(event) => setDateTo(event.target.value)}
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="home-passengers"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Passageiros
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
                      <Users className="h-4 w-4 text-primary" />
                      <select
                        id="home-passengers"
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
                    Dica: voce pode salvar varias rotas e acompanhar as ofertas.
                  </p>
                  <Button
                    type="button"
                    onClick={handleSearch}
                    disabled={!canSearch}
                    className="rounded-2xl shadow-[0_16px_36px_-20px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
                  >
                    <Search className="h-4 w-4" />
                    Buscar viagens
                  </Button>
                </div>
              </motion.div>

            <div ref={resultsAnchorRef} className="h-6" />
          </div>
        </section>

        {hasSearched && (
          <>
            <section className="mx-auto w-full max-w-7xl px-4 pb-10 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.35)] backdrop-blur-xl md:p-8"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]" />
                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        {isLoading ? "Buscando resultados" : "Sua pesquisa"}
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
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
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {isLoading
                          ? "Isso pode levar alguns segundos, dependendo das rotas e datas."
                          : `${flights.length} opcoes de voo e ${hotels.length} hoteis para comparar.`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-[0_16px_40px_-32px_rgba(15,23,42,0.25)]">
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
              </motion.div>
            </section>

            <AnimatePresence mode="wait">
              <motion.div
                key={`results-${activeFilter}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <section className="mx-auto w-full max-w-7xl px-4 pb-16 lg:px-8">
                  {isLoading ? (
                    <ResultsSkeleton />
                  ) : activeFilter === "voos" ? (
                    <ResultsSection flights={flights} hotels={[]} />
                  ) : activeFilter === "hoteis" ? (
                    <ResultsSection flights={[]} hotels={hotels} />
                  ) : (
                    <ResultsSection flights={flights} hotels={hotels} />
                  )}
                </section>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`extras-${activeFilter}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {activeFilter === "tudo" && (
                  <section className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-16 lg:px-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Search className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Pesquisas recentes
                      </p>
                    </div>
                    <RecentSearches
                      items={recentSearches}
                      onRepeat={handleRepeatSearch}
                      onRemove={handleRemoveRecent}
                      onAddFavorite={handleAddFavorite}
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Ofertas do dia
                      </p>
                    </div>
                    <DailyDeals
                      deals={dailyDeals}
                      isLoadingDeals={false}
                      onPickDeal={handlePickDeal}
                      onAddFavorite={handleAddFavorite}
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Destinos populares
                      </p>
                    </div>
                    <PopularDestinations
                      items={popularDestinations}
                      onSelect={handlePickDestination}
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Heart className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Favoritos
                      </p>
                    </div>
                    <Favorites items={favorites} onRemove={handleRemoveFavorite} />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Bell className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Alertas de preco
                      </p>
                    </div>
                    <PriceAlerts
                      origin={origin}
                      destination={destination}
                      alerts={alerts}
                      onCreate={handleCreateAlert}
                      onToggle={handleToggleAlert}
                      onRemove={handleRemoveAlert}
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Recomendacoes
                      </p>
                    </div>
                    <Recommendations
                      personalized={personalizedRecommendations}
                      general={generalSuggestions}
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Premium
                      </p>
                    </div>
                    <PremiumBanner />
                  </section>
                )}

                {activeFilter === "ofertas" && (
                  <section className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-16 lg:px-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Ofertas do dia
                      </p>
                    </div>
                    <DailyDeals
                      deals={dailyDeals}
                      isLoadingDeals={false}
                      onPickDeal={handlePickDeal}
                      onAddFavorite={handleAddFavorite}
                    />
                  </section>
                )}

                {activeFilter === "favoritos" && (
                  <section className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-16 lg:px-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Heart className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Favoritos
                      </p>
                    </div>
                    <Favorites items={favorites} onRemove={handleRemoveFavorite} />
                  </section>
                )}

                {activeFilter === "alertas" && (
                  <section className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-16 lg:px-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Bell className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Alertas de preco
                      </p>
                    </div>
                    <PriceAlerts
                      origin={origin}
                      destination={destination}
                      alerts={alerts}
                      onCreate={handleCreateAlert}
                      onToggle={handleToggleAlert}
                      onRemove={handleRemoveAlert}
                    />
                  </section>
                )}

                {activeFilter === "voos" && (
                  <section className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-16 lg:px-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Search className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Pesquisas recentes
                      </p>
                    </div>
                    <RecentSearches
                      items={recentSearches}
                      onRepeat={handleRepeatSearch}
                      onRemove={handleRemoveRecent}
                      onAddFavorite={handleAddFavorite}
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Ofertas do dia
                      </p>
                    </div>
                    <DailyDeals
                      deals={dailyDeals}
                      isLoadingDeals={false}
                      onPickDeal={handlePickDeal}
                      onAddFavorite={handleAddFavorite}
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Destinos populares
                      </p>
                    </div>
                    <PopularDestinations
                      items={popularDestinations}
                      onSelect={handlePickDestination}
                    />
                  </section>
                )}

                {activeFilter === "hoteis" && (
                  <section className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-16 lg:px-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Destinos populares
                      </p>
                    </div>
                    <PopularDestinations
                      items={popularDestinations}
                      onSelect={handlePickDestination}
                    />
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                        Premium
                      </p>
                    </div>
                    <PremiumBanner />
                  </section>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {!hasSearched && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`filters-${activeFilter}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {activeFilter === "tudo" && (
                <section className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-16 lg:px-8">
                  <RecentSearches
                    items={recentSearches}
                    onRepeat={handleRepeatSearch}
                    onRemove={handleRemoveRecent}
                    onAddFavorite={handleAddFavorite}
                  />
                  <DailyDeals
                    deals={dailyDeals}
                    isLoadingDeals={false}
                    onPickDeal={handlePickDeal}
                    onAddFavorite={handleAddFavorite}
                  />
                  <PopularDestinations
                    items={popularDestinations}
                    onSelect={handlePickDestination}
                  />
                  <Favorites items={favorites} onRemove={handleRemoveFavorite} />
                  <PriceAlerts
                    origin={origin}
                    destination={destination}
                    alerts={alerts}
                    onCreate={handleCreateAlert}
                    onToggle={handleToggleAlert}
                    onRemove={handleRemoveAlert}
                  />
                  <Recommendations
                    personalized={personalizedRecommendations}
                    general={generalSuggestions}
                  />
                  <PremiumBanner />
                </section>
              )}

              {activeFilter === "ofertas" && (
                <section className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-16 lg:px-8">
                  <DailyDeals
                    deals={dailyDeals}
                    isLoadingDeals={false}
                    onPickDeal={handlePickDeal}
                    onAddFavorite={handleAddFavorite}
                  />
                </section>
              )}

              {activeFilter === "favoritos" && (
                <section className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-16 lg:px-8">
                  <Favorites items={favorites} onRemove={handleRemoveFavorite} />
                </section>
              )}

              {activeFilter === "alertas" && (
                <section className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-16 lg:px-8">
                  <PriceAlerts
                    origin={origin}
                    destination={destination}
                    alerts={alerts}
                    onCreate={handleCreateAlert}
                    onToggle={handleToggleAlert}
                    onRemove={handleRemoveAlert}
                  />
                </section>
              )}

              {(activeFilter === "voos" || activeFilter === "hoteis") && (
                <section className="mx-auto w-full max-w-7xl px-4 pb-16 lg:px-8">
                  <div className="rounded-3xl border border-border/60 bg-white/70 p-6 text-sm text-muted-foreground shadow-[0_18px_60px_-42px_rgba(15,23,42,0.2)]">
                    Faça uma pesquisa para ver resultados de{" "}
                    {activeFilter === "voos" ? "voos" : "hoteis"}.
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  )
}
