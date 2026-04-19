"use client"

import { SigmaContainer } from "@react-sigma/core"
import { NodeCircleProgram } from "sigma/rendering"
import "@react-sigma/core/lib/style.css"
import { GraphInner } from "@/components/progress/graph-inner"
import type { GraphNode } from "@/types/graph"
import type { TopicHealth } from "@/types/study"

interface Props {
  filter: TopicHealth | null
  selectedId: string | null
  onNodeClick: (node: GraphNode | null) => void
  onNodeHover: (node: GraphNode | null, x: number, y: number) => void
}

export default function SigmaGraph({ filter, selectedId, onNodeClick, onNodeHover }: Props) {
  return (
    <SigmaContainer
      style={{ background: "transparent", width: "100%", height: "100%" }}
      settings={{
        renderEdgeLabels: false,
        allowInvalidContainer: true,
        nodeProgramClasses: { circle: NodeCircleProgram },
        defaultNodeType: "circle",
        zoomingRatio: 1.25,
        labelRenderedSizeThreshold: 10,
      }}
    >
      <GraphInner
        filter={filter}
        selectedId={selectedId}
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
      />
    </SigmaContainer>
  )
}
