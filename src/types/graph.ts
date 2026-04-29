export type TopicHealth = "green" | "yellow" | "red"

export type NodeHealth   = "green" | "yellow" | "red" | "gray"
export type GraphNodeType = "subject" | "topic" | "subtopic" | "note"

export interface GraphDataNode {
  id:     string        // prefixed: "subject:uuid", "topic:uuid", etc.
  type:   GraphNodeType
  label:  string
  health: NodeHealth
  color:  string        // hex
  size:   number
  meta:   Record<string, unknown>
}

export interface GraphDataEdge {
  source: string
  target: string
}

export interface GraphData {
  nodes: GraphDataNode[]
  edges: GraphDataEdge[]
  stats: { green: number; yellow: number; red: number; gray: number }
}

export interface D3SimNode extends GraphDataNode {
  x:      number
  y:      number
  vx?:    number
  vy?:    number
  fx?:    number | null
  fy?:    number | null
  index?: number
}

export interface GraphNode {
  id:       string
  label:    string
  health:   NodeHealth
  nodeType: GraphNodeType
  color:    string
  size:     number
  meta:     Record<string, unknown>
}

export interface GraphEdge {
  source: string
  target: string
  weight: number
}
