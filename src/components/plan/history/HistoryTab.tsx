"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryCalendar } from "@/components/studyplan/history/HistoryCalendar"
import { RetrospectiveFull } from "@/components/session-history/table/retrospective-full"
import { cn } from "@/lib/utils"
import type { RetroTopic } from "@/types/progress"

interface Props { topics: RetroTopic[] }

export function HistoryTab({ topics }: Props) {
  return (
    <div className={cn("flex flex-col", "gap-4")}>
      <div>
        <h2 className="text-xl font-semibold">Session History</h2>
        <p className="text-sm text-muted-foreground">Your full study history across all subjects.</p>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList className="w-fit">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          <HistoryCalendar topics={topics} />
        </TabsContent>

        <TabsContent value="table" className="mt-4">
          <RetrospectiveFull topics={topics} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
