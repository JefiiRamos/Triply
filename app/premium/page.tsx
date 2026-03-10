"use client"

import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Image as ImageIcon,
  MessageCircle,
  Mic,
  Plus,
  Search,
  Sparkles,
} from "lucide-react"
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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [isAttachOpen, setIsAttachOpen] = useState(false)
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const audioInputRef = useRef<HTMLInputElement | null>(null)

  const filteredChats = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return recentChats
    return recentChats.filter((chat) => chat.toLowerCase().includes(term))
  }, [searchTerm])

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
                  <motion.aside
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start rounded-2xl border-border/70 bg-white/80 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.25)]"
                        onClick={() => setSelectedChat(null)}
                      >
                        <Plus className="h-4 w-4" />
                        Novo chat
                      </Button>

                      <div className="relative">
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Search className="h-4 w-4" />
                        </div>
                        <input
                          value={searchTerm}
                          onChange={(event) => setSearchTerm(event.target.value)}
                          placeholder="Procurar chats"
                          className="w-full rounded-2xl border border-border/60 bg-white/80 py-3 pl-10 pr-3 text-sm text-foreground shadow-[0_16px_40px_-34px_rgba(15,23,42,0.2)] outline-none transition focus:border-primary/50"
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-[0_18px_50px_-44px_rgba(15,23,42,0.25)]">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Seus chats
                      </p>

                      <div className="space-y-2">
                        {filteredChats.map((chat) => (
                          <motion.button
                            key={chat}
                            onClick={() => setSelectedChat(chat)}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className={`w-full rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white ${
                              selectedChat === chat
                                ? "bg-white text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {chat}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.aside>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
                    className="flex flex-col gap-6"
                  >
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

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="chat-history relative min-h-[520px] rounded-3xl border border-border/60 bg-white/40 px-4 py-6 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.12)]"
                    >
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
                            <button
                              type="button"
                              onClick={() => setIsAttachOpen((open) => !open)}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
                              aria-label="Adicionar anexos"
                            >
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

                          {isAttachOpen ? (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute left-0 top-full z-20 mt-3 w-[240px] rounded-2xl border border-border/60 bg-white/95 p-2 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)]"
                            >
                              <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground transition hover:bg-muted/50"
                              >
                                <ImageIcon className="h-4 w-4 text-primary" />
                                Selecionar imagem
                              </button>
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground transition hover:bg-muted/50"
                              >
                                <FileText className="h-4 w-4 text-primary" />
                                Selecionar arquivo
                              </button>
                              <button
                                type="button"
                                onClick={() => audioInputRef.current?.click()}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground transition hover:bg-muted/50"
                              >
                                <Mic className="h-4 w-4 text-primary" />
                                Selecionar audio
                              </button>
                            </motion.div>
                          ) : null}

                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                          />
                          <input
                            ref={audioInputRef}
                            type="file"
                            accept="audio/*"
                            className="hidden"
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
                      className="chat-suggestions pt-2"
                    >
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Sugestoes rapidas
                      </p>

                      <div className="grid gap-3 md:grid-cols-3">
                        {suggestions.map((item) => (
                          <motion.button
                            key={item}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="rounded-2xl border border-border/60 bg-white/70 px-4 py-4 text-left text-sm text-muted-foreground shadow-[0_16px_50px_-40px_rgba(15,23,42,0.2)] transition hover:bg-white"
                          >
                            {item}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
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
