import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { AnalyticsData } from "@/types/progress"

type Technique = AnalyticsData["techniqueEfficiency"][number]

const TREND_ICON = {
  up:   <TrendingUp  className="size-4 text-emerald-500" />,
  down: <TrendingDown className="size-4 text-red-500" />,
  flat: <Minus        className="size-4 text-muted-foreground" />,
}

export function TechniqueEfficiencyOverview({ data }: { data: Technique[] }) {
  const maxGain = Math.max(...data.map(t => t.masteryGainPerHour))

  return (
    <div className="flex flex-col gap-4">
      {data.map((t) => (
        <div key={t.mode} className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {TREND_ICON[t.trend]}
              <span className="font-medium">{t.mode}</span>
            </div>
            <span className="font-semibold text-foreground tabular-nums">{t.masteryGainPerHour}%/hr</span>
          </div>
          <Progress value={(t.masteryGainPerHour / maxGain) * 100} className={cn("h-2")} />
        </div>
      ))}
    </div>
  )
}
