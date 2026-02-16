"use client"

import { motion } from "framer-motion"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"

export interface Hotel {
  id: number
  name: string
  image: string
  rating: number
  location: string
  pricePerNight: number
  reviewCount: number
}

interface HotelCardProps {
  hotel: Hotel
  index: number
}

export default function HotelCard({ hotel, index }: HotelCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.15)" }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-card/90 px-2.5 py-1 backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-foreground">{hotel.rating}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-foreground">{hotel.name}</h3>
        <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {hotel.location}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {hotel.reviewCount} avaliacoes
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-heading text-2xl font-bold text-primary">
              {"R$ " + hotel.pricePerNight.toLocaleString("pt-BR")}
            </p>
            <p className="text-xs text-muted-foreground">por noite</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
          >
            Reservar
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
