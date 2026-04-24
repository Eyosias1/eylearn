"use client"

import dynamic from "next/dynamic"
import { useState, useMemo } from "react"
import { getGraphNodes } from "@/lib/progress/graph-data"
import { GraphTooltip } from "@/components/progress/graph-tooltip"
import { TopicSidePanel } from "@/components/progress/topic-side-panel"
import type { GraphNode } from "@/types/graph"
import type { TopicHealth } from "@/types/study"

const SigmaGraph = dynamic(
  () => import("@/components/progress/sigma-graph"),
  { ssr: false }
)

interface Props { filter: TopicHealth | null }

export function KnowledgeGraph({ filter }: Props) {
  const [selected, setSelected] = useState<GraphNode | null>(null)
  const [hovered,  setHovered]  = useState<{ node: GraphNode; x: number; y: number } | null>(null)

  const nodeMap = useMemo(
    () => new Map(getGraphNodes().map((n) => [n.id, n])),
    []
  )

  const handleSelectById = (id: string) => {
    const n = nodeMap.get(id)
    if (n) setSelected(n)
  }

  return (
    <div className="relative flex-1 bg-background overflow-hidden">
      <SigmaGraph
        filter={filter}
        selectedId={selected?.id ?? null}
        onNodeClick={setSelected}
        onNodeHover={(node, x, y) => setHovered(node ? { node, x, y } : null)}
      />
      {hovered && <GraphTooltip node={hovered.node} x={hovered.x} y={hovered.y} />}
      <TopicSidePanel
        node={selected}
        onClose={() => setSelected(null)}
        onSelectNode={handleSelectById}
      />
    </div>
  )
}
