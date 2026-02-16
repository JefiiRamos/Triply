import { NextResponse } from "next/server"

const mockHotels = [
  {
    id: 1,
    name: "Grand Hotel Lisboa",
    image: "/images/hotel-1.jpg",
    rating: 4.8,
    location: "Lisboa, Portugal",
    pricePerNight: 580,
    reviewCount: 1243,
  },
  {
    id: 2,
    name: "Le Marais Boutique",
    image: "/images/hotel-2.jpg",
    rating: 4.6,
    location: "Paris, Franca",
    pricePerNight: 720,
    reviewCount: 987,
  },
  {
    id: 3,
    name: "Roma Palace Hotel",
    image: "/images/hotel-3.jpg",
    rating: 4.9,
    location: "Roma, Italia",
    pricePerNight: 650,
    reviewCount: 2156,
  },
  {
    id: 4,
    name: "Madrid Central Suites",
    image: "/images/hotel-4.jpg",
    rating: 4.5,
    location: "Madrid, Espanha",
    pricePerNight: 430,
    reviewCount: 876,
  },
  {
    id: 5,
    name: "The London Heritage",
    image: "/images/hotel-5.jpg",
    rating: 4.7,
    location: "Londres, Reino Unido",
    pricePerNight: 890,
    reviewCount: 1567,
  },
  {
    id: 6,
    name: "Amsterdam Canal View",
    image: "/images/hotel-6.jpg",
    rating: 4.4,
    location: "Amsterdam, Holanda",
    pricePerNight: 510,
    reviewCount: 743,
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return NextResponse.json(mockHotels)
}
