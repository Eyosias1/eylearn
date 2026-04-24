import { Boxes, ChartSpline, CalendarDays, ListTodo, BarChart3 } from "lucide-react"
import { getDueCards, getLeitnerCards, getRetroTopics, getProspectiveDays, getSessionHistory, getAnalytics } from "@/lib/progress/progress"
import { DueTodayHeaderClient, DueTodayTableClient } from "@/components/progress/progress-interactive"
import { LeitnerBoard } from "@/components/progress/leitner-board"
import { RetrospectiveGrid } from "@/components/progress/retrospective-grid"
import { ProspectiveCalendar } from "@/components/progress/prospective-calendar"
import { AnalyticsPanel } from "@/components/progress/analytics-panel"
import { SessionHistory } from "@/components/progress/session-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ProgressPage() {
  const [dueCards, leitnerCards, retroTopics, prospectiveDays, sessions, analytics] = await Promise.all([
    getDueCards(),
    getLeitnerCards(),
    getRetroTopics(),
    getProspectiveDays(),
    getSessionHistory(),
    getAnalytics(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your retention, review schedule, and study history.
        </p>
      </div>

      <DueTodayHeaderClient cards={dueCards} />

      <Tabs defaultValue="leitner" className="flex flex-col gap-6">
        <TabsList variant="line">
          <TabsTrigger value="leitner"><Boxes />Leitner</TabsTrigger>
          <TabsTrigger value="retrospective"><ChartSpline />Retrospective</TabsTrigger>
          <TabsTrigger value="prospective"><CalendarDays />Prospective</TabsTrigger>
          <TabsTrigger value="due"><ListTodo />Due Today</TabsTrigger>
          <TabsTrigger value="analytics"><BarChart3 />Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="leitner" className="mt-0">
          <LeitnerBoard cards={leitnerCards} />
        </TabsContent>

        <TabsContent value="retrospective" className="mt-0">
          <RetrospectiveGrid topics={retroTopics} />
        </TabsContent>

        <TabsContent value="prospective" className="mt-0">
          <ProspectiveCalendar prospectiveDays={prospectiveDays} />
        </TabsContent>

        <TabsContent value="due" className="mt-0">
          <DueTodayTableClient cards={dueCards} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <AnalyticsPanel data={analytics} />
        </TabsContent>
      </Tabs>

      <SessionHistory sessions={sessions} />
    </div>
  )
}
