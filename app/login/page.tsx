"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showRegisterPasswordConfirm, setShowRegisterPasswordConfirm] =
    useState(false)

  const mockAccount = {
    name: "Jeferson",
    email: "jeferson@gmail.com",
    password: "admin123",
  }
  const storageKey = "planair:user"

  const handleUseMockLogin = () => {
    setMode("login")
    setEmail(mockAccount.email)
    setPassword(mockAccount.password)
  }

  const handleLogin = async () => {
    if (isSubmitting) return
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail || !password) {
      toast({
        title: "Preencha os dados",
        description: "Informe email e senha para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 650))

    const isValid =
      normalizedEmail === mockAccount.email && password === mockAccount.password

    if (isValid) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ name: mockAccount.name, email: mockAccount.email }),
      )
      window.dispatchEvent(new Event("planair-auth-change"))

      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta. Seu acesso foi liberado.",
      })

      router.push("/")
    } else {
      toast({
        title: "Nao foi possivel entrar",
        description: "Confira seu email e senha e tente novamente.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  const handleRegister = async () => {
    if (isSubmitting) return
    const normalizedEmail = email.trim().toLowerCase()

    if (!name.trim() || !normalizedEmail || !password || !passwordConfirm) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos para criar sua conta.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "Use ao menos 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    if (password !== passwordConfirm) {
      toast({
        title: "Senhas diferentes",
        description: "As senhas precisam ser iguais.",
        variant: "destructive",
      })
      return
    }

    if (normalizedEmail === mockAccount.email) {
      toast({
        title: "Email ja cadastrado",
        description: "Use outro email ou faca login.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 650))

    toast({
      title: "Conta criada com sucesso!",
      description: "Agora voce pode entrar com seu novo acesso.",
    })

    setMode("login")
    setPassword("")
    setPasswordConfirm("")
    setIsSubmitting(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-12 md:pt-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,252,0.92),rgba(255,255,255,1))]" />

          <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto w-full max-w-4xl"
            >
              <div className="grid gap-8 rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.45)] backdrop-blur-2xl md:grid-cols-[1.05fr_0.95fr] md:p-8">
                <AnimatePresence mode="wait">
                  {mode === "login" ? (
                    <motion.div
                      key="login-form"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="rounded-2xl border border-border/60 bg-white/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
                        Acesse sua conta
                      </p>
                      <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground">
                        Bem-vindo de volta
                      </h1>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Entre para acompanhar suas buscas, alertas e ofertas
                        favoritas.
                      </p>

                      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(37,99,235,0.35)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                          Acesso demo
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            Email:{" "}
                            <span className="font-semibold text-foreground">
                              {mockAccount.email}
                            </span>
                          </p>
                          <p className="text-muted-foreground">
                            Senha:{" "}
                            <span className="font-semibold text-foreground">
                              {mockAccount.password}
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleUseMockLogin}
                          className="mt-3 w-full rounded-lg border border-primary/30 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_10px_26px_-20px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-white"
                        >
                          Usar login demo
                        </button>
                      </div>

                      <div className="mt-8 space-y-4">
                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Email
                          <div className="flex items-center gap-3 rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/30 focus-within:shadow-[0_18px_50px_-32px_rgba(37,99,235,0.45)]">
                            <Mail className="h-4 w-4 text-primary" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="voce@exemplo.com"
                              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                            />
                          </div>
                        </label>

                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Senha
                          <div className="flex items-center gap-3 rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/30 focus-within:shadow-[0_18px_50px_-32px_rgba(37,99,235,0.45)]">
                            <Lock className="h-4 w-4 text-primary" />
                            <input
                              type={showLoginPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Digite sua senha"
                              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowLoginPassword((current) => !current)
                              }
                              className="text-muted-foreground transition hover:text-primary"
                              aria-label={
                                showLoginPassword
                                  ? "Ocultar senha"
                                  : "Mostrar senha"
                              }
                            >
                              {showLoginPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </label>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-border text-primary"
                          />
                          Lembrar de mim
                        </label>
                        <button
                          type="button"
                          className="font-semibold text-primary hover:text-primary/80"
                        >
                          Esqueci a senha
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleLogin}
                        disabled={isSubmitting}
                        className="mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-22px_rgba(37,99,235,0.6)] transition hover:-translate-y-0.5 hover:bg-primary/90"
                      >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register-info"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-white to-accent/10 p-6"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_55%)]" />
                      <div className="relative space-y-6">
                        <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                            Primeira viagem
                          </p>
                          <h2 className="mt-3 text-xl font-semibold text-foreground">
                            Conta gratuita
                          </h2>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Crie sua conta e receba alertas personalizados para
                            suas rotas favoritas.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                            Economize tempo
                          </p>
                          <h2 className="mt-3 text-xl font-semibold text-foreground">
                            Ofertas salvas
                          </h2>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Tenha acesso rapido as pesquisas mais recentes.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="w-full rounded-xl border border-primary/20 bg-white/90 px-5 py-3 text-sm font-semibold text-primary shadow-[0_14px_30px_-20px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-white"
                        >
                          Já tem uma conta? 
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {mode === "login" ? (
                    <motion.div
                      key="login-info"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-white to-accent/10 p-6"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_55%)]" />
                      <div className="relative space-y-6">
                        <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                            Novidade
                          </p>
                          <h2 className="mt-3 text-xl font-semibold text-foreground">
                            Alertas inteligentes
                          </h2>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Receba notificacoes quando os precos das rotas que
                            voce acompanha baixarem.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                            Mais rapido
                          </p>
                          <h2 className="mt-3 text-xl font-semibold text-foreground">
                            Suas buscas salvas
                          </h2>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Volte de onde parou e finalize sua viagem em poucos
                            cliques.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setMode("register")}
                          className="w-full rounded-xl border border-primary/20 bg-white/90 px-5 py-3 text-sm font-semibold text-primary shadow-[0_14px_30px_-20px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-white"
                        >
                          Criar conta
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register-form"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="rounded-2xl border border-border/60 bg-white/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
                        Crie sua conta
                      </p>
                      <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground">
                        Comece agora
                      </h1>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Leva menos de um minuto para ter acesso as melhores
                        ofertas.
                      </p>

                      <div className="mt-8 space-y-4">
                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Nome completo
                          <div className="flex items-center gap-3 rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/30 focus-within:shadow-[0_18px_50px_-32px_rgba(37,99,235,0.45)]">
                            <User className="h-4 w-4 text-primary" />
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Seu nome completo"
                              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                            />
                          </div>
                        </label>

                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Email
                          <div className="flex items-center gap-3 rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/30 focus-within:shadow-[0_18px_50px_-32px_rgba(37,99,235,0.45)]">
                            <Mail className="h-4 w-4 text-primary" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="voce@exemplo.com"
                              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                            />
                          </div>
                        </label>

                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Senha
                          <div className="flex items-center gap-3 rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/30 focus-within:shadow-[0_18px_50px_-32px_rgba(37,99,235,0.45)]">
                            <Lock className="h-4 w-4 text-primary" />
                            <input
                              type={showRegisterPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Crie uma senha"
                              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowRegisterPassword((current) => !current)
                              }
                              className="text-muted-foreground transition hover:text-primary"
                              aria-label={
                                showRegisterPassword
                                  ? "Ocultar senha"
                                  : "Mostrar senha"
                              }
                            >
                              {showRegisterPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </label>

                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Confirmar senha
                          <div className="flex items-center gap-3 rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/30 focus-within:shadow-[0_18px_50px_-32px_rgba(37,99,235,0.45)]">
                            <Lock className="h-4 w-4 text-primary" />
                            <input
                              type={
                                showRegisterPasswordConfirm
                                  ? "text"
                                  : "password"
                              }
                              value={passwordConfirm}
                              onChange={(e) => setPasswordConfirm(e.target.value)}
                              placeholder="Repita a senha"
                              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowRegisterPasswordConfirm((current) => !current)
                              }
                              className="text-muted-foreground transition hover:text-primary"
                              aria-label={
                                showRegisterPasswordConfirm
                                  ? "Ocultar senha"
                                  : "Mostrar senha"
                              }
                            >
                              {showRegisterPasswordConfirm ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={handleRegister}
                        disabled={isSubmitting}
                        className="mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-22px_rgba(37,99,235,0.6)] transition hover:-translate-y-0.5 hover:bg-primary/90"
                      >
                        {isSubmitting ? "Criando conta..." : "Criar conta"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
