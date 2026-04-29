"use client"

import { useEffect, useRef } from "react"
import {
  forceSimulation, forceManyBody, forceLink,
  forceCenter, forceCollide,
  type Simulation,
} from "d3"
import type { D3SimNode } from "@/types/graph"
import type { D3Link } from "@/lib/graph/build-graph"

const LINK_DIST: Record<string, number> = {
  "subject-topic": 60, "topic-subtopic": 40, "subtopic-note": 28,
}

function resolveId(v: string | D3SimNode): string {
  return typeof v === "string" ? v : v.id
}

function linkDist(link: D3Link): number {
  const sk = resolveId(link.source).split(":")[0]
  const tk = resolveId(link.target).split(":")[0]
  return LINK_DIST[`${sk}-${tk}`] ?? LINK_DIST[`${tk}-${sk}`] ?? 80
}

export function useGraphSimulation(
  nodes:  D3SimNode[],
  links:  D3Link[],
  width:  number,
  height: number,
  onTick: () => void,
): React.MutableRefObject<Simulation<D3SimNode, D3Link> | null> {
  const simRef  = useRef<Simulation<D3SimNode, D3Link> | null>(null)
  const tickRef = useRef(onTick)
  useEffect(() => { tickRef.current = onTick }, [onTick])

  useEffect(() => {
    if (width === 0 || height === 0) return
    simRef.current?.stop()

    const sim = forceSimulation<D3SimNode>(nodes)
      .force("link",    forceLink<D3SimNode, D3Link>(links).id(d => d.id).distance(linkDist))
      .force("charge",  forceManyBody<D3SimNode>().strength(-40).distanceMax(100))
      .force("center",  forceCenter<D3SimNode>(width / 2, height / 2))
      .force("collide", forceCollide<D3SimNode>(d => d.size + 15))

    sim.on("tick", () => tickRef.current())
    simRef.current = sim

    return () => { sim.stop() }
  }, [nodes, links, width, height])

  return simRef
}
