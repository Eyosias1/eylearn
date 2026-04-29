import type { GraphData, NodeHealth } from "@/types/graph"

interface Props {
  stats:    GraphData["stats"]
  filter:   NodeHealth | null
  onFilter: (h: NodeHealth | null) => void
}

const ITEMS = [
  { health: "green"  as NodeHealth, label: "Mastered",    color: "#22c55e" },
  { health: "yellow" as NodeHealth, label: "Needs Review", color: "#eab308" },
  { health: "red"    as NodeHealth, label: "Overdue",      color: "#ef4444" },
  { health: "gray"   as NodeHealth, label: "Not Started",  color: "#9ca3af" },
]

export function GraphStatsBar({ stats, filter, onFilter }: Props) {
  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-background border-b border-border shrink-0">
      {ITEMS.map(({ health, label, color }) => (
        <button
          key={health}
          onClick={() => onFilter(filter === health ? null : health)}
          className="flex items-center gap-2 text-sm transition-opacity cursor-pointer"
          style={{ opacity: filter && filter !== health ? 0.35 : 1 }}
        >
          <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-semibold" style={{ color }}>{stats[health]}</span>
          <span className="text-muted-foreground">{label}</span>
        </button>
      ))}
    </div>
  )
}
