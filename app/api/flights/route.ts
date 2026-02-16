import { NextResponse } from "next/server"

const mockFlights = [
  {
    id: 1,
    destination: "Lisboa",
    airline: "TAP Portugal",
    departureTime: "08:30",
    arrivalTime: "20:15",
    duration: "9h 45m",
    price: 2450,
    stops: 0,
  },
  {
    id: 2,
    destination: "Paris",
    airline: "Air France",
    departureTime: "10:15",
    arrivalTime: "23:00",
    duration: "10h 45m",
    price: 2890,
    stops: 1,
  },
  {
    id: 3,
    destination: "Roma",
    airline: "Alitalia",
    departureTime: "14:00",
    arrivalTime: "05:30",
    duration: "11h 30m",
    price: 2670,
    stops: 1,
  },
  {
    id: 4,
    destination: "Madrid",
    airline: "Iberia",
    departureTime: "06:45",
    arrivalTime: "17:20",
    duration: "8h 35m",
    price: 2180,
    stops: 0,
  },
  {
    id: 5,
    destination: "Londres",
    airline: "British Airways",
    departureTime: "22:00",
    arrivalTime: "11:30",
    duration: "11h 30m",
    price: 3120,
    stops: 1,
  },
  {
    id: 6,
    destination: "Amsterdam",
    airline: "KLM",
    departureTime: "16:30",
    arrivalTime: "06:00",
    duration: "11h 30m",
    price: 2750,
    stops: 0,
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return NextResponse.json(mockFlights)
}
