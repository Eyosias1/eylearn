"use client"

import { cn } from "@/lib/utils"
import { useWeekDrop } from "@/hooks/useWeekDrop"
import { WeekDayColumn } from "@/components/studyplan/views/week-day-column"
import { WEEK_HOUR_PX } from "@/components/studyplan/blocks/week-topic-block"
import type { CalendarEvent, PlanEvent, PlanTopic } from "@/types/studyplan"

const HOURS = Array.from({ length: 16 }, (_, i) => i + 6)

function getWeekDays(date: Date): Date[] {
  const sunday = new Date(date)
  sunday.setDate(date.getDate() - date.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday)
    d.setDate(sunday.getDate() + i)
    return d
  })
}

interface Props {
  date: Date
  events: PlanEvent[]
  calendarEvents: CalendarEvent[]
  selectedTopic: PlanTopic | null
  onSelectTopic: (topic: PlanTopic) => void
  selectedCalEvent: CalendarEvent | null
  onSelectCalEvent: (e: CalendarEvent) => void
}

export function WeekView({ date, events, calendarEvents, selectedTopic, onSelectTopic, selectedCalEvent, onSelectCalEvent }: Props) {
  const days    = getWeekDays(date)
  const onDrop  = useWeekDrop(events, calendarEvents)
  const eventMap = new Map(events.map((e) => [e.date, e.topics]))
  const calMap   = new Map<string, CalendarEvent[]>()
  for (const ev of calendarEvents) {
    const arr = calMap.get(ev.scheduledDate) ?? []
    arr.push(ev)
    calMap.set(ev.scheduledDate, arr)
  }
  const todayStr = new Date().toISOString().split("T")[0]

  return (
    <div className="rounded-xl border overflow-hidden h-full flex flex-col">
      <div className="grid grid-cols-[48px_repeat(7,1fr)] border-b bg-muted/30 sticky top-0 z-10">
        <div className="border-r" />
        {days.map((d) => {
          const dateStr = d.toISOString().split("T")[0]
          const isToday = dateStr === todayStr
          return (
            <div key={dateStr} className={cn("flex flex-col items-center py-2 border-r last:border-r-0", isToday && "bg-foreground/5")}>
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <span className={cn(
                "flex items-center justify-center size-7 rounded-full text-sm font-semibold mt-0.5",
                isToday ? "bg-foreground text-background" : "text-foreground",
              )}>
                {d.getDate()}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[48px_repeat(7,1fr)]">
          <div className="border-r">
            {HOURS.map((h) => (
              <div key={h} style={{ height: WEEK_HOUR_PX }} className="flex items-start justify-end pr-2 pt-1 border-b last:border-b-0">
                <span className="text-[10px] text-muted-foreground tabular-nums">{String(h).padStart(2, "0")}:00</span>
              </div>
            ))}
          </div>
          {days.map((d) => {
            const dateStr = d.toISOString().split("T")[0]
            return (
              <WeekDayColumn
                key={dateStr}
                dateStr={dateStr}
                topics={eventMap.get(dateStr) ?? []}
                calEvs={calMap.get(dateStr) ?? []}
                selectedTopic={selectedTopic}
                onSelectTopic={onSelectTopic}
                selectedCalEvent={selectedCalEvent}
                onSelectCalEvent={onSelectCalEvent}
                onDrop={onDrop}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
