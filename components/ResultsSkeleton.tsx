"use client"

import { motion } from "framer-motion"

function FlightSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-muted" />
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-3 w-16 rounded bg-muted" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-6 w-20 rounded bg-muted" />
          <div className="h-3 w-14 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-5 h-16 rounded-xl bg-muted" />
      <div className="mt-4 h-11 rounded-xl bg-muted" />
    </div>
  )
}

function HotelSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-48 bg-muted" />
      <div className="p-5">
        <div className="h-5 w-3/4 rounded bg-muted" />
        <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
        <div className="mt-1 h-3 w-1/3 rounded bg-muted" />
        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="h-6 w-20 rounded bg-muted" />
            <div className="h-3 w-14 rounded bg-muted" />
          </div>
          <div className="h-10 w-24 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  )
}

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
          <FlightSkeleton key={`fs-${i}`} />
        ))}
      </div>

      <div className="mb-8 mt-16">
        <div className="h-7 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <HotelSkeleton key={`hs-${i}`} />
        ))}
      </div>
    </motion.div>
  )
}
