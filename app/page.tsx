"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
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
        )}

        {!hasSearched && null}

        <AnimatePresence>{isLoading && <ResultsSkeleton />}</AnimatePresence>

        <AnimatePresence>
          {!isLoading && hasSearched && (
            <ResultsSection flights={flights} hotels={hotels} />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
