"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  ArrowUpRight,
  Bell,
  Briefcase,
  Calendar,
  Crown,
  CreditCard,
  Globe,
  Heart,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Plane,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function ProfilePage() {
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (!digits) return ""

    let rest = digits
    if (rest.startsWith("55")) {
      rest = rest.slice(2)
    }

    rest = rest.slice(0, 11)
    const area = rest.slice(0, 2)
    const local = rest.slice(2)
    const splitIndex = local.length > 8 ? 5 : 4

    let formatted = "+55"
    if (area) formatted += ` (${area})`
    if (local) {
      formatted += " "
      formatted +=
        local.length > splitIndex
          ? `${local.slice(0, splitIndex)}-${local.slice(splitIndex)}`
          : local
    }

    return formatted
  }
  const editSectionRef = useRef<HTMLDivElement | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [profile, setProfile] = useState({
    name: "Jeferson Ramos",
    email: "jeferson@email.com",
    phone: "+55 11 99999-0000",
    birthDate: "12 de jan de 1992",
    language: "Portugues",
    currency: "BRL",
    country: "Brasil",
    originCity: "Sao Paulo",
    favoriteAirport: "GRU",
    plan: "Premium anual",
    planStatus: "Premium ativo",
  })
  const [profileDraft, setProfileDraft] = useState({
    displayName: "Jeferson Ramos",
    phone: "+55 11 99999-0000",
    originCity: "Sao Paulo",
    currency: "BRL",
    language: "Portugues",
    favoriteAirport: "GRU",
  })
  const [notificationPrefs, setNotificationPrefs] = useState([
    { title: "Queda de preco", description: "Aviso quando houver queda", enabled: true },
    { title: "Novas ofertas", description: "Alertas de oportunidades", enabled: true },
    { title: "Rotas favoritas", description: "Notificar para suas rotas", enabled: true },
    { title: "Promocoes relampago", description: "Melhores ofertas do dia", enabled: false },
    { title: "Resumo semanal", description: "Email com top destinos", enabled: false },
  ])

  useEffect(() => {
    if (!actionMessage) return
    const timer = setTimeout(() => setActionMessage(null), 3000)
    return () => clearTimeout(timer)
  }, [actionMessage])

  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = "smooth"
    return () => {
      root.style.scrollBehavior = previous
    }
  }, [])

  const showAction = (message: string) => {
    setActionMessage(message)
  }

  const startEditing = () => {
    if (isEditingProfile) return
    setProfileDraft({
      displayName: profile.name,
      phone: profile.phone,
      originCity: profile.originCity,
      currency: profile.currency,
      language: profile.language,
      favoriteAirport: profile.favoriteAirport,
    })
    setIsEditingProfile(true)
    showAction("Modo de edicao ativado.")
  }

  const handleEditToggle = () => {
    if (isEditingProfile) {
      setProfileDraft({
        displayName: profile.name,
        phone: profile.phone,
        originCity: profile.originCity,
        currency: profile.currency,
        language: profile.language,
        favoriteAirport: profile.favoriteAirport,
      })
      setIsEditingProfile(false)
      showAction("Edicao cancelada.")
      return
    }

    startEditing()
  }

  const handleEditFromHero = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    startEditing()
    editSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    showAction("Editando perfil...")
  }

  const handleProfileSave = () => {
    if (!isEditingProfile) {
      showAction("Ative o modo de edicao para salvar.")
      return
    }

    setIsSavingProfile(true)
    setTimeout(() => {
      setProfile((prev) => ({
        ...prev,
        name: profileDraft.displayName,
        phone: profileDraft.phone,
        originCity: profileDraft.originCity,
        currency: profileDraft.currency,
        language: profileDraft.language,
        favoriteAirport: profileDraft.favoriteAirport,
      }))
      setIsSavingProfile(false)
      setIsEditingProfile(false)
      showAction("Perfil atualizado com sucesso.")
    }, 900)
  }

  const handleSecurityAction = (action: string) => {
    showAction(`Acao: ${action}. Em breve integrado ao backend.`)
  }

  const handleNotificationToggle = (title: string) => {
    setNotificationPrefs((prev) =>
      prev.map((item) =>
        item.title === title ? { ...item, enabled: !item.enabled } : item,
      ),
    )
    showAction(`Notificacao atualizada: ${title}.`)
  }

  const personalInfo = useMemo(
    () => [
      { label: "Nome completo", value: profile.name, icon: User },
      { label: "Email", value: profile.email, icon: Mail },
      { label: "Telefone", value: profile.phone, icon: Smartphone },
      { label: "Data de nascimento", value: profile.birthDate, icon: Calendar },
      { label: "Idioma preferido", value: profile.language, icon: Globe },
      { label: "Moeda preferida", value: profile.currency, icon: Wallet },
      { label: "Pais/regiao", value: profile.country, icon: MapPin },
      { label: "Origem padrao", value: profile.originCity, icon: Plane },
    ],
    [profile],
  )
  const stats = [
    { label: "Pesquisas recentes", value: "12", icon: Search },
    { label: "Favoritos salvos", value: "5", icon: Heart },
    { label: "Alertas ativos", value: "3", icon: Bell },
    { label: "Destino mais buscado", value: "Lisboa", icon: TrendingUp },
  ]

  const travelPrefs = [
    { label: "Classe favorita", value: "Economica", icon: Plane },
    { label: "Tipo de viagem", value: "Lazer e trabalho", icon: Briefcase },
    { label: "Assento preferido", value: "Janela", icon: Star },
    { label: "Faixa de orcamento", value: "Intermediario", icon: Wallet },
    { label: "Companhias favoritas", value: "LATAM, TAP, Azul", icon: Plane },
    { label: "Destinos favoritos", value: "Lisboa, Santiago, Recife", icon: MapPin },
    { label: "Interesse em promocoes", value: "Internacionais", icon: Sparkles },
    { label: "Interesse em", value: "Voos e hoteis", icon: Heart },
  ]

  const securityActions = [
    {
      title: "Alterar senha",
      description: "Ultima atualizacao ha 3 meses",
      icon: KeyRound,
      action: "Atualizar",
    },
    {
      title: "Autenticacao em duas etapas",
      description: "Proteja sua conta com 2FA",
      icon: ShieldCheck,
      action: "Ativar",
    },
    {
      title: "Dispositivos conectados",
      description: "3 dispositivos conectados",
      icon: Smartphone,
      action: "Gerenciar",
    },
    {
      title: "Sair da conta",
      description: "Encerrar sessao atual",
      icon: LogOut,
      action: "Sair",
      danger: true,
    },
  ]

  const activityItems = [
    { label: "Ultima busca", value: "Sao Paulo -> Lisboa - ontem", icon: Plane },
    { label: "Oferta acompanhada", value: "Curitiba -> Orlando - ativo", icon: Activity },
    { label: "Alerta recente", value: "Rio -> Buenos Aires - pausado", icon: Bell },
  ]

  const favoriteRoutes = ["Sao Paulo -> Lisboa", "Curitiba -> Santiago", "Rio -> Buenos Aires"]
  const monitoredAlerts = [
    { route: "SP -> Lisboa", status: "Ativo" },
    { route: "Curitiba -> Orlando", status: "Pausado" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-14 pt-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(210_90%_60%/0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,hsl(185_90%_52%/0.08),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,1))]" />

          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="rounded-[28px] border border-border/60 bg-white/85 p-6 shadow-[0_28px_90px_-60px_rgba(15,23,42,0.45)] backdrop-blur-xl md:p-8"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-transparent text-primary ring-1 ring-sky-500/20">
                    <User className="h-7 w-7" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-foreground md:text-3xl">{profile.name}</h1>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <Crown className="h-3.5 w-3.5" />
                        Premium ativo
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {profile.originCity}, {profile.country}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        Acompanhe preferencias, alertas e historico em um so lugar
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#editar-perfil"
                    onClick={handleEditFromHero}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar perfil
                  </a>
                  <button
                    onClick={() => showAction("Gerenciamento de assinatura aberto.")}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <CreditCard className="h-4 w-4" />
                    Gerenciar assinatura
                  </button>
                </div>
              </motion.div>

              {actionMessage ? (
                <motion.div
                  variants={fadeUp}
                  className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary"
                >
                  {actionMessage}
                </motion.div>
              ) : null}

              <motion.div variants={fadeUp} className="mt-6 grid gap-4 md:grid-cols-4">
                {stats.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-border/60 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                      onClick={() => showAction(`Abrindo detalhe: ${item.label}.`)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-xs text-muted-foreground">Hoje</span>
                      </div>
                      <p className="mt-3 text-lg font-semibold text-foreground">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
          >
            <div className="space-y-6">
              <motion.div
                id="editar-perfil"
                ref={editSectionRef}
                variants={fadeUp}
                className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                      Informacoes pessoais
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-foreground">Dados da conta</h2>
                  </div>
                  <button
                    onClick={handleEditToggle}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-xs font-semibold text-muted-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    {isEditingProfile ? "Cancelar edicao" : "Editar"}
                  </button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {personalInfo.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="rounded-2xl bg-slate-50/60 p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon className="h-3.5 w-3.5" />
                          {item.label}
                        </div>
                        <p className="mt-2 text-sm font-semibold text-foreground">{item.value}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-border/80 bg-slate-50/70 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
                    <Pencil className="h-3.5 w-3.5" />
                    Editar perfil rapido
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ajuste dados essenciais para personalizar buscas e alertas.
                  </p>
                  <div
                    className={`mt-4 grid gap-4 sm:grid-cols-2 ${
                      isEditingProfile ? "" : "opacity-70"
                    }`}
                  >
                    <label className="space-y-2 text-xs font-semibold text-muted-foreground">
                      Nome exibido
                      <input
                        value={profileDraft.displayName}
                        onChange={(event) =>
                          setProfileDraft((prev) => ({
                            ...prev,
                            displayName: event.target.value,
                          }))
                        }
                        disabled={!isEditingProfile}
                        className="w-full rounded-2xl border border-border/60 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </label>
                    <label className="space-y-2 text-xs font-semibold text-muted-foreground">
                      Telefone
                      <input
                        value={profileDraft.phone}
                        onChange={(event) =>
                          setProfileDraft((prev) => ({
                            ...prev,
                            phone: formatPhone(event.target.value),
                          }))
                        }
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+55 (11) 99999-0000"
                        disabled={!isEditingProfile}
                        className="w-full rounded-2xl border border-border/60 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </label>
                    <label className="space-y-2 text-xs font-semibold text-muted-foreground">
                      Cidade de origem
                      <input
                        value={profileDraft.originCity}
                        onChange={(event) =>
                          setProfileDraft((prev) => ({
                            ...prev,
                            originCity: event.target.value,
                          }))
                        }
                        disabled={!isEditingProfile}
                        className="w-full rounded-2xl border border-border/60 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </label>
                    <label className="space-y-2 text-xs font-semibold text-muted-foreground">
                      Moeda preferida
                      <select
                        value={profileDraft.currency}
                        onChange={(event) =>
                          setProfileDraft((prev) => ({
                            ...prev,
                            currency: event.target.value,
                          }))
                        }
                        disabled={!isEditingProfile}
                        className="w-full rounded-2xl border border-border/60 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                      >
                        <option>BRL</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                    </label>
                    <label className="space-y-2 text-xs font-semibold text-muted-foreground">
                      Idioma
                      <select
                        value={profileDraft.language}
                        onChange={(event) =>
                          setProfileDraft((prev) => ({
                            ...prev,
                            language: event.target.value,
                          }))
                        }
                        disabled={!isEditingProfile}
                        className="w-full rounded-2xl border border-border/60 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                      >
                        <option>Portugues</option>
                        <option>English</option>
                        <option>Espanol</option>
                      </select>
                    </label>
                    <label className="space-y-2 text-xs font-semibold text-muted-foreground">
                      Aeroporto favorito
                      <input
                        value={profileDraft.favoriteAirport}
                        onChange={(event) =>
                          setProfileDraft((prev) => ({
                            ...prev,
                            favoriteAirport: event.target.value,
                          }))
                        }
                        disabled={!isEditingProfile}
                        className="w-full rounded-2xl border border-border/60 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </label>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleProfileSave}
                      disabled={!isEditingProfile || isSavingProfile}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSavingProfile ? "Salvando..." : "Salvar alteracoes"}
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-4 py-2 text-xs font-semibold text-muted-foreground"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                  Preferencias de viagem
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">Seu estilo de viagem</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {travelPrefs.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="rounded-2xl border border-border/60 bg-white/90 p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon className="h-3.5 w-3.5" />
                          {item.label}
                        </div>
                        <p className="mt-2 text-sm font-semibold text-foreground">{item.value}</p>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                  Seguranca e conta
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">Controle de acesso</h2>
                <div className="mt-4 space-y-3">
                  {securityActions.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.title}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-white/90 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSecurityAction(item.title)}
                          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                            item.danger
                              ? "border border-rose-200 bg-rose-50 text-rose-600"
                              : "border border-border/70 bg-white text-foreground"
                          }`}
                        >
                          {item.action}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div variants={fadeUp} className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                  Resumo da conta
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">Visao geral</h2>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50/70 p-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Plano atual</p>
                      <p className="text-sm font-semibold text-foreground">{profile.plan}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Ativo
                    </span>
                  </div>
                  <div className="rounded-2xl bg-slate-50/70 p-4 text-xs text-muted-foreground">
                    Conta criada em 12 de jan de 2024 - Ultimo login ha 2 dias
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                  Atividade do usuario
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">Historico recente</h2>
                <div className="mt-4 space-y-3">
                  {activityItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-slate-50/70 p-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                  Notificacoes
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">Alertas inteligentes</h2>
                <div className="mt-4 space-y-3">
                  {notificationPrefs.map((item) => (
                    <div key={item.title} className="flex items-start justify-between gap-3 rounded-2xl bg-slate-50/70 p-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(item.title)}
                        className={`h-6 w-11 rounded-full border transition ${
                          item.enabled
                            ? "border-emerald-400/40 bg-emerald-400/30"
                            : "border-slate-200 bg-white"
                        }`}
                        aria-pressed={item.enabled}
                      >
                        <span
                          className={`block h-5 w-5 rounded-full bg-white shadow-sm transition ${
                            item.enabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
                  Favoritos e alertas
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">Rotas acompanhadas</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Rotas favoritas</p>
                    <div className="mt-2 space-y-2">
                      {favoriteRoutes.map((route) => (
                        <div key={route} className="flex items-center justify-between rounded-2xl bg-slate-50/70 p-3">
                          <span className="text-sm font-medium text-foreground">{route}</span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Alertas monitorados</p>
                    <div className="mt-2 space-y-2">
                      {monitoredAlerts.map((alert) => (
                        <div key={alert.route} className="flex items-center justify-between rounded-2xl bg-slate-50/70 p-3">
                          <span className="text-sm font-medium text-foreground">{alert.route}</span>
                          <span
                            className={`text-xs font-semibold ${
                              alert.status === "Ativo" ? "text-emerald-600" : "text-slate-500"
                            }`}
                          >
                            {alert.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-xs font-semibold text-muted-foreground">
                    <Heart className="h-3.5 w-3.5" />
                    Gerenciar favoritos
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-3xl border border-primary/20 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(14,165,233,0.1))] p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">Plano Premium</p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">Beneficios destravados</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Seu plano Premium esta ativo. Aproveite alertas ilimitados, ofertas prioritarias e suporte dedicado.
                </p>
                <button
                  onClick={() => showAction("Beneficios Premium exibidos.")}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                >
                  Ver beneficios
                </button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
