"use client"

import { motion } from "framer-motion"

const items = [
  {
    title: "Tudo em um unico lugar",
    desc: "Voos e hoteis juntos, com filtros claros e resultados que fazem sentido para o seu bolso.",
  },
  {
    title: "Alertas que acompanham voce",
    desc: "Salve uma rota e receba avisos quando o preco cair ou novas ofertas aparecerem.",
  },
  {
    title: "Escolhas rapidas",
    desc: "Compare opcoes lado a lado e finalize sua escolha em poucos minutos.",
  },
  {
    title: "Datas flexiveis",
    desc: "Veja combinacoes de ida e volta para economizar mesmo quando a agenda muda.",
  },
]

export default function FeatureCardsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35 }}
      className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(213_94%_68%/0.12),transparent_62%)]" />
      <div className="pointer-events-none absolute -left-10 top-10 -z-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -right-10 bottom-6 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl opacity-70" />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_60px_-40px_rgba(37,99,235,0.35)]"
          >
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
