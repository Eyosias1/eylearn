"use client"

import { useState } from "react"
import { GraphStatsBar } from "@/components/graph/graph-stats-bar"
import { KnowledgeGraph } from "@/components/graph/knowledge-graph"
import type { GraphData, NodeHealth } from "@/types/graph"

interface Props { data: GraphData }

export function GraphPageClient({ data }: Props) {
  const [filter, setFilter] = useState<NodeHealth | null>(null)

  return (
    <div className="absolute inset-0 flex flex-col">
      <GraphStatsBar stats={data.stats} filter={filter} onFilter={setFilter} />
      <KnowledgeGraph data={data} filter={filter} />
    </div>
  )
}
