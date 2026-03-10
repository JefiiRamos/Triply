"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  CreditCard,
  Globe,
  Lock,
  Monitor,
  Moon,
  Settings,
  Shield,
  Sun,
  User,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import AppSelect from "@/components/ui/app-select"
import AppSwitch from "@/components/ui/app-switch"

function SettingRow({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: any
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/80 p-4 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.18)] md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground md:text-base">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

function SectionBlock({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.24)] backdrop-blur-xl md:p-7">
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  )
}

export default function SettingsPage() {
  const [language, setLanguage] = useState("pt-br")
  const [currency, setCurrency] = useState("brl")

  const languageOptions = [
    { value: "pt-br", label: "Português (BR)" },
    { value: "en-us", label: "English (US)" },
    { value: "es-es", label: "Español (ES)" },
  ]

  const currencyOptions = [
    { value: "brl", label: "Real brasileiro (BRL)" },
    { value: "usd", label: "Dólar americano (USD)" },
    { value: "eur", label: "Euro (EUR)" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-20 pt-10 md:pt-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.97),rgba(255,255,255,1))]" />
          <div className="absolute -top-24 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_62%)] blur-3xl" />

          <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-3xl border border-border/60 bg-white/85 p-8 shadow-[0_24px_80px_-55px_rgba(15,23,42,0.35)] backdrop-blur-xl md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Settings className="h-6 w-6" />
                  </span>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                      Sistema
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
                      Configuracoes
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                      Gerencie preferências da sua conta, alertas de viagem,
                      privacidade, segurança e aparência da plataforma.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/60 bg-white/80 px-4 py-3 text-center shadow-[0_16px_40px_-34px_rgba(15,23,42,0.18)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Notificações
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      Ativas
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-white/80 px-4 py-3 text-center shadow-[0_16px_40px_-34px_rgba(15,23,42,0.18)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Moeda
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      BRL
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-white/80 px-4 py-3 text-center shadow-[0_16px_40px_-34px_rgba(15,23,42,0.18)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Aparência
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      Claro
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-8">
                <SectionBlock
                  eyebrow="Conta"
                  title="Perfil e preferências"
                  description="Ajuste informações essenciais da sua conta e personalize a experiência dentro da plataforma."
                >
                  <SettingRow
                    icon={User}
                    title="Dados pessoais"
                    description="Atualize nome, e-mail, telefone e informações do perfil."
                    action={
                      <Button
                        variant="outline"
                        className="rounded-2xl border-border/70"
                      >
                        Editar
                      </Button>
                    }
                  />

                  <SettingRow
                    icon={Globe}
                    title="Idioma e região"
                    description="Defina o idioma principal, formato de data e localidade da plataforma."
                    action={
                      <div className="min-w-[240px]">
                        <AppSelect
                          value={language}
                          onValueChange={setLanguage}
                          options={languageOptions}
                          triggerClassName="h-10"
                        />
                      </div>
                    }
                  />

                  <SettingRow
                    icon={CreditCard}
                    title="Moeda padrão"
                    description="Escolha como os preços de voos, hotéis e ofertas serão exibidos."
                    action={
                      <div className="min-w-[240px]">
                        <AppSelect
                          value={currency}
                          onValueChange={setCurrency}
                          options={currencyOptions}
                          triggerClassName="h-10"
                        />
                      </div>
                    }
                  />
                </SectionBlock>

                <SectionBlock
                  eyebrow="Alertas"
                  title="Notificações e comunicação"
                  description="Controle os avisos que você deseja receber sobre preços, viagens, reservas e novidades."
                >
                  <SettingRow
                    icon={Bell}
                    title="Alertas de queda de preço"
                    description="Receba notificações quando voos ou hotéis salvos tiverem redução de preço."
                    action={<AppSwitch defaultChecked />}
                  />

                  <SettingRow
                    icon={Bell}
                    title="Atualizações de reserva"
                    description="Receba avisos sobre alterações de itinerário, check-in e status de hospedagens."
                    action={<AppSwitch defaultChecked />}
                  />

                  <SettingRow
                    icon={Bell}
                    title="Ofertas e campanhas"
                    description="Receba promoções personalizadas, tendências de destino e recomendações especiais."
                    action={<AppSwitch />}
                  />
                </SectionBlock>

                <SectionBlock
                  eyebrow="Segurança"
                  title="Privacidade e proteção"
                  description="Gerencie opções de segurança para manter sua conta protegida e com maior controle sobre seus dados."
                >
                  <SettingRow
                    icon={Lock}
                    title="Alterar senha"
                    description="Atualize sua senha regularmente para reforçar a segurança da conta."
                    action={
                      <Button
                        variant="outline"
                        className="rounded-2xl border-border/70"
                      >
                        Alterar
                      </Button>
                    }
                  />

                  <SettingRow
                    icon={Shield}
                    title="Autenticação em dois fatores"
                    description="Adicione uma camada extra de proteção ao fazer login na plataforma."
                    action={<AppSwitch />}
                  />

                  <SettingRow
                    icon={Shield}
                    title="Sessões ativas"
                    description="Veja em quais dispositivos sua conta está conectada e encerre acessos suspeitos."
                    action={
                      <Button
                        variant="outline"
                        className="rounded-2xl border-border/70"
                      >
                        Gerenciar
                      </Button>
                    }
                  />
                </SectionBlock>
              </div>

              <div className="space-y-8">
                <SectionBlock
                  eyebrow="Aparência"
                  title="Visual da plataforma"
                  description="Escolha a forma como a Triply será exibida durante a navegação."
                >
                  <div className="grid gap-4">
                    <button className="group rounded-2xl border border-primary/30 bg-primary/5 p-4 text-left transition hover:border-primary/50 hover:bg-primary/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                            <Sun className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">
                              Tema claro
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Layout limpo, luminoso e ideal para uso diário.
                            </p>
                          </div>
                        </div>

                        <div className="h-3 w-3 rounded-full bg-primary" />
                      </div>
                    </button>

                    <button className="group rounded-2xl border border-border/60 bg-white/80 p-4 text-left transition hover:border-primary/30 hover:bg-primary/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                            <Moon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">
                              Tema escuro
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Reduz brilho e traz um visual mais sofisticado.
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>

                    <button className="group rounded-2xl border border-border/60 bg-white/80 p-4 text-left transition hover:border-primary/30 hover:bg-primary/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                            <Monitor className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">
                              Seguir sistema
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Acompanha automaticamente a configuração do dispositivo.
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </SectionBlock>

                <SectionBlock
                  eyebrow="Resumo"
                  title="Estado atual da conta"
                  description="Visão rápida das configurações principais ativas neste momento."
                >
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-white to-slate-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Segurança
                      </p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        Proteção padrão ativa
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Senha ativa e autenticação em dois fatores disponível.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-white to-slate-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Comunicação
                      </p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        Alertas inteligentes habilitados
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Queda de preço e atualizações de viagem estão ativadas.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-white to-slate-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Experiência
                      </p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        Região Brasil e moeda BRL
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Resultados adaptados ao seu contexto de navegação.
                      </p>
                    </div>
                  </div>
                </SectionBlock>

                <section className="rounded-3xl border border-red-200 bg-red-50/80 p-6 shadow-[0_20px_60px_-48px_rgba(127,29,29,0.28)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-500/80">
                    Zona de risco
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-red-950">
                    Ações sensíveis
                  </h2>
                  <p className="mt-2 text-sm text-red-900/70">
                    Essas ações podem impactar permanentemente sua conta ou seus dados.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      className="rounded-2xl border-red-200 bg-white text-red-700 hover:bg-red-100"
                    >
                      Encerrar sessões
                    </Button>

                    <Button className="rounded-2xl bg-red-600 text-white hover:bg-red-700">
                      Solicitar exclusão da conta
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
