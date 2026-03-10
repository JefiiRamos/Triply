"use client"

import { motion } from "framer-motion"
import { MessageCircle, Plus, Search, Sparkles } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionCard from "@/components/ui/section-card"
import OrbLayer from "@/components/ui/orb-layer"
import { Button } from "@/components/ui/button"

const recentChats = [
  "Significado de Dobradinha F1",
  "Dor no joelho tenis alto",
  "Quanto ganha uma miss",
  "Orb atras do card",
  "Sugestoes para pagina home",
  "Significado de cena Vinland...",
  "Livro Inteligencia Social",
  "Banco de dados e NextAuth",
]

const suggestions = [
  "Quero descobrir destinos que combinem com meu estilo de viagem.",
  "Monte um roteiro de 4 dias em Florenca com arte e cafes.",
  "Ache hoteis boutique com bom custo-beneficio em Lisboa.",
]

export default function PremiumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-8 md:pt-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,1))]" />
          <div className="absolute -top-16 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_62%)] blur-2xl" />

          <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <SectionCard
                eyebrow="Triply IA"
                title="Converse com sua assistente de viagens"
                description="Conte seu estilo, preferencia e datas. Eu encontro lugares e planos sob medida."
                icon={Sparkles}
                headerRight={
                  <div className="hidden items-center gap-2 rounded-2xl border border-border/60 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground shadow-[0_12px_30px_-28px_rgba(15,23,42,0.2)] md:flex">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Premium
                  </div>
                }
              >
                <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                  <aside className="space-y-4">
                    <div className="space-y-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start rounded-2xl border-border/70 bg-white/80 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.25)]"
                      >
                        <Plus className="h-4 w-4" />
                        Novo chat
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start rounded-2xl text-muted-foreground hover:bg-white/70"
                      >
                        <Search className="h-4 w-4" />
                        Procurar chats
                      </Button>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)]">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Seus chats
                      </p>

                      <div className="space-y-2">
                        {recentChats.map((chat) => (
                          <button
                            key={chat}
                            className="w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition hover:bg-white"
                          >
                            {chat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </aside>

                  <div className="flex flex-col gap-6">
                    {/* <div className="chat-header rounded-3xl border border-border/60 bg-white/70 p-6 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.3)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                          <MessageCircle className="h-5 w-5 text-primary" />
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                            Chat Premium
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold text-foreground">
                            Em que posso ajudar hoje?
                          </h2>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Descreva seu estilo, preferencias e orcamento para eu
                            sugerir destinos e experiencias alinhadas a voce.
                          </p>
                        </div>
                      </div>
                    </div> */}

                    <div className="chat-history relative min-h-[520px] rounded-3xl border border-border/60 bg-white/40 px-4 py-6 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.12)]">
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <OrbLayer className="opacity-50" size={520} />
                      </div>

                      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                        <div className="chat-messages flex-1">
                          <div className="flex h-full items-center justify-center">
                            <div className="max-w-xl text-center">
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                                Chat Premium
                              </p>
                              <h3 className="mt-3 text-2xl font-semibold text-foreground">
                                Em que posso ajudar hoje?
                              </h3>
                              <p className="mt-3 text-sm text-muted-foreground">
                                Descreva seu estilo, preferencias e orcamento para eu
                                sugerir destinos e experiencias alinhadas a voce.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="chat-composer group relative z-10 w-full">
                          <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100" />

                          <div className="relative flex items-center gap-3 rounded-2xl border border-border/70 bg-white/75 p-3 shadow-[0_16px_50px_-40px_rgba(15,23,42,0.25)]">
                            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Plus className="h-4 w-4" />
                            </button>

                            <input
                              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                              placeholder="Pergunte qualquer coisa"
                            />

                            <Button
                              type="button"
                              className="rounded-2xl px-5 shadow-[0_16px_36px_-20px_rgba(37,99,235,0.5)]"
                            >
                              Enviar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="chat-suggestions pt-2">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Sugestoes rapidas
                      </p>

                      <div className="grid gap-3 md:grid-cols-3">
                        {suggestions.map((item) => (
                          <button
                            key={item}
                            className="rounded-2xl border border-border/60 bg-white/70 px-4 py-4 text-left text-sm text-muted-foreground shadow-[0_16px_50px_-40px_rgba(15,23,42,0.2)] transition hover:bg-white"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}