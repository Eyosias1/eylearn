export type AdjacencyMap = Map<string, Set<string>>

export function buildAdjacency(
  links: Array<{ source: string | { id: string }; target: string | { id: string } }>
): AdjacencyMap {
  const adj: AdjacencyMap = new Map()
  links.forEach(link => {
    const s = typeof link.source === "string" ? link.source : link.source.id
    const t = typeof link.target === "string" ? link.target : link.target.id
    if (!adj.has(s)) adj.set(s, new Set())
    if (!adj.has(t)) adj.set(t, new Set())
    adj.get(s)!.add(t)
    adj.get(t)!.add(s)
  })
  return adj
}

export function getConnected(adj: AdjacencyMap, start: string, depth: number): Set<string> {
  const visited = new Set<string>([start])
  const queue: Array<{ node: string; d: number }> = [{ node: start, d: 0 }]
  while (queue.length) {
    const { node, d } = queue.shift()!
    if (d >= depth) continue
    for (const nb of adj.get(node) ?? []) {
      if (!visited.has(nb)) {
        visited.add(nb)
        queue.push({ node: nb, d: d + 1 })
      }
    }
  }
  visited.delete(start)
  return visited
}

export function hitTest(
  nodes: Array<{ id: string; x: number; y: number; size: number }>,
  gx: number,
  gy: number,
): string | null {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i]
    if (Math.hypot(n.x - gx, n.y - gy) <= n.size + 4) return n.id
  }
  return null
}

export function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16)
  const bh = parseInt(b.slice(1), 16)
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff
  const r  = Math.round(ar + (br - ar) * t)
  const g  = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, "0")}`
}
