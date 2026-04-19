import { StatsCards } from "@/components/dashboard/stats-cards"
import { DueToday } from "@/components/dashboard/due-today"
import { TopicHealthBoard } from "@/components/dashboard/topic-health-board"
import { RetentionChart } from "@/components/dashboard/retention-chart"
import { StreakHeatmap } from "@/components/dashboard/streak-heatmap"
import { NextSession } from "@/components/dashboard/next-session"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Good morning, Eyosias 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">
          You have <span className="font-semibold text-foreground">4 topics</span> due for review today — start with the urgent ones.
        </p>
      </div>
      <StatsCards />
      <div className="flex gap-6">
        <StreakHeatmap />
        <NextSession />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DueToday />
        <TopicHealthBoard />
      </div>
      <RetentionChart />
    </div>
  )
}
