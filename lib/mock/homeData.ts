export type DailyDeal = {
  id: string
  origin: string
  destination: string
  priceFrom: number
  discount?: number
}

export type PopularDestination = {
  id: string
  name: string
  priceFrom: number
  gradient: string
}

export const dailyDeals: DailyDeal[] = [
  {
    id: "deal-1",
    origin: "Sao Paulo",
    destination: "Lisboa",
    priceFrom: 2450,
    discount: 18,
  },
  {
    id: "deal-2",
    origin: "Curitiba",
    destination: "Recife",
    priceFrom: 890,
    discount: 12,
  },
  {
    id: "deal-3",
    origin: "Belo Horizonte",
    destination: "Buenos Aires",
    priceFrom: 1340,
  },
  {
    id: "deal-4",
    origin: "Rio de Janeiro",
    destination: "Santiago",
    priceFrom: 1580,
    discount: 10,
  },
  {
    id: "deal-5",
    origin: "Porto Alegre",
    destination: "Madrid",
    priceFrom: 2790,
  },
  {
    id: "deal-6",
    origin: "Sao Paulo",
    destination: "Maceio",
    priceFrom: 620,
    discount: 15,
  },
]

export const popularDestinations: PopularDestination[] = [
  {
    id: "dest-1",
    name: "Lisboa",
    priceFrom: 2450,
    gradient:
      "bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(255,255,255,0.9))]",
  },
  {
    id: "dest-2",
    name: "Buenos Aires",
    priceFrom: 1340,
    gradient:
      "bg-[linear-gradient(135deg,rgba(37,99,235,0.2),rgba(255,255,255,0.9))]",
  },
  {
    id: "dest-3",
    name: "Santiago",
    priceFrom: 1580,
    gradient:
      "bg-[linear-gradient(135deg,rgba(14,116,144,0.18),rgba(255,255,255,0.9))]",
  },
  {
    id: "dest-4",
    name: "Maceio",
    priceFrom: 620,
    gradient:
      "bg-[linear-gradient(135deg,rgba(59,130,246,0.15),rgba(255,255,255,0.95))]",
  },
  {
    id: "dest-5",
    name: "Paris",
    priceFrom: 2890,
    gradient:
      "bg-[linear-gradient(135deg,rgba(96,165,250,0.2),rgba(255,255,255,0.9))]",
  },
  {
    id: "dest-6",
    name: "Fortaleza",
    priceFrom: 740,
    gradient:
      "bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(255,255,255,0.95))]",
  },
]

export const generalSuggestions = [
  "Buenos Aires",
  "Santiago",
  "Montevideo",
  "Cancun",
  "Madrid",
  "Paris",
]
