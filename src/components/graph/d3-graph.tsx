"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { zoomIdentity, type ZoomTransform } from "d3"
import { buildD3Graph } from "@/lib/graph/build-graph"
import { buildAdjacency } from "@/lib/graph/graph-interaction"
import { drawGraph } from "@/lib/graph/draw-graph"
import { useGraphSimulation } from "@/hooks/useGraphSimulation"
import { useGraphInteraction } from "@/hooks/useGraphInteraction"
import type { GraphData, GraphNode, NodeHealth } from "@/types/graph"

interface Props {
  data:        GraphData
  filter:      NodeHealth | null
  selectedId:  string | null
  onNodeClick: (node: GraphNode | null) => void
  onNodeHover: (node: GraphNode | null, x: number, y: number) => void
}

export function D3Graph({ data, filter, selectedId, onNodeClick, onNodeHover }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  const transformRef  = useRef<ZoomTransform>(zoomIdentity)
  const hoveredRef    = useRef<string | null>(null)
  const neighborsRef  = useRef<Set<string>>(new Set())
  const filterRef     = useRef(filter)
  const selectedRef   = useRef(selectedId)
  const progressRef   = useRef(0)
  const rafRef        = useRef<number | null>(null)

  useEffect(() => { filterRef.current  = filter },      [filter])
  useEffect(() => { selectedRef.current = selectedId }, [selectedId])

  const { nodes, links } = useMemo(() => buildD3Graph(data), [data])
  const adjacency        = useMemo(() => buildAdjacency(data.edges), [data])

  const draw = useCallback(() => {
    drawGraph(
      canvasRef.current, nodes, links,
      transformRef.current, hoveredRef.current, selectedRef.current,
      filterRef.current, neighborsRef.current,
      document.documentElement.classList.contains("dark"),
      progressRef.current,
    )
  }, [nodes, links])

  const animateTo = useCallback((target: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const step = () => {
      const delta = target - progressRef.current
      if (Math.abs(delta) < 0.01) {
        progressRef.current = target
        draw()
        rafRef.current = null
        return
      }
      progressRef.current += delta * 0.15
      draw()
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [draw])

  const handleNodeHover = useCallback((node: GraphNode | null, x: number, y: number) => {
    animateTo(node ? 0.8 : 0)
    onNodeHover(node, x, y)
  }, [animateTo, onNodeHover])

  useEffect(() => { draw() }, [filter, selectedId, draw])
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const simRef = useGraphSimulation(nodes, links, dims.w, dims.h, draw)
  useGraphInteraction({
    canvasRef, simRef, nodes, adjacency,
    transformRef, hoveredRef, neighborsRef,
    onNodeClick, onNodeHover: handleNodeHover, redraw: draw,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const dpr = window.devicePixelRatio || 1
      const c   = canvasRef.current
      if (c) { c.width = width * dpr; c.height = height * dpr }
      setDims({ w: width, h: height })
    })
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  )
}
