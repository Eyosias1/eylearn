"use client"

import { useRef, useState } from "react"
import { layoutBlocks } from "@/lib/plan/layout-blocks"
import { decodeDrag, snapMinutes, snapIndicatorTop, minutesToTime } from "@/lib/plan/drag-time-utility"
import { CalendarEventBlock } from "@/components/plan/calendar/blocks/calendar-event-block"
import { WeekTopicBlock, WEEK_HOUR_PX } from "@/components/plan/calendar/blocks/week-topic-block"
import type { CalendarEvent, PlanTopic } from "@/types/studyplan"

const HOURS = Array.from({ length: 16 }, (_, i) => i + 6)

interface Props {
  dateStr: string
  topics: PlanTopic[]
  calEvs: CalendarEvent[]
  selectedTopic: PlanTopic | null
  onSelectTopic: (t: PlanTopic) => void
  selectedCalEvent: CalendarEvent | null
  onSelectCalEvent: (e: CalendarEvent) => void
  onDrop: (targetDateStr: string, id: string, type: 'topic' | 'calev', newTime: string) => void
  onCreateAt: (dateStr: string, startTime: string) => void
}

export function WeekDayColumn({ dateStr, topics, calEvs, selectedTopic, onSelectTopic, selectedCalEvent, onSelectCalEvent, onDrop, onCreateAt }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null)
  const [hoverTop,     setHoverTop]     = useState<number | null>(null)
  const [hoverTime,    setHoverTime]    = useState<string | null>(null)

  const allItems     = [
    ...calEvs.map(e => ({ startTime: e.startTime, durationMinutes: e.durationMinutes })),
    ...topics.map(t => ({ startTime: t.startTime, durationMinutes: t.durationMinutes })),
  ]
  const layout       = layoutBlocks(allItems)
  const calLayouts   = layout.slice(0, calEvs.length)
  const topicLayouts = layout.slice(calEvs.length)
  const totalH       = HOURS.length * WEEK_HOUR_PX

  function relY(e: React.DragEvent | React.MouseEvent) {
    return e.clientY - (gridRef.current?.getBoundingClientRect().top ?? 0)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIndicatorTop(null)
    const drag = decodeDrag(e)
    if (!drag) return
    onDrop(dateStr, drag.id, drag.type, minutesToTime(snapMinutes(relY(e), WEEK_HOUR_PX, drag.offsetMinutes)))
  }

  function handleMouseMove(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("[data-block]")) {
      setHoverTop(null)
      setHoverTime(null)
      return
    }
    const y = relY(e)
    setHoverTop(snapIndicatorTop(y, WEEK_HOUR_PX))
    setHoverTime(minutesToTime(snapMinutes(y, WEEK_HOUR_PX, 0)))
  }

  function handleClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("[data-block]")) return
    if (!hoverTime) return
    onCreateAt(dateStr, hoverTime)
  }

  return (
    <div
      ref={gridRef}
      className="border-r last:border-r-0 relative cursor-crosshair"
      onDragOver={(e) => { e.preventDefault(); setHoverTop(null); setIndicatorTop(snapIndicatorTop(relY(e), WEEK_HOUR_PX)) }}
      onDragLeave={() => setIndicatorTop(null)}
      onDrop={handleDrop}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setHoverTop(null); setHoverTime(null) }}
      onClick={handleClick}
    >
      {HOURS.map(h => <div key={h} style={{ height: WEEK_HOUR_PX }} className="border-b last:border-b-0" />)}
      <div className="absolute inset-0" style={{ height: totalH }}>
        {calEvs.map((ev, i) => (
          <CalendarEventBlock key={ev.id} event={ev} hourPx={WEEK_HOUR_PX} layout={calLayouts[i]} selected={selectedCalEvent?.id === ev.id} onClick={() => onSelectCalEvent(ev)} />
        ))}
        {topics.map((t, i) => (
          <WeekTopicBlock key={t.id} topic={t} selected={selectedTopic?.id === t.id} onClick={() => onSelectTopic(t)} layout={topicLayouts[i]} />
        ))}
        {indicatorTop !== null && (
          <div className="absolute inset-x-0 h-0.5 bg-foreground/40 pointer-events-none z-20" style={{ top: indicatorTop }} />
        )}
        {hoverTop !== null && indicatorTop === null && (
          <div className="absolute inset-x-0 h-px border-t border-dashed border-primary/50 pointer-events-none z-10" style={{ top: hoverTop }} />
        )}
      </div>
    </div>
  )
}
