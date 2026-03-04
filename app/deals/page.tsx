"use client"

import { motion } from "framer-motion"
import { Percent, Tag } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function DealsPage() {
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
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                  Ofertas
                </p>
                <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
                  Melhores precos do dia
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Descubra ofertas exclusivas em voos e pacotes.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { title: "Sao Paulo → Lisboa", discount: "18%" },
                  { title: "Rio → Santiago", discount: "12%" },
                  { title: "Curitiba → Recife", discount: "15%" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/80 p-4 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.2)]"
                  >
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Oferta valida hoje
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <Percent className="h-3.5 w-3.5" />
                      {item.discount}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4 text-primary" />
                Mais ofertas chegando em breve.
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
