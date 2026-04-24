"use client"

import { useEffect, useRef } from "react"
import { useSigma, useLoadGraph, useSetSettings } from "@react-sigma/core"
import ForceSupervisor from "graphology-layout-force/worker"
import { buildGraph } from "@/lib/progress/build-graph"
import { useGraphDrag } from "@/hooks/useGraphDrag"
import type { GraphNode, GraphNodeAttributes } from "@/types/graph"
import type { TopicHealth } from "@/types/study"

interface Props {
  filter: TopicHealth | null
  selectedId: string | null
  onNodeClick: (node: GraphNode | null) => void
  onNodeHover: (node: GraphNode | null, x: number, y: number) => void
}

function attrsToNode(id: string, a: GraphNodeAttributes): GraphNode {
  return { id, label: a.label, subjectId: a.subjectId, subjectName: a.subjectName,
    health: a.health, retentionScore: a.retentionScore, lastReviewedAt: a.lastReviewedAt, dueDate: a.dueDate }
}

export function GraphInner({ filter, selectedId, onNodeClick, onNodeHover }: Props) {
  const sigma       = useSigma()
  const loadGraph   = useLoadGraph()
  const setSettings = useSetSettings()
  const layoutRef   = useRef<ForceSupervisor | null>(null)
  const stopRef     = useRef<number | null>(null)

  const startLayout = () => {
    if (stopRef.current) window.clearTimeout(stopRef.current)
    layoutRef.current?.start()
    stopRef.current = window.setTimeout(() => layoutRef.current?.stop(), 2500)
  }

  const restartLayout = () => {
    layoutRef.current?.kill()
    const layout = new ForceSupervisor(sigma.getGraph(), {
      isNodeFixed: (_: string, attr: GraphNodeAttributes) => attr.fixed,
    })
    layoutRef.current = layout
    startLayout()
  }

  useGraphDrag({
    onNodeClick,
    onNodeHover,
    attrsToNode,
    onDrag: startLayout,
    onRelease: restartLayout,
  })

  useEffect(() => {
    if (layoutRef.current) return
    const graph = buildGraph()
    loadGraph(graph)
    const layout = new ForceSupervisor(sigma.getGraph(), {
      isNodeFixed: (_: string, attr: GraphNodeAttributes) => attr.fixed,
    })
    layoutRef.current = layout
    startLayout()

    return () => {
      if (stopRef.current) window.clearTimeout(stopRef.current)
      if (layoutRef.current === layout) layoutRef.current = null
      layout.kill()
    }
  }, [loadGraph, sigma])

  useEffect(() => {
    const isDark   = document.documentElement.classList.contains("dark")
    const dimColor = isDark ? "#4b5563" : "#d1d5db"
    setSettings({
      labelColor: { color: isDark ? "#f9fafb" : "#111827" },
      labelSize: 11, labelWeight: "600",
      nodeReducer: (node, data) => {
        const dimmed = !!(filter && data.health !== filter)
        const sel    = node === selectedId
        return { ...data, color: dimmed ? dimColor : data.color,
          size: sel ? data.size * 1.4 : dimmed ? data.size * 0.8 : data.size,
          highlighted: sel, zIndex: sel ? 1 : 0 }
      },
      edgeReducer: (edge, data) => {
        if (!filter) return data
        const g = sigma.getGraph()
        const [s, t] = g.extremities(edge)
        return { ...data, hidden: g.getNodeAttribute(s, "health") !== filter && g.getNodeAttribute(t, "health") !== filter }
      },
    })
  }, [filter, selectedId, setSettings, sigma])

  return null
}
