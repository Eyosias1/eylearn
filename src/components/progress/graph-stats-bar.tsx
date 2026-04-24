import { getGraphNodes } from "@/lib/progress/graph-data"
import { getUserStats } from "@/lib/mock/mock-data"
import type { TopicHealth } from "@/types/study"

interface Props {
  filter: TopicHealth | null
  onFilter: (h: TopicHealth | null) => void
}

const STATS = [
  { health: "green"  as TopicHealth, label: "Mastered",    color: "#22c55e" },
  { health: "yellow" as TopicHealth, label: "Needs Review", color: "#eab308" },
  { health: "red"    as TopicHealth, label: "Overdue",      color: "#ef4444" },
]

export function GraphStatsBar({ filter, onFilter }: Props) {
  const nodes = getGraphNodes()
  const { streak } = getUserStats()
  const counts = { green: 0, yellow: 0, red: 0 }
  nodes.forEach((n) => counts[n.health]++)

  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-background border-b border-border shrink-0">
      {STATS.map(({ health, label, color }) => (
        <button
          key={health}
          onClick={() => onFilter(filter === health ? null : health)}
          className="flex items-center gap-2 text-sm transition-opacity cursor-pointer"
          style={{ opacity: filter && filter !== health ? 0.35 : 1 }}
        >
          <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-semibold" style={{ color }}>{counts[health]}</span>
          <span className="text-muted-foreground">{label}</span>
        </button>
      ))}
      <div className="ml-auto flex items-center gap-2 text-sm">
        <span className="text-orange-400 text-base">🔥</span>
        <span className="font-semibold text-foreground">{streak}</span>
        <span className="text-muted-foreground">Day Streak</span>
      </div>
    </div>
  )
}
