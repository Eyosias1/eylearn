"use client"

import { Boxes, BrainCircuit, ChartSpline } from "lucide-react"
import { useState } from "react"
import { GraphStatsBar } from "@/components/progress/graph-stats-bar"
import { KnowledgeGraph } from "@/components/progress/knowledge-graph"
import { ProgressEmptyView } from "@/components/progress/progress-empty-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TopicHealth } from "@/types/study"

export default function ProgressPage() {
  const [filter, setFilter] = useState<TopicHealth | null>(null)

  return (
    <div className="-m-6 flex h-[calc(100vh-72px)] flex-col p-6">
      <Tabs defaultValue="graph" className="flex flex-1 flex-col gap-4">
        <TabsList variant="line">
          <TabsTrigger value="mastery"><ChartSpline />Mastery</TabsTrigger>
          <TabsTrigger value="leitner"><Boxes />Leitner</TabsTrigger>
          <TabsTrigger value="graph"><BrainCircuit />Knowledge Graph</TabsTrigger>
        </TabsList>
        <TabsContent value="mastery" className="mt-0">
          <ProgressEmptyView title="Mastery dashboard" description="This view will show your topic mastery overview, trends, and weak spots." />
        </TabsContent>
        <TabsContent value="leitner" className="mt-0">
          <ProgressEmptyView title="Leitner boxes" description="This view will group your topics by review box so you can manage spaced repetition stages." />
        </TabsContent>
        <TabsContent value="graph" className="mt-0 flex flex-1 flex-col overflow-hidden">
          <GraphStatsBar filter={filter} onFilter={setFilter} />
          <KnowledgeGraph filter={filter} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
