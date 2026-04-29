"use client"

import { useState } from "react"
import { D3Graph } from "@/components/graph/d3-graph"
import { GraphTooltip } from "@/components/graph/graph-tooltip"
import { TopicSidePanel } from "@/components/graph/topic-side-panel"
import type { GraphData, GraphNode, NodeHealth } from "@/types/graph"

interface Props {
  data:   GraphData
  filter: NodeHealth | null
}

export function KnowledgeGraph({ data, filter }: Props) {
  const [selected, setSelected] = useState<GraphNode | null>(null)
  const [hovered,  setHovered]  = useState<{ node: GraphNode; x: number; y: number } | null>(null)

  const handleSelectById = (id: string) => {
    const n = data.nodes.find(n => n.id === id)
    if (n) setSelected({ id: n.id, label: n.label, health: n.health, nodeType: n.type, color: n.color, size: n.size, meta: n.meta })
  }

  return (
    <div className="relative flex-1 bg-background overflow-hidden">
      <D3Graph
        data={data}
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
        graphNodes={data.nodes}
        graphEdges={data.edges}
      />
    </div>
  )
}
