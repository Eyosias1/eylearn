"use client"

import { useRef, useState, useTransition } from "react"
import { layoutBlocks } from "@/lib/studyplan/layout-blocks"
import { decodeDrag, snapMinutes, snapIndicatorTop, minutesToTime } from "@/lib/studyplan/drag-time-utility"
import { updateScheduledStudy } from "@/lib/actions/studyplan-actions"
import { updateCalendarEvent } from "@/lib/actions/calendar-actions"
import { CalendarEventBlock } from "@/components/studyplan/blocks/calendar-event-block"
import { DayTopicBlock, DAY_HOUR_PX } from "@/components/studyplan/blocks/day-topic-block"
import type { CalendarEvent, PlanEvent, PlanTopic } from "@/types/studyplan"

const HOURS = Array.from({ length: 16 }, (_, i) => i + 6)

interface Props {
  date: Date
  events: PlanEvent[]
  calendarEvents: CalendarEvent[]
  selectedTopic: PlanTopic | null
  onSelectTopic: (topic: PlanTopic) => void
  selectedCalEvent: CalendarEvent | null
  onSelectCalEvent: (e: CalendarEvent) => void
}

export function DayView({ date, events, calendarEvents, selectedTopic, onSelectTopic, selectedCalEvent, onSelectCalEvent }: Props) {
  const dateStr  = date.toISOString().split("T")[0]
  const topics   = events.find((e) => e.date === dateStr)?.topics ?? []
  const calEvs   = calendarEvents.filter((e) => e.scheduledDate === dateStr)
  const gridRef  = useRef<HTMLDivElement>(null)
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null)
  const [, startTransition] = useTransition()

  const allItems     = [
    ...calEvs.map(e => ({ startTime: e.startTime, durationMinutes: e.durationMinutes })),
    ...topics.map(t => ({ startTime: t.startTime, durationMinutes: t.durationMinutes })),
  ]
  const layout       = layoutBlocks(allItems)
  const calLayouts   = layout.slice(0, calEvs.length)
  const topicLayouts = layout.slice(calEvs.length)

  function relY(e: React.DragEvent) {
    return e.clientY - (gridRef.current?.getBoundingClientRect().top ?? 0)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIndicatorTop(null)
    const drag = decodeDrag(e)
    if (!drag) return
    const newTime = minutesToTime(snapMinutes(relY(e), DAY_HOUR_PX, drag.offsetMinutes))
    startTransition(async () => {
      if (drag.type === 'topic') {
        const t = topics.find(x => x.id === drag.id)
        if (!t) return
        await updateScheduledStudy(t.id, { title: t.name, subtopicId: t.subtopicId, startTime: newTime, durationMinutes: t.durationMinutes })
      } else {
        const ev = calEvs.find(x => x.id === drag.id)
        if (!ev) return
        await updateCalendarEvent(ev.id, { title: ev.title, startTime: newTime, durationMinutes: ev.durationMinutes })
      }
    })
  }

  return (
    <div className="rounded-xl border overflow-hidden h-full flex flex-col">
      <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-3">
        <p className="text-sm font-semibold">
          {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        {topics.length > 0 && <span className="text-xs text-muted-foreground">{topics.length} topic{topics.length !== 1 ? "s" : ""}</span>}
        {calEvs.length > 0 && <span className="text-xs text-violet-500">{calEvs.length} event{calEvs.length !== 1 ? "s" : ""}</span>}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          <div className="w-16 shrink-0 border-r">
            {HOURS.map((h) => (
              <div key={h} style={{ height: DAY_HOUR_PX }} className="flex items-start justify-end pr-3 pt-1 border-b last:border-b-0">
                <span className="text-[10px] text-muted-foreground tabular-nums">{String(h).padStart(2, "0")}:00</span>
              </div>
            ))}
          </div>
          <div
            ref={gridRef}
            className="flex-1 relative"
            onDragOver={(e) => { e.preventDefault(); setIndicatorTop(snapIndicatorTop(relY(e), DAY_HOUR_PX)) }}
            onDragLeave={() => setIndicatorTop(null)}
            onDrop={handleDrop}
          >
            {HOURS.map((h) => <div key={h} style={{ height: DAY_HOUR_PX }} className="border-b last:border-b-0" />)}
            <div className="absolute inset-0" style={{ height: HOURS.length * DAY_HOUR_PX }}>
              {calEvs.map((ev, i) => (
                <CalendarEventBlock key={ev.id} event={ev} hourPx={DAY_HOUR_PX} layout={calLayouts[i]} selected={selectedCalEvent?.id === ev.id} onClick={() => onSelectCalEvent(ev)} />
              ))}
              {topics.map((t, i) => (
                <DayTopicBlock key={t.id} topic={t} selected={selectedTopic?.id === t.id} onClick={() => onSelectTopic(t)} layout={topicLayouts[i]} />
              ))}
              {indicatorTop !== null && (
                <div className="absolute inset-x-0 h-0.5 bg-foreground/40 pointer-events-none z-20" style={{ top: indicatorTop }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
