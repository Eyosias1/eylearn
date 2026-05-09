"use client"

import { useState } from "react"
import { CalendarHeader } from "@/components/plan/calendar/views/calendar-header"
import { MonthView } from "@/components/plan/calendar/views/month-view"
import { WeekView } from "@/components/plan/calendar/views/week-view"
import { DayView } from "@/components/plan/calendar/views/day-view"
import { TopicDetailPanel } from "@/components/plan/calendar/panels/topic-detail-panel"
import { CalendarEventDetailPanel } from "@/components/plan/calendar/panels/calendar-event-detail-panel"
import { CreateEventDialog } from "@/components/plan/calendar/blocks/create-event-dialog"
import type { CalendarEvent, CalendarView, PlanEvent, PlanTopic } from "@/types/studyplan"

interface Props {
  events: PlanEvent[]
  calendarEvents: CalendarEvent[]
}

export function PlanCalendar({ events, calendarEvents }: Props) {
  const [view,             setView]             = useState<CalendarView>("week")
  const [date,             setDate]             = useState(new Date("2026-04-27"))
  const [selectedTopic,    setSelectedTopic]    = useState<PlanTopic | null>(null)
  const [selectedCalEvent, setSelectedCalEvent] = useState<CalendarEvent | null>(null)
  const [createTarget,     setCreateTarget]     = useState<{ dateStr: string; startTime: string } | null>(null)

  function navigate(dir: 1 | -1) {
    const d = new Date(date)
    if (view === "month") d.setMonth(d.getMonth() + dir)
    if (view === "week")  d.setDate(d.getDate() + dir * 7)
    if (view === "day")   d.setDate(d.getDate() + dir)
    setDate(d)
  }

  function handleSelectTopic(topic: PlanTopic) {
    setSelectedCalEvent(null)
    setSelectedTopic((prev) => prev?.id === topic.id ? null : topic)
  }

  function handleSelectCalEvent(ev: CalendarEvent) {
    setSelectedTopic(null)
    setSelectedCalEvent((prev) => prev?.id === ev.id ? null : ev)
  }

  function handleCreateAt(dateStr: string, startTime: string) {
    setSelectedTopic(null)
    setSelectedCalEvent(null)
    setCreateTarget({ dateStr, startTime })
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <CalendarHeader
        date={date}
        view={view}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        onToday={() => setDate(new Date())}
        onViewChange={(v) => { setView(v); setSelectedTopic(null); setSelectedCalEvent(null) }}
      />

      <div className="flex flex-1 items-start gap-4 min-h-0">
        <div className="flex-1 min-w-0 h-full">
          {view === "month" && <MonthView date={date} events={events} calendarEvents={calendarEvents} selectedTopic={selectedTopic} onSelectTopic={handleSelectTopic} onCreateAt={handleCreateAt} />}
          {view === "week"  && <WeekView  date={date} events={events} calendarEvents={calendarEvents} selectedTopic={selectedTopic} onSelectTopic={handleSelectTopic} selectedCalEvent={selectedCalEvent} onSelectCalEvent={handleSelectCalEvent} onCreateAt={handleCreateAt} />}
          {view === "day"   && <DayView   date={date} events={events} calendarEvents={calendarEvents} selectedTopic={selectedTopic} onSelectTopic={handleSelectTopic} selectedCalEvent={selectedCalEvent} onSelectCalEvent={handleSelectCalEvent} onCreateAt={handleCreateAt} />}
        </div>

        {selectedTopic    && <TopicDetailPanel         topic={selectedTopic}    onClose={() => setSelectedTopic(null)} />}
        {selectedCalEvent && <CalendarEventDetailPanel event={selectedCalEvent} onClose={() => setSelectedCalEvent(null)} />}
      </div>

      {createTarget && (
        <CreateEventDialog
          dateStr={createTarget.dateStr}
          startTime={createTarget.startTime}
          onClose={() => setCreateTarget(null)}
        />
      )}
    </div>
  )
}
