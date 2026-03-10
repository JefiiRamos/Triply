"use client"

import { Sparkles, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type RecommendationsProps = {
  personalized: string[]
  general: string[]
}

export default function Recommendations({
  personalized,
  general,
}: RecommendationsProps) {
  const showPersonalized = personalized.length > 0

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/70">
            Recomendacoes
          </p>
          <h2 className="text-lg font-semibold text-foreground">
            Para voce agora
          </h2>
        </div>
      </div>

      <Tabs defaultValue={showPersonalized ? "personalized" : "general"}>
        <TabsList className="rounded-2xl">
          <TabsTrigger value="personalized">Para voce</TabsTrigger>
          <TabsTrigger value="general">Sugestoes gerais</TabsTrigger>
        </TabsList>
        <div className="relative mt-4">
          <TabsContent
            value="personalized"
            forceMount
            className="transition-all duration-300 data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:translate-y-2 data-[state=inactive]:opacity-0 data-[state=active]:relative data-[state=active]:translate-y-0 data-[state=active]:opacity-100"
          >
            {showPersonalized ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {personalized.map((item) => (
                  <Card
                    key={item}
                    className="rounded-3xl border border-border/60 bg-white/80 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)]"
                  >
                    <CardContent className="flex items-center gap-3 p-5">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold text-foreground">
                        {item}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)]">
                <CardContent className="p-6 text-sm text-muted-foreground">
                  Busque mais rotas para receber recomendacoes personalizadas.
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent
            value="general"
            forceMount
            className="transition-all duration-300 data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:translate-y-2 data-[state=inactive]:opacity-0 data-[state=active]:relative data-[state=active]:translate-y-0 data-[state=active]:opacity-100"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {general.map((item) => (
                <Card
                  key={item}
                  className="rounded-3xl border border-border/60 bg-white/80 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.2)]"
                >
                  <CardContent className="flex items-center gap-3 p-5">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold text-foreground">
                      {item}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  )
}
