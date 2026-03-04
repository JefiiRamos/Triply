"use client"

import { Award, Bell, ShieldCheck, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PremiumBanner() {
  return (
    <section className="space-y-4">
      <Card className="rounded-3xl border border-border/60 bg-white/85 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.25)]">
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70">
                Triply Premium
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Controle total das suas viagens
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Alertas ilimitados, monitoramento em tempo real e recomendacoes
                avancadas.
              </p>
            </div>
            <Button className="rounded-2xl">
              <Sparkles className="h-4 w-4" />
              Experimentar Premium
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Alertas ilimitados",
              "Monitoramento em tempo real",
              "Recomendacoes avancadas",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/60 bg-white/80 p-4 text-sm font-semibold text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.2)]"
              >
                {item}
              </div>
            ))}
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 text-sm text-foreground">
              <Award className="h-4 w-4 text-primary" />
              +120 companhias
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 text-sm text-foreground">
              <Bell className="h-4 w-4 text-primary" />
              Precos em tempo real
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 text-sm text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Salve e acompanhe rotas
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
