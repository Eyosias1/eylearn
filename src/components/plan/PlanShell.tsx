"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlanCalendar } from "@/components/plan/calendar/views/plan-calendar"
import { HistoryTab } from "@/components/plan/history/HistoryTab"
import { cn } from "@/lib/utils"
import type { CalendarEvent, PlanEvent } from "@/types/studyplan"
import type { RetroTopic } from "@/types/progress"

interface Props {
  events:         PlanEvent[]
  calendarEvents: CalendarEvent[]
  topics:         RetroTopic[]
}

export function PlanShell({ events, calendarEvents, topics }: Props) {
  return (
    <Tabs defaultValue="plan" className={cn("h-full flex flex-col")}>
      <TabsList className="w-fit">
        <TabsTrigger value="plan">Study Plan</TabsTrigger>
        <TabsTrigger value="history">Session History</TabsTrigger>
      </TabsList>

      <TabsContent value="plan" className={cn("flex-1 min-h-0", "mt-4")}>
        <PlanCalendar events={events} calendarEvents={calendarEvents} />
      </TabsContent>

      <TabsContent value="history" className="mt-4">
        <HistoryTab topics={topics} />
      </TabsContent>
    </Tabs>
  )
}
