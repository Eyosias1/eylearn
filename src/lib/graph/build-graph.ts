import { hierarchyPositions } from "@/lib/graph/layout-position"
import type { GraphData, D3SimNode } from "@/types/graph"

export interface D3Link {
  source: string | D3SimNode
  target: string | D3SimNode
}

export function buildD3Graph(data: GraphData): { nodes: D3SimNode[]; links: D3Link[] } {
  const positions = hierarchyPositions(data.nodes, data.edges)
  const nodeIds   = new Set(data.nodes.map(n => n.id))

  const nodes: D3SimNode[] = data.nodes.map(n => {
    const { x, y } = positions.get(n.id) ?? { x: 0, y: 0 }
    return { ...n, x, y }
  })

  const links: D3Link[] = data.edges
    .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
    .map(e => ({ source: e.source, target: e.target }))

  return { nodes, links }
}
