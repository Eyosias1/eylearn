"use client"

import { useEffect, useRef } from "react"
import { useSigma, useRegisterEvents } from "@react-sigma/core"
import type { GraphNode, GraphNodeAttributes } from "@/types/graph"

const DRAG_THRESHOLD = 4

interface Args {
  onNodeClick: (n: GraphNode | null) => void
  onNodeHover: (n: GraphNode | null, x: number, y: number) => void
  attrsToNode: (id: string, a: GraphNodeAttributes) => GraphNode
  onDrag?: () => void
  onRelease?: () => void
}

export function useGraphDrag({ onNodeClick, onNodeHover, attrsToNode, onDrag, onRelease }: Args) {
  const sigma          = useSigma()
  const registerEvents = useRegisterEvents()
  const dragged        = useRef<string | null>(null)
  const isDrag         = useRef(false)
  const press          = useRef<{ x: number, y: number } | null>(null)
  const target         = useRef<{ x: number, y: number } | null>(null)
  const dir            = useRef({ x: 1, y: 0 })
  const vel            = useRef({ x: 0, y: 0, t: 0, vx: 0, vy: 0 })
  const raf            = useRef<number | null>(null)
  const nodeClicked    = useRef(false)
  const clickRef       = useRef(onNodeClick)
  const hoverRef       = useRef(onNodeHover)
  const attrsRef       = useRef(attrsToNode)
  const dragRef        = useRef(onDrag)
  const releaseRef     = useRef(onRelease)

  useEffect(() => {
    clickRef.current = onNodeClick
    hoverRef.current = onNodeHover
    attrsRef.current = attrsToNode
    dragRef.current = onDrag
    releaseRef.current = onRelease
  }, [onNodeClick, onNodeHover, attrsToNode, onDrag, onRelease])

  useEffect(() => {
    const dragTick = () => {
      const node = dragged.current
      const pos = target.current
      if (!isDrag.current || !node || !pos) { raf.current = null; return }
      const g = sigma.getGraph()
      if (!g.hasNode(node)) { raf.current = null; return }
      g.setNodeAttribute(node, "x", pos.x)
      g.setNodeAttribute(node, "y", pos.y)
      raf.current = requestAnimationFrame(dragTick)
    }

    const release = () => {
      const node = dragged.current
      const pos = target.current
      if (raf.current) cancelAnimationFrame(raf.current)
      dragged.current = null
      if (!node) return
      if (!isDrag.current) {
        press.current = null
        target.current = null
        raf.current = null
        return
      }
      const keepFixed = true
      isDrag.current = false
      const g = sigma.getGraph()
      if (pos && g.hasNode(node)) {
        g.setNodeAttribute(node, "x", pos.x)
        g.setNodeAttribute(node, "y", pos.y)
      }
      press.current = null
      target.current = null
      if (keepFixed) {
        releaseRef.current?.()
        raf.current = null
        return
      }
      let { vx, vy } = vel.current
      const speed = Math.hypot(vx, vy)
      if (speed < 0.02) {
        vx = dir.current.x * 0.02
        vy = dir.current.y * 0.02
      }
      const tick = () => {
        if (Math.hypot(vx, vy) < 0.02) {
          if (!keepFixed) g.removeNodeAttribute(node, "fixed")
          releaseRef.current?.()
          raf.current = null; return
        }
        if (!g.hasNode(node)) return
        g.setNodeAttribute(node, "x", g.getNodeAttribute(node, "x") + vx)
        g.setNodeAttribute(node, "y", g.getNodeAttribute(node, "y") + vy)
        vx *= 0.88; vy *= 0.88
        raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    }

    registerEvents({
      downNode: ({ node, event }) => {
        if (raf.current) cancelAnimationFrame(raf.current)
        isDrag.current = false; dragged.current = node
        press.current = { x: event.x, y: event.y }
        target.current = null
        vel.current = { x: 0, y: 0, t: performance.now(), vx: 0, vy: 0 }
      },
      moveBody: ({ event }) => {
        if (!dragged.current) return
        if (!press.current) return
        if (!isDrag.current) {
          const dx = event.x - press.current.x
          const dy = event.y - press.current.y
          if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
          isDrag.current = true
          sigma.getGraph().setNodeAttribute(dragged.current, "fixed", true)
        }
        dragRef.current?.()
        const pos = sigma.viewportToGraph(event)
        target.current = pos
        if (!raf.current) raf.current = requestAnimationFrame(dragTick)
        const now = performance.now()
        const dt  = Math.max(8, now - vel.current.t)
        const vx  = (pos.x - vel.current.x) / dt * 8
        const vy  = (pos.y - vel.current.y) / dt * 8
        const speed = Math.hypot(vx, vy)
        if (speed > 0.001) dir.current = { x: vx / speed, y: vy / speed }
        vel.current = { x: pos.x, y: pos.y, t: now,
          vx,
          vy }
        event.preventSigmaDefault()
        event.original.preventDefault()
        event.original.stopPropagation()
      },
      upNode: ({ node }) => {
        if (dragged.current !== node) return
        if (!isDrag.current) {
          nodeClicked.current = true
          const attrs = sigma.getGraph().getNodeAttributes(node) as GraphNodeAttributes
          clickRef.current(attrsRef.current(node, attrs))
          dragged.current = null
          press.current = null
          target.current = null
          return
        }
        release()
      },
      upStage: release,
      clickStage: () => {
        if (nodeClicked.current) {
          nodeClicked.current = false
          return
        }
        clickRef.current(null)
      },
      enterNode: ({ node }) => {
        const a = sigma.getGraph().getNodeAttributes(node) as GraphNodeAttributes
        const p = sigma.graphToViewport({ x: a.x, y: a.y })
        hoverRef.current(attrsRef.current(node, a), p.x, p.y)
      },
      leaveNode: () => hoverRef.current(null, 0, 0),
    })

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [registerEvents, sigma])
}
