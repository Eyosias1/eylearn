import type { TopicHealth } from "./study"

export interface GraphNode {
  id: string
  label: string
  subjectId: string
  subjectName: string
  health: TopicHealth
  retentionScore: number
  lastReviewedAt: string
  dueDate: string
}

export interface GraphNodeAttributes extends Omit<GraphNode, "id"> {
  x: number
  y: number
  size: number
  color: string
  fixed?: boolean
  highlighted?: boolean
  zIndex?: number
}


export interface GraphEdge {
  source: string
  target: string
  weight: number
}

export interface SubjectCluster {
  id: string
  name: string
  cx: number
  cy: number
}
