"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TechniqueEfficiencyOverview } from "@/components/dashboard/technique-efficiency-overview"
import { TechniqueEfficiencyBySubject } from "@/components/dashboard/technique-efficiency-by-subject"
import type { AnalyticsData } from "@/types/progress"

type Tab = "overview" | "by-subject"

const TABS: { id: Tab; label: string }[] = [
  { id: "overview",   label: "Overview" },
  { id: "by-subject", label: "By Subject" },
]

export function TechniqueEfficiencyCard({ data, insight }: { data: AnalyticsData["techniqueEfficiency"]; insight: string }) {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <div className={cn("rounded-xl border p-5 flex flex-col gap-4")}>
      <div className={cn("flex items-start justify-between gap-4")}>
        <div>
          <p className="text-sm font-semibold">Technique Efficiency</p>
          <p className="text-xs text-muted-foreground">Mastery gains per hour of application</p>
        </div>
        <div className={cn(
          // layout
          "flex",
          // border
          "rounded-lg border overflow-hidden",
          // shrink
          "shrink-0",
        )}>
          {TABS.map(t => (
            <Button
              key={t.id}
              size="default"
              variant="ghost"
              onClick={() => setTab(t.id)}
              className={cn(
                // layout
                "rounded-none",
                // spacing
                "px-5",
                // typography
                "text-sm",
                // conditional
                t.id === tab
                  ? "bg-foreground text-background hover:bg-foreground hover:text-background font-medium"
                  : "text-muted-foreground",
              )}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </div>

      {tab === "overview"   && <TechniqueEfficiencyOverview data={data} />}
      {tab === "by-subject" && <TechniqueEfficiencyBySubject data={data} />}

      {tab === "overview" && (
        <p className={cn(
          // typography
          "text-xs text-muted-foreground italic",
          // border
          "border-l-2 pl-3",
          // spacing
          "leading-relaxed",
        )}>
          &ldquo;{insight}&rdquo;
        </p>
      )}
    </div>
  )
}
