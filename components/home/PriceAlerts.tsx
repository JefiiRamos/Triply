"use client"

import { useMemo, useState } from "react"
import { Bell, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AppSwitch from "@/components/ui/app-switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type AlertEntry = {
  id: string
  origin: string
  destination: string
  targetPrice?: number
  status: "ativo" | "pausado"
}

type PriceAlertsProps = {
  origin: string
  destination: string
  alerts: AlertEntry[]
  onCreate: (targetPrice?: number) => void
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export default function PriceAlerts({
  origin,
  destination,
  alerts,
  onCreate,
  onToggle,
  onRemove,
}: PriceAlertsProps) {
  const [targetPrice, setTargetPrice] = useState("")
  const currentAlert = useMemo(
    () =>
      alerts.find(
        (item) => item.origin === origin && item.destination === destination,
      ),
    [alerts, destination, origin],
  )

  const canCreate = origin.trim().length > 0 && destination.trim().length > 0

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70">
            Alertas de preço
          </p>
          <h2 className="text-lg font-semibold text-foreground">
            Seja avisado quando baixar
          </h2>
        </div>
      </div>

      <Card className="rounded-3xl border border-border/60 bg-white/80 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)] dark:bg-slate-900/80">
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Criar alerta para essa rota
              </p>
              <p className="text-sm text-muted-foreground">
                {origin && destination
                  ? `${origin} → ${destination}`
                  : "Preencha origem e destino para ativar."}
              </p>
            </div>
            <AppSwitch
              checked={currentAlert?.status === "ativo"}
              onCheckedChange={(checked) => {
                if (!canCreate) return
                if (currentAlert) {
                  onToggle(currentAlert.id)
                } else if (checked) {
                  onCreate(targetPrice ? Number(targetPrice) : undefined)
                }
              }}
              aria-label="Ativar alerta"
              disabled={!canCreate}
            />
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={targetPrice}
              onChange={(event) => setTargetPrice(event.target.value)}
              placeholder="Preço alvo opcional"
              className="rounded-2xl border border-border/60 bg-white/80 px-4 py-2.5 text-sm shadow-[0_12px_32px_-26px_rgba(15,23,42,0.18)] focus-visible:ring-primary/20 dark:bg-slate-900/80"
            />
            <Button
              variant="outline"
              className="rounded-2xl border-border/60 bg-white/80 shadow-[0_12px_32px_-26px_rgba(15,23,42,0.18)] dark:bg-slate-900/80"
              onClick={() =>
                onCreate(targetPrice ? Number(targetPrice) : undefined)
              }
              disabled={!canCreate}
            >
              Criar alerta
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {alerts.length === 0 ? (
        <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)] dark:bg-slate-900/70">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Nenhum alerta configurado. Ative alertas para acompanhar os preços.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Seus alertas
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className="rounded-3xl border border-border/60 bg-white/85 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)] dark:bg-slate-900/80"
              >
                <CardContent className="space-y-3 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      {alert.origin} → {alert.destination}
                    </p>
                    <Badge
                      variant={alert.status === "ativo" ? "default" : "outline"}
                    >
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Preço alvo:{" "}
                    {alert.targetPrice
                      ? `R$ ${alert.targetPrice.toLocaleString("pt-BR")}`
                      : "Não definido"}
                  </p>
                  <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-2xl"
                      onClick={() => onToggle(alert.id)}
                    >
                      {alert.status === "ativo" ? "Pausar" : "Reativar"}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-2xl"
                      onClick={() => onRemove(alert.id)}
                      aria-label="Remover alerta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
