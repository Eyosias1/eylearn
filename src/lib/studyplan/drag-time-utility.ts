const DRAG_KEY   = 'block-drag'
const GRID_START = 6 * 60  // 06:00 in minutes

// Stores the grabbed offset so dragover can compute the indicator without reading dataTransfer
let _offset = 0
export const storeDragOffset = (v: number) => { _offset = v }
export const getDragOffset   = () => _offset

export function encodeDrag(id: string, type: 'topic' | 'calev', offsetMinutes: number) {
  return { key: DRAG_KEY, data: JSON.stringify({ id, type, offsetMinutes }) }
}

export function decodeDrag(e: React.DragEvent): { id: string; type: 'topic' | 'calev'; offsetMinutes: number } | null {
  try { return JSON.parse(e.dataTransfer.getData(DRAG_KEY)) } catch { return null }
}

export function snapMinutes(relY: number, hourPx: number, offsetMinutes: number): number {
  const total   = GRID_START + (relY / hourPx) * 60 - offsetMinutes
  const snapped = Math.round(total / 5) * 5
  return Math.max(GRID_START, Math.min(21 * 60 - 15, snapped))
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function snapIndicatorTop(relY: number, hourPx: number): number {
  return ((snapMinutes(relY, hourPx, _offset) - GRID_START) / 60) * hourPx
}
