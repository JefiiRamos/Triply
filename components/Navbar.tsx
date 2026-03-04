"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CircleUser, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import appIcon from "@/lib/images/plann.er-icon.png"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const storageKey = "planair:user"

  useEffect(() => {
    const readUser = () => {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) {
        setUser(null)
        return
      }

      try {
        const parsed = JSON.parse(raw) as { name?: string; email?: string }
        if (parsed?.name) {
          setUser({ name: parsed.name, email: parsed.email ?? "" })
          return
        }
      } catch {
        // ignore invalid data
      }

      setUser(null)
    }

    readUser()

    const handleAuthChange = () => readUser()
    window.addEventListener("planair-auth-change", handleAuthChange)
    window.addEventListener("storage", handleAuthChange)

    return () => {
      window.removeEventListener("planair-auth-change", handleAuthChange)
      window.removeEventListener("storage", handleAuthChange)
    }
  }, [storageKey])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      {/* Sem blur no fundo: só um fade leve opcional */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/70 to-transparent" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Mobile: Logo */}
        <Link href="/" className="flex items-center md:hidden">
          <Image
            src={appIcon}
            alt="Triply"
            width={120}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop pills */}
        <div className="hidden w-full items-center justify-between md:flex">
          {/* Left pill: Logo */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),transparent_60%)]" />
            <div className="relative flex items-center rounded-full border border-border/60 bg-white/70 px-4 py-2 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={appIcon}
                  alt="Triply"
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Center pill: Links */}
          <div className="relative mx-auto">
            <div className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 opacity-70" />
            <div className="relative flex items-center gap-1 rounded-full border border-border/60 bg-white/70 p-1 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              {[
                { label: "Voos", href: "/" },
                { label: "Hoteis", href: "/" },
                { label: "Ofertas", href: "/" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground transition
                             hover:bg-white/70 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right pill: Enter / User */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),transparent_60%)]" />
            <div className="relative flex items-center rounded-full border border-border/60 bg-white/70 p-1 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              {user ? (
                <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CircleUser className="h-4 w-4" />
                  </span>
                  <span className="max-w-[160px] truncate">{user.name}</span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="group relative inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground
                             shadow-[0_14px_30px_-18px_rgba(37,99,235,0.55)] transition
                             hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">Entrar</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-white/70 text-foreground shadow-[0_16px_40px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl md:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden px-4 pb-4 md:hidden"
          >
            <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              {[
                { label: "Voos", href: "/" },
                { label: "Hoteis", href: "/" },
                { label: "Ofertas", href: "/" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition
                             hover:bg-white/70 hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <div className="mt-1 flex items-center gap-3 rounded-xl border border-border/60 bg-white/80 px-4 py-2 text-sm font-semibold text-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CircleUser className="h-4 w-4" />
                  </span>
                  <span className="truncate">{user.name}</span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="mt-1 rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  onClick={() => setMobileOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
