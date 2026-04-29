export type LayoutItem = { startTime: string; durationMinutes: number }
export type BlockLayout = { col: number; colCount: number }

function toMins(t: string) {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

export function layoutBlocks(items: LayoutItem[]): BlockLayout[] {
  if (!items.length) return []

  const indexed = items.map((item, i) => ({ ...item, i }))
    .sort((a, b) => toMins(a.startTime) - toMins(b.startTime))

  const colEnds: number[] = []
  const cols: number[] = new Array(items.length)

  for (const { startTime, durationMinutes, i } of indexed) {
    const start = toMins(startTime)
    const end   = start + durationMinutes
    let col     = colEnds.findIndex(e => e <= start)
    if (col === -1) col = colEnds.push(end) - 1
    else colEnds[col] = end
    cols[i] = col
  }

  return items.map((item, i) => {
    const s = toMins(item.startTime)
    const e = s + item.durationMinutes
    let max = cols[i]
    for (let j = 0; j < items.length; j++) {
      if (j === i) continue
      const sj = toMins(items[j].startTime)
      const ej = sj + items[j].durationMinutes
      if (sj < e && ej > s) max = Math.max(max, cols[j])
    }
    return { col: cols[i], colCount: max + 1 }
  })
}
