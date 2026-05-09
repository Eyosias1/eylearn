"use client"

import { useState } from "react"
import { CalendarHeader } from "@/components/studyplan/views/calendar-header"
import { MonthView } from "@/components/studyplan/views/month-view"
import { WeekView } from "@/components/studyplan/views/week-view"
import { DayView } from "@/components/studyplan/views/day-view"
import { TopicDetailPanel } from "@/components/studyplan/panels/topic-detail-panel"
import { CalendarEventDetailPanel } from "@/components/studyplan/panels/calendar-event-detail-panel"
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
          {view === "month" && <MonthView date={date} events={events} calendarEvents={calendarEvents} selectedTopic={selectedTopic} onSelectTopic={handleSelectTopic} />}
          {view === "week"  && <WeekView  date={date} events={events} calendarEvents={calendarEvents} selectedTopic={selectedTopic} onSelectTopic={handleSelectTopic} selectedCalEvent={selectedCalEvent} onSelectCalEvent={handleSelectCalEvent} />}
          {view === "day"   && <DayView   date={date} events={events} calendarEvents={calendarEvents} selectedTopic={selectedTopic} onSelectTopic={handleSelectTopic} selectedCalEvent={selectedCalEvent} onSelectCalEvent={handleSelectCalEvent} />}
        </div>

        {selectedTopic    && <TopicDetailPanel         topic={selectedTopic}    onClose={() => setSelectedTopic(null)} />}
        {selectedCalEvent && <CalendarEventDetailPanel event={selectedCalEvent} onClose={() => setSelectedCalEvent(null)} />}
      </div>
    </div>
  )
}
