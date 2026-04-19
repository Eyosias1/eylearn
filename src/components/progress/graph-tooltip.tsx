import type { GraphNode } from "@/types/graph"

interface Props { node: GraphNode; x: number; y: number }

export function GraphTooltip({ node, x, y }: Props) {
  return (
    <div
      className="absolute z-20 pointer-events-none rounded-lg border border-border bg-popover px-3 py-2 shadow-lg"
      style={{ left: x + 14, top: y - 44 }}
    >
      <p className="text-sm font-semibold text-popover-foreground">{node.label}</p>
      <p className="text-xs text-muted-foreground">
        {node.retentionScore}% retention · {node.lastReviewedAt}
      </p>
    </div>
  )
}
