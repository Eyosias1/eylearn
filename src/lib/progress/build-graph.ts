import Graph from "graphology"
import { getGraphNodes, graphEdges, subjectClusters } from "@/lib/progress/graph-data"
import type { TopicHealth } from "@/types/study"

const COLORS: Record<TopicHealth, string> = {
  green: "#16a34a", yellow: "#ca8a04", red: "#dc2626",
}

export function buildGraph() {
  const graph = new Graph({ type: "undirected" })
  const clusterMap = new Map(subjectClusters.map((c) => [c.id, c]))

  getGraphNodes().forEach((node) => {
    const c = clusterMap.get(node.subjectId)
    graph.addNode(node.id, {
      label: node.label,
      size: 12,
      color: COLORS[node.health],
      x: (c?.cx ?? 0.5) * 20 + (Math.random() - 0.5) * 4,
      y: (1 - (c?.cy ?? 0.5)) * 20 + (Math.random() - 0.5) * 4,
      health: node.health,
      subjectId: node.subjectId,
      subjectName: node.subjectName,
      retentionScore: node.retentionScore,
      lastReviewedAt: node.lastReviewedAt,
      dueDate: node.dueDate,
    })
  })

  graphEdges.forEach((edge) => {
    if (!graph.hasEdge(edge.source, edge.target))
      graph.addEdge(edge.source, edge.target, { size: edge.weight })
  })

  return graph
}
