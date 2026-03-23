"use client"

import { motion } from "framer-motion"
import { Building2, MapPin, Sparkles } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function HotelsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(255,255,255,1))]" />

          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-3xl border border-border/60 bg-white/85 p-6 shadow-[0_24px_80px_-55px_rgba(15,23,42,0.35)] backdrop-blur-xl md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Hoteis
                  </p>
                  <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                    Encontre hospedagens com conforto e economia
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Busque hoteis, apartamentos e ofertas especiais para a sua
                    viagem.
                  </p>
                </div>
                <div className="hidden items-center gap-2 rounded-2xl border border-border/60 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground shadow-[0_12px_30px_-28px_rgba(15,23,42,0.2)] md:flex">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Premium
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { title: "Centro historico", city: "Lisboa" },
                  { title: "Praia e relax", city: "Maceio" },
                  { title: "City break", city: "Sao Paulo" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.2)]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Building2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.city}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
