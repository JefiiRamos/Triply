"use client"

import { motion } from "framer-motion"
import { TrendingDown, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: TrendingDown,
    title: "Melhores precos",
    desc: "Comparamos dezenas de fontes para garantir que voce pague menos.",
  },
  {
    icon: Shield,
    title: "Reserva segura",
    desc: "Transacoes protegidas e suporte dedicado para sua tranquilidade.",
  },
  {
    icon: Clock,
    title: "Busca em tempo real",
    desc: "Precos atualizados a cada minuto, direto das companhias aereas e hoteis.",
  },
]

export default function FeatureHighlightsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto max-w-7xl px-4 pb-20 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,hsl(213_94%_68%/0.08),transparent_60%)]" />
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1 * i, duration: 0.45 }}
            className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-[0_16px_50px_-35px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
