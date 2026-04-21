"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface HeatDay { date: string; intensity: number; successRate: number }

interface Props {
  data: HeatDay[]
  totalSessions: number
  peakSuccessRate: number
  totalActiveHours: number
}

function cellColor(intensity: number, successRate: number): string {
  if (intensity === 0) return "bg-muted"
  const score = intensity * successRate
  if (score > 0.7) return "bg-emerald-500"
  if (score > 0.4) return "bg-emerald-400/70"
  if (score > 0.2) return "bg-emerald-300/50"
  return "bg-emerald-200/30"
}

export function MasteryHeatmap({ data, totalSessions, peakSuccessRate, totalActiveHours }: Props) {
  const [hovered, setHovered] = useState<HeatDay | null>(null)

  const weeks: HeatDay[][] = []
  let week: HeatDay[] = []
  const firstDay = new Date(data[0]?.date ?? "").getDay()
  for (let i = 0; i < firstDay; i++) week.push({ date: "", intensity: 0, successRate: 0 })
  for (const day of data) {
    week.push(day)
    if (week.length === 7) { weeks.push(week); week = [] }
  }
  if (week.length) weeks.push(week)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-6">
        <div className="flex flex-col gap-1 overflow-x-auto">
          <div className="flex gap-1">
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {w.map((d, di) => (
                  <div
                    key={di}
                    className="relative"
                    onMouseEnter={() => d.date ? setHovered(d) : null}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className={cn("block size-3 rounded-[2px]", d.date ? cellColor(d.intensity, d.successRate) : "bg-transparent")} />
                    {hovered?.date === d.date && d.date && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-10 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs shadow-md">
                        <p className="font-medium">{new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                        <p className="text-muted-foreground">Intensity: {Math.round(d.intensity * 100)}%</p>
                        <p className="text-muted-foreground">Success: {Math.round(d.successRate * 100)}%</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] text-muted-foreground">Less</span>
            {["bg-muted", "bg-emerald-200/30", "bg-emerald-300/50", "bg-emerald-400/70", "bg-emerald-500"].map((c, i) => (
              <span key={i} className={cn("size-3 rounded-[2px]", c)} />
            ))}
            <span className="text-[10px] text-muted-foreground">More</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div>
          <p className="text-lg font-bold tabular-nums">{totalSessions.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Sessions</p>
        </div>
        <div>
          <p className="text-lg font-bold tabular-nums">{peakSuccessRate}%</p>
          <p className="text-xs text-muted-foreground">Peak Success</p>
        </div>
        <div>
          <p className="text-lg font-bold tabular-nums">{totalActiveHours}h</p>
          <p className="text-xs text-muted-foreground">Active Time</p>
        </div>
      </div>
    </div>
  )
}
