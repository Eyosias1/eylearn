"use client"

import { useState } from "react"
import { GraphStatsBar } from "@/components/progress/graph-stats-bar"
import { KnowledgeGraph } from "@/components/progress/knowledge-graph"
import type { TopicHealth } from "@/types/study"

export default function GraphPage() {
  const [filter, setFilter] = useState<TopicHealth | null>(null)

  return (
    <div className="absolute inset-0 flex flex-col p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Knowledge Graph</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Explore how your topics connect and where your weak spots are.
        </p>
      </div>
      <GraphStatsBar filter={filter} onFilter={setFilter} />
      <KnowledgeGraph filter={filter} />
    </div>
  )
}
