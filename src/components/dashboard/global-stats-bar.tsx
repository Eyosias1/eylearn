import { cn } from "@/lib/utils"
import type { DashboardStats } from "@/types/dashboard"


function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 text-center">
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
    </div>
  )
}

interface Props {
  stats: DashboardStats
}

export function GlobalStatsBar({ stats }: Props) {
  const streakValue = stats.streakBroken
    ? `Ended · Best: ${stats.bestStreakDays}d`
    : `${stats.currentStreakDays} Days`

  return (
    <div className={cn(
      // layout
      "flex items-center justify-around",
      // spacing
      "px-6 py-4",
      // colors
      "bg-card",
      // border
      "rounded-xl border",
    )}>
      <StatBlock label="Current Streak" value={streakValue} />
      <div className="h-8 w-px bg-border" />
      <StatBlock label="Items Memorized" value={stats.itemsMemorized.toLocaleString()} />
    </div>
  )
}
