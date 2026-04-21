import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { DashboardStats } from "@/types/dashboard"

interface Props {
  stats: DashboardStats
}

export function DailyTargets({ stats }: Props) {
  const allDone = stats.activeRecallDone >= stats.activeRecallTotal && stats.spacedRepDue === 0
  const progress = Math.round((stats.activeRecallDone / stats.activeRecallTotal) * 100)

  if (allDone) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-6">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            All caught up today ✓
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className={cn("flex flex-col gap-3 py-4 px-4")}>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Daily Targets
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <p className="text-sm">Active Recall Tasks</p>
            <p className="text-sm font-semibold tabular-nums">
              {stats.activeRecallDone}/{stats.activeRecallTotal}
            </p>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">Spaced Repetition Due</p>
          <p className={cn(
            "text-sm font-semibold tabular-nums",
            stats.spacedRepDue > 0 && "text-destructive",
          )}>
            {stats.spacedRepDue} items
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
