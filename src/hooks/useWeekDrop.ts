"use client"

import { useTransition } from "react"
import { updateScheduledStudy } from "@/lib/actions/plan"
import { updateCalendarEvent } from "@/lib/actions/plan/calendar"
import type { CalendarEvent, PlanEvent } from "@/types/studyplan"

export function useWeekDrop(events: PlanEvent[], calendarEvents: CalendarEvent[]) {
  const [, startTransition] = useTransition()

  return function onDrop(targetDateStr: string, id: string, type: 'topic' | 'calev', newTime: string) {
    startTransition(async () => {
      if (type === 'topic') {
        const t = events.flatMap(e => e.topics).find(x => x.id === id)
        if (!t) return
        await updateScheduledStudy(t.id, {
          title: t.name, subtopicId: t.subtopicId,
          startTime: newTime, durationMinutes: t.durationMinutes,
          scheduledDate: targetDateStr,
        })
      } else {
        const ev = calendarEvents.find(x => x.id === id)
        if (!ev) return
        await updateCalendarEvent(ev.id, {
          title: ev.title, startTime: newTime,
          durationMinutes: ev.durationMinutes, scheduledDate: targetDateStr,
        })
      }
    })
  }
}
