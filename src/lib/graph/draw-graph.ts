import { lerpColor } from "@/lib/graph/graph-interaction"
import type { D3SimNode, NodeHealth } from "@/types/graph"
import type { D3Link } from "@/lib/graph/build-graph"

interface Transform { x: number; y: number; k: number }

const EDGE_COLOR  = "#94a3b8"
const ACTIVE_EDGE = "#94a3b8"
const DIM_LIGHT   = "#e5e7eb"
const DIM_DARK    = "#374151"

export function drawGraph(
  canvas:    HTMLCanvasElement | null,
  nodes:     D3SimNode[],
  links:     D3Link[],
  transform: Transform,
  hovered:   string | null,
  selected:  string | null,
  filter:    NodeHealth | null,
  neighbors: Set<string>,
  isDark:    boolean,
  progress:  number,
) {
  if (!canvas) return
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const dpr  = window.devicePixelRatio || 1
  const cssW = canvas.width  / dpr
  const cssH = canvas.height / dpr
  const dim  = isDark ? DIM_DARK : DIM_LIGHT
  const inv  = 1 / transform.k

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, cssW, cssH)
  ctx.save()
  ctx.translate(transform.x, transform.y)
  ctx.scale(transform.k, transform.k)

  // edges
  links.forEach(link => {
    const s = link.source as D3SimNode
    const t = link.target as D3SimNode
    if (s.x == null || t.x == null) return
    if (filter && s.health !== filter && t.health !== filter) return
    const inCluster = hovered
      ? (s.id === hovered || neighbors.has(s.id)) && (t.id === hovered || neighbors.has(t.id))
      : false
    ctx.beginPath()
    ctx.moveTo(s.x, s.y)
    ctx.lineTo(t.x, t.y)
    ctx.strokeStyle = hovered
      ? (inCluster ? lerpColor(EDGE_COLOR, ACTIVE_EDGE, progress) : lerpColor(EDGE_COLOR, dim, progress))
      : EDGE_COLOR
    ctx.lineWidth = (inCluster ? 1 + 0.5 * progress : 0.5) * inv
    ctx.stroke()
  })

  // nodes (two passes: background then foreground)
  for (let pass = 0; pass < 2; pass++) {
    nodes.forEach(node => {
      if (node.x == null) return
      const isFg = node.id === selected || node.id === hovered
      if (pass === 0 && isFg) return
      if (pass === 1 && !isFg) return

      let color = node.color
      let size  = node.size

      if (hovered) {
        if (node.id === hovered)          { size *= 1 + 0.2 * progress }
        else if (!neighbors.has(node.id)) { color = lerpColor(node.color, dim, 0.8 * progress); size *= 1 - 0.2 * progress }
      } else if (filter && node.health !== filter && node.health !== "gray") {
        color = dim; size *= 0.7
      } else if (node.id === selected) {
        size *= 1.5
      }

      ctx.beginPath()
      ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      if (isFg) {
        ctx.strokeStyle = isDark ? "#f9fafb" : "#1e293b"
        ctx.lineWidth   = 1.5 * inv
        ctx.stroke()
      }
    })
  }

  // labels (scale-invariant size)
  ctx.font         = `600 ${11 * inv}px system-ui, sans-serif`
  ctx.textBaseline = "middle"
  nodes.forEach(node => {
    if (node.x == null) return
    if (node.size * transform.k < 18 && node.id !== hovered && node.id !== selected) return
    if (hovered && node.id !== hovered && !neighbors.has(node.id)) return
    ctx.fillStyle = isDark ? "#f9fafb" : "#111827"
    ctx.fillText(node.label, node.x + node.size + 4 * inv, node.y)
  })

  ctx.restore()
}
