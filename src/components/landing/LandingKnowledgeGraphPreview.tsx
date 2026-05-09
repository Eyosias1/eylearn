"use client"

import { useState } from "react"
import { D3Graph } from "@/components/graph/d3-graph"
import type { GraphData, GraphNode } from "@/types/graph"
import { cn } from "@/lib/utils"

const subjectColor = "#8b5cf6"
const topicColor = "#0ea5e9"
const detailColor = "#10b981"

const graphData: GraphData = {
  nodes: [
    { id: "subject:bio", type: "subject", label: "Biology", health: "green", color: subjectColor, size: 22, meta: {} },
    { id: "subject:cs", type: "subject", label: "Computer Science", health: "green", color: subjectColor, size: 22, meta: {} },
    { id: "subject:math", type: "subject", label: "Math", health: "yellow", color: subjectColor, size: 22, meta: {} },
    { id: "subject:language", type: "subject", label: "Language", health: "red", color: subjectColor, size: 22, meta: {} },
    { id: "topic:cells", type: "topic", label: "Cells", health: "green", color: topicColor, size: 17, meta: {} },
    { id: "topic:enzymes", type: "topic", label: "Enzymes", health: "yellow", color: topicColor, size: 17, meta: {} },
    { id: "topic:algorithms", type: "topic", label: "Algorithms", health: "green", color: topicColor, size: 17, meta: {} },
    { id: "topic:calculus", type: "topic", label: "Calculus", health: "yellow", color: topicColor, size: 17, meta: {} },
    { id: "topic:grammar", type: "topic", label: "Grammar", health: "red", color: topicColor, size: 17, meta: {} },
    { id: "subtopic:atp", type: "subtopic", label: "ATP", health: "red", color: detailColor, size: 12, meta: {} },
    { id: "note:metabolism", type: "note", label: "Metabolism notes", health: "gray", color: detailColor, size: 12, meta: {} },
    { id: "note:lab", type: "note", label: "Lab review", health: "gray", color: detailColor, size: 12, meta: {} },
  ],
  edges: [
    { source: "subject:bio", target: "topic:cells" },
    { source: "subject:bio", target: "topic:enzymes" },
    { source: "subject:cs", target: "topic:algorithms" },
    { source: "subject:math", target: "topic:calculus" },
    { source: "subject:language", target: "topic:grammar" },
    { source: "topic:algorithms", target: "topic:calculus" },
    { source: "topic:enzymes", target: "subtopic:atp" },
    { source: "subtopic:atp", target: "note:metabolism" },
    { source: "topic:cells", target: "note:lab" },
  ],
  stats: { green: 2, yellow: 1, red: 1, gray: 2 },
}

export function LandingKnowledgeGraphPreview() {
  const [selected, setSelected] = useState<GraphNode | null>(null)

  return (
    <div className={cn("relative h-48 overflow-hidden rounded-lg border bg-background")}>
      <D3Graph data={graphData} filter={null} selectedId={selected?.id ?? null} onNodeClick={setSelected} onNodeHover={() => null} />
      <p className={cn("absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 text-xs")}>
        {selected?.label ?? "Click a node"}
      </p>
    </div>
  )
}
