import { Suspense } from "react"
import HomePageClient from "./HomePageClient"

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-slate-950" />}>
      <HomePageClient />
    </Suspense>
  )
}
