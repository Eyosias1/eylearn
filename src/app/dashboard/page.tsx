import {
  getDashboardStats,
  getNextSession,
  getTodaySchedule,
  getActiveSubjects,
  getConsistencyData,
} from "@/lib/dashboard/dashboard"
import { DailyTargets } from "@/components/dashboard/daily-targets"
import { ConsistencyChart } from "@/components/dashboard/consistency-chart"
import { NextSessionCard } from "@/components/dashboard/next-session-card"
import { TodaySequence } from "@/components/dashboard/today-sequence"
import { ActiveSubjectsGrid } from "@/components/dashboard/active-subjects-grid"
import { GlobalStatsBar } from "@/components/dashboard/global-stats-bar"

export default async function DashboardPage() {
  const [stats, nextSession, todaySchedule, subjects, consistencyData] = await Promise.all([
    getDashboardStats(),
    getNextSession(),
    getTodaySchedule(),
    getActiveSubjects(),
    getConsistencyData(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Study Control</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Consistency is the bridge between goals and accomplishment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DailyTargets stats={stats} />
            <ConsistencyChart data={consistencyData} />
          </div>
          <TodaySequence sessions={todaySchedule} />
        </div>
        <NextSessionCard session={nextSession} />
      </div>

      <ActiveSubjectsGrid subjects={subjects} />
      <GlobalStatsBar stats={stats} />
    </div>
  )
}
