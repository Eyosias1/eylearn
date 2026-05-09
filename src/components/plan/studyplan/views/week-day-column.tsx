"use client"

import { useRef, useState } from "react"
import { layoutBlocks } from "@/lib/studyplan/layout-blocks"
import { decodeDrag, snapMinutes, snapIndicatorTop, minutesToTime } from "@/lib/studyplan/drag-time-utility"
import { CalendarEventBlock } from "@/components/studyplan/blocks/calendar-event-block"
import { WeekTopicBlock, WEEK_HOUR_PX } from "@/components/studyplan/blocks/week-topic-block"
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
}

export function WeekDayColumn({ dateStr, topics, calEvs, selectedTopic, onSelectTopic, selectedCalEvent, onSelectCalEvent, onDrop }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null)

  const allItems     = [
    ...calEvs.map(e => ({ startTime: e.startTime, durationMinutes: e.durationMinutes })),
    ...topics.map(t => ({ startTime: t.startTime, durationMinutes: t.durationMinutes })),
  ]
  const layout       = layoutBlocks(allItems)
  const calLayouts   = layout.slice(0, calEvs.length)
  const topicLayouts = layout.slice(calEvs.length)
  const totalH       = HOURS.length * WEEK_HOUR_PX

  function relY(e: React.DragEvent) {
    return e.clientY - (gridRef.current?.getBoundingClientRect().top ?? 0)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIndicatorTop(null)
    const drag = decodeDrag(e)
    if (!drag) return
    onDrop(dateStr, drag.id, drag.type, minutesToTime(snapMinutes(relY(e), WEEK_HOUR_PX, drag.offsetMinutes)))
  }

  return (
    <div
      ref={gridRef}
      className="border-r last:border-r-0 relative"
      onDragOver={(e) => { e.preventDefault(); setIndicatorTop(snapIndicatorTop(relY(e), WEEK_HOUR_PX)) }}
      onDragLeave={() => setIndicatorTop(null)}
      onDrop={handleDrop}
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
      </div>
    </div>
  )
}
