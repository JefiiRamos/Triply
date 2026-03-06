"use client"

import { motion } from "framer-motion"
import ResultsCardSkeleton from "@/components/ui/results-card-skeleton"

export default function ResultsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto mt-16 max-w-7xl px-4 lg:px-8"
    >
      <div className="mb-8">
        <div className="h-7 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <ResultsCardSkeleton key={`fs-${i}`} variant="flight" />
        ))}
      </div>

      <div className="mb-8 mt-16">
        <div className="h-7 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <ResultsCardSkeleton key={`hs-${i}`} variant="hotel" />
        ))}
      </div>
    </motion.div>
  )
}
