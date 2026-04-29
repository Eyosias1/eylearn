import type { GraphDataEdge, GraphDataNode, GraphNodeType } from "@/types/graph"

const SUBJECT_RADIUS = 40
const TYPE_DISTANCE: Record<GraphNodeType, number> = {
  subject: 0,
  topic:    60,
  subtopic: 35,
  note:     25,
}

function hashId(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function fallbackPosition(id: string): { x: number; y: number } {
  const angle = (hashId(id) / 0xffffffff) * 2 * Math.PI
  const radius = Math.sqrt(hashId(`${id}:radius`) / 0xffffffff) * 90
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
}

function isHierarchyEdge(edge: GraphDataEdge): boolean {
  if (edge.source.startsWith("subject:") && edge.target.startsWith("topic:")) return true
  if (edge.source.startsWith("topic:") && edge.target.startsWith("subtopic:")) return true
  if (edge.source.startsWith("subtopic:") && edge.target.startsWith("note:")) return true
  return false
}

function hierarchyMaps(edges: GraphDataEdge[]) {
  const children = new Map<string, string[]>()
  const parent = new Map<string, string>()
  edges.filter(isHierarchyEdge).forEach(edge => {
    children.set(edge.source, [...(children.get(edge.source) ?? []), edge.target])
    if (!parent.has(edge.target)) parent.set(edge.target, edge.source)
  })
  return { children, parent }
}

function subjectPosition(id: string, subjects: GraphDataNode[]): { x: number; y: number } {
  if (subjects.length === 1) return { x: 0, y: 0 }
  const index = subjects.findIndex(node => node.id === id)
  const angle = (index / subjects.length) * 2 * Math.PI
  return { x: Math.cos(angle) * SUBJECT_RADIUS, y: Math.sin(angle) * SUBJECT_RADIUS }
}

function childPosition(
  node: GraphDataNode,
  parent: string,
  positions: Map<string, { x: number; y: number }>,
  children: Map<string, string[]>,
) {
  const base = positions.get(parent) ?? fallbackPosition(parent)
  const siblings = children.get(parent) ?? []
  const index = siblings.indexOf(node.id)
  const offset = (hashId(parent) / 0xffffffff) * 2 * Math.PI
  const angle = offset + ((index < 0 ? 0 : index) / Math.max(siblings.length, 1)) * 2 * Math.PI
  const distance = TYPE_DISTANCE[node.type] ?? 120
  return { x: base.x + Math.cos(angle) * distance, y: base.y + Math.sin(angle) * distance }
}

export function hierarchyPositions(nodes: GraphDataNode[], edges: GraphDataEdge[]) {
  const { children, parent } = hierarchyMaps(edges)
  const subjects = nodes.filter(node => node.type === "subject")
  const positions = new Map<string, { x: number; y: number }>()

  nodes.filter(node => node.type === "subject").forEach(node => {
    positions.set(node.id, subjectPosition(node.id, subjects))
  })

  ;(["topic", "subtopic", "note"] as const).forEach(type => {
    nodes.filter(node => node.type === type).forEach(node => {
      const p = parent.get(node.id)
      positions.set(node.id, p ? childPosition(node, p, positions, children) : fallbackPosition(node.id))
    })
  })

  return positions
}
