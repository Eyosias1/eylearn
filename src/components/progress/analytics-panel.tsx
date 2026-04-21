"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { Progress } from "@/components/ui/progress"
import { MasteryHeatmap } from "@/components/progress/mastery-heatmap"
import type { AnalyticsData } from "@/types/progress"

interface Props {
  data: AnalyticsData
}

export function AnalyticsPanel({ data }: Props) {
  const curveData = data.retentionCurve.theoretical.map((t, i) => ({
    day: t.day,
    theoretical: t.retention,
    actual: data.retentionCurve.actual[i]?.retention ?? 0,
  }))

  const totalSessions = data.heatmap.filter((d) => d.intensity > 0).length
  const peakSuccessRate = Math.round(Math.max(...data.heatmap.map((d) => d.successRate)) * 100)
  const totalActiveHours = Math.round(data.heatmap.reduce((sum, d) => sum + d.intensity * 2, 0))

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-6">
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1">Mastery Heatmap</p>
          <p className="text-xs text-muted-foreground mb-4">Study intensity × success rate (past 12 months)</p>
          <MasteryHeatmap
            data={data.heatmap}
            totalSessions={totalSessions}
            peakSuccessRate={peakSuccessRate}
            totalActiveHours={totalActiveHours}
          />
        </div>
        <div className="w-48 shrink-0 flex flex-col gap-4">
          <div className="rounded-xl border p-4 text-center">
            <p className="text-3xl font-bold">{data.consecutiveDays}</p>
            <p className="text-sm font-medium">Consecutive Days</p>
            <p className="text-xs text-muted-foreground mt-1">✓ Verified by Activity Log</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-xs font-semibold mb-3">Mastery by Subject</p>
            <div className="flex flex-col gap-2">
              {data.masteryBySubject.map((s) => (
                <div key={s.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="truncate text-muted-foreground">{s.name}</span>
                    <span className="font-medium">{s.masteryPercent}%</span>
                  </div>
                  <Progress value={s.masteryPercent} className="h-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-semibold mb-1">Retention Curves</p>
          <p className="text-xs text-muted-foreground mb-4">Ebbinghaus theoretical vs. your actual performance</p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveData}>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  formatter={(v, name) => [`${v}%`, name === "theoretical" ? "Theoretical" : "Your Performance"]}
                />
                <Line type="monotone" dataKey="theoretical" stroke="#6b7280" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block w-4 border-t-2 border-dashed border-gray-400" />
              Theoretical Forgetting
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block w-4 border-t-2 border-emerald-500" />
              Your Performance
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-1">Technique Efficiency</p>
          <p className="text-xs text-muted-foreground mb-4">Mastery gains per hour of application</p>
          <div className="flex flex-col gap-3">
            {data.techniqueEfficiency.map((t) => (
              <div key={t.mode} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span>{t.mode}</span>
                  <span className="font-semibold tabular-nums">{t.masteryGainPerHour}%/hr</span>
                </div>
                <Progress value={(t.masteryGainPerHour / 20) * 100} className="h-2" />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic border-l-2 pl-3 leading-relaxed">
            &ldquo;{data.aiInsight}&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
