"use client"

import { useEffect } from "react"
import { select, zoom, zoomIdentity, type ZoomTransform, type Simulation } from "d3"
import { getConnected, hitTest } from "@/lib/graph/graph-interaction"
import type { AdjacencyMap } from "@/lib/graph/graph-interaction"
import type { D3SimNode, GraphNode } from "@/types/graph"
import type { D3Link } from "@/lib/graph/build-graph"

const DRAG_THRESHOLD = 4

function toGraphNode(n: D3SimNode): GraphNode {
  return { id: n.id, label: n.label, health: n.health, nodeType: n.type, color: n.color, size: n.size, meta: n.meta }
}

interface Args {
  canvasRef:    React.RefObject<HTMLCanvasElement | null>
  simRef:       React.RefObject<Simulation<D3SimNode, D3Link> | null>
  nodes:        D3SimNode[]
  adjacency:    AdjacencyMap
  transformRef: React.MutableRefObject<ZoomTransform>
  hoveredRef:   React.MutableRefObject<string | null>
  neighborsRef: React.MutableRefObject<Set<string>>
  onNodeClick:  (n: GraphNode | null) => void
  onNodeHover:  (n: GraphNode | null, x: number, y: number) => void
  redraw:       () => void
}

export function useGraphInteraction({
  canvasRef, simRef, nodes, adjacency,
  transformRef, hoveredRef, neighborsRef,
  onNodeClick, onNodeHover, redraw,
}: Args) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const z = zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.05, 4])
      .on("zoom", ({ transform }) => { transformRef.current = transform; redraw() })
    const sel = select(canvas)
    sel.call(z)

    let dragging: D3SimNode | null = null
    let pressPos: { x: number; y: number } | null = null
    let emptyPress: { x: number; y: number } | null = null
    let wasDrag = false

    const toGraph = (cx: number, cy: number) => {
      const t = transformRef.current
      return { gx: (cx - t.x) / t.k, gy: (cy - t.y) / t.k }
    }

    const onDown = (e: PointerEvent) => {
      const { gx, gy } = toGraph(e.offsetX, e.offsetY)
      const id = hitTest(nodes, gx, gy)
      if (id) {
        e.stopPropagation()
        dragging = nodes.find(n => n.id === id) ?? null
        if (dragging) { dragging.fx = dragging.x; dragging.fy = dragging.y }
        pressPos = { x: e.offsetX, y: e.offsetY }
        wasDrag  = false
        simRef.current?.alphaTarget(0.3).restart()
        canvas.setPointerCapture(e.pointerId)
        sel.on(".zoom", null)
      } else {
        emptyPress = { x: e.offsetX, y: e.offsetY }
      }
    }

    const onMove = (e: PointerEvent) => {
      const { gx, gy } = toGraph(e.offsetX, e.offsetY)
      if (dragging) {
        if (!wasDrag && pressPos && Math.hypot(e.offsetX - pressPos.x, e.offsetY - pressPos.y) >= DRAG_THRESHOLD)
          wasDrag = true
        if (wasDrag) { dragging.fx = gx; dragging.fy = gy }
        return
      }
      const id   = hitTest(nodes, gx, gy)
      const prev = hoveredRef.current
      if (id !== prev) {
        hoveredRef.current = id
        if (id) {
          const node = nodes.find(n => n.id === id)!
          neighborsRef.current  = getConnected(adjacency, id, id.startsWith("subject:") ? Infinity : 1)
          canvas.style.cursor   = "pointer"
          onNodeHover(toGraphNode(node), e.offsetX, e.offsetY)
        } else {
          neighborsRef.current = new Set()
          canvas.style.cursor  = ""
          onNodeHover(null, 0, 0)
        }
        redraw()
      }
    }

    const onUp = (e: PointerEvent) => {
      if (dragging) {
        const node = dragging
        const wd   = wasDrag
        dragging.fx = null; dragging.fy = null
        simRef.current?.alphaTarget(0)
        dragging = null; wasDrag = false; pressPos = null
        sel.call(z)
        if (!wd) onNodeClick(toGraphNode(node))
        return
      }
      if (emptyPress && Math.hypot(e.offsetX - emptyPress.x, e.offsetY - emptyPress.y) < DRAG_THRESHOLD)
        onNodeClick(null)
      emptyPress = null
    }

    canvas.addEventListener("pointerdown", onDown)
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerup",   onUp)

    return () => {
      canvas.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerup",   onUp)
      sel.on(".zoom", null)
    }
  }, [nodes, adjacency, canvasRef, simRef, transformRef, hoveredRef, neighborsRef, onNodeClick, onNodeHover, redraw])
}
