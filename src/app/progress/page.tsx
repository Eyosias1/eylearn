"use client"

import { useState } from "react"
import { GraphStatsBar } from "@/components/progress/graph-stats-bar"
import { KnowledgeGraph } from "@/components/progress/knowledge-graph"
import type { TopicHealth } from "@/types/study"

export default function ProgressPage() {
  const [filter, setFilter] = useState<TopicHealth | null>(null)

  return (
    <div className="flex flex-col -m-6 h-[calc(100vh-57px)]">
      <GraphStatsBar filter={filter} onFilter={setFilter} />
      <KnowledgeGraph filter={filter} />
    </div>
  )
}
