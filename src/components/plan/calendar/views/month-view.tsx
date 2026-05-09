"use client"

import { useState } from "react"
import { MonthDayCell } from "@/components/plan/calendar/blocks/month-day-cell"
import { DaySessionsDialog } from "@/components/plan/calendar/views/day-sessions-dialog"
import type { CalendarEvent, PlanEvent, PlanTopic } from "@/types/studyplan"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface Props {
  date: Date
  events: PlanEvent[]
  calendarEvents: CalendarEvent[]
  selectedTopic: PlanTopic | null
  onSelectTopic: (topic: PlanTopic) => void
  onCreateAt: (dateStr: string, startTime: string) => void
}

export function MonthView({ date, events, calendarEvents, selectedTopic, onSelectTopic, onCreateAt }: Props) {
  const [dialogDate, setDialogDate] = useState<string | null>(null)

  const year  = date.getFullYear()
  const month = date.getMonth()
  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const eventMap    = new Map(events.map((e) => [e.date, e.topics]))
  const calMap      = new Map<string, CalendarEvent[]>()
  for (const ev of calendarEvents) {
    const arr = calMap.get(ev.scheduledDate) ?? []
    arr.push(ev)
    calMap.set(ev.scheduledDate, arr)
  }

  const todayStr    = new Date().toISOString().split("T")[0]
  const dialogTopics = dialogDate ? (eventMap.get(dialogDate) ?? []) : []

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-7">
          {DAYS.map((d) => (
            <p key={d} className="text-[11px] font-medium text-muted-foreground text-center py-2">{d}</p>
          ))}
        </div>
        <div className="grid grid-cols-7 border-l border-t">
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} className="border-r border-b min-h-[120px]" />
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            return (
              <MonthDayCell
                key={dateStr}
                day={day}
                dateStr={dateStr}
                isToday={dateStr === todayStr}
                topics={eventMap.get(dateStr) ?? []}
                calendarEvents={calMap.get(dateStr) ?? []}
                selectedTopic={selectedTopic}
                onSelectTopic={onSelectTopic}
                onOpenDialog={() => setDialogDate(dateStr)}
                onCreateAt={onCreateAt}
              />
            )
          })}
        </div>
      </div>

      <DaySessionsDialog
        dateStr={dialogDate}
        topics={dialogTopics}
        onClose={() => setDialogDate(null)}
      />
    </>
  )
}
