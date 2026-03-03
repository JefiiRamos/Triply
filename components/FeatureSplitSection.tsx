"use client"

import { motion } from "framer-motion"

export default function FeatureSplitSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto max-w-7xl px-4 pb-16 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(213_94%_68%/0.08),transparent_65%)]" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-[0_16px_60px_-40px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
            Transparencia total
          </p>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground">
            Voce controla o que aparece na sua busca
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Ordene por preco, duracao ou horario. Remova escalas longas e
            encontre a opcao que combina com seu ritmo.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Menos escalas", "Tempo total", "Melhor horario"].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-background/85 to-accent/10 p-8 shadow-[0_20px_70px_-50px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
            Decida rapido
          </p>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground">
            Itinerarios pensados para economizar
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Montamos combinacoes que fazem sentido para voce gastar menos sem
            abrir mao do conforto.
          </p>
          <div className="mt-6 rounded-2xl border border-border/70 bg-background/80 p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Lisboa • 5 noites</span>
              <span className="font-semibold text-primary">-18%</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm font-semibold text-foreground">
              <span>R$ 3.980</span>
              <span>Melhor oferta</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
