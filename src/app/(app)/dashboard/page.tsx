import {
  getDashboardStats,
  getNextSession,
  getConsistencyData,
} from "@/lib/mock/dashboard"
import { getLeitnerCards, getAnalytics } from "@/lib/mock/progress"
import { GlobalStatsBar } from "@/components/dashboard/global-stats-bar"
import { NextSessionCard } from "@/components/dashboard/next-session-card"
import { LeitnerBoard } from "@/components/dashboard/leitner-board"
import { ConsistencyChart } from "@/components/dashboard/consistency-chart"
import { MasteryHeatmap } from "@/components/dashboard/mastery-heatmap"
import { TechniqueEfficiencyCard } from "@/components/dashboard/technique-efficiency-card"

export default async function DashboardPage() {
  const [stats, nextSession, consistencyData, leitnerCards, analytics] = await Promise.all([
    getDashboardStats(),
    getNextSession(),
    getConsistencyData(),
    getLeitnerCards(),
    getAnalytics(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Study Control</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Consistency is the bridge between goals and accomplishment.
        </p>
      </div>

      <GlobalStatsBar stats={stats} />

      <NextSessionCard session={nextSession} />

      <LeitnerBoard cards={leitnerCards} />

      <ConsistencyChart data={consistencyData} />

      <div className="rounded-xl border p-5 flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold">Mastery Heatmap</p>
          <p className="text-xs text-muted-foreground">Study intensity × success rate (past 12 months)</p>
        </div>
        <MasteryHeatmap data={analytics.heatmap} />
      </div>

      <TechniqueEfficiencyCard data={analytics.techniqueEfficiency} insight={analytics.aiInsight} />
    </div>
  )
}
