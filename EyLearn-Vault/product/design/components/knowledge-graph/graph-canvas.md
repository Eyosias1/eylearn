# GraphCanvas

Part of: [[knowledge-graph]]
Wireframe: [[knowledge-graph#Graph Canvas]]

## What it renders
Full-screen interactive node graph. Force-directed layout with pannable, zoomable canvas. Renders topic nodes as colored circles and relationship edges as lines.

## Props
```ts
nodes: {
  id: string
  label: string
  subject: string
  masteryPercent: number
  connectionCount: number
}[]
edges: {
  source: string
  target: string
  weight: number       // 0–1, drives line thickness
}[]
activeSubjectFilter: string | null
activeMasteryFilter: 'all' | 'weak' | 'needs-work'
showLabels: boolean
onNodeClick: (id: string) => void
onCanvasClick: () => void
```

## Internal state
- `transform: { x: number; y: number; scale: number }` — pan and zoom position
- `hoveredNodeId: string | null` — highlights connected edges on hover
- `simulationReady: boolean` — force layout settled flag

## Child components
- `GraphNode` — individual circle (color from mastery %, size from connectionCount)
- `GraphEdge` — line between two nodes (thickness from weight)

## Library
- D3-force or react-force-graph for force-directed simulation

## States
- Loading: spinner while force simulation settles
- Default: all nodes visible, labels on hover
- Filtered: dimmed nodes for excluded subjects or mastery levels
- Node hovered: connected edges highlighted, label shown
- Empty: no nodes → empty state with Add Content CTA
