"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeatDay { date: string; intensity: number; successRate: number }

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d)
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const SHOW_DAYS  = new Set([1, 3, 5])

function cellColor(intensity: number, successRate: number): string {
  if (intensity === 0) return "bg-muted"
  const score = intensity * successRate
  if (score > 0.7) return "bg-emerald-500"
  if (score > 0.4) return "bg-emerald-400/70"
  if (score > 0.2) return "bg-emerald-300/50"
  return "bg-emerald-200/30"
}

export function MasteryHeatmap({ data }: { data: HeatDay[] }) {
  const [hovered, setHovered]         = useState<HeatDay | null>(null)

  const availableYears = useMemo(() => {
    const max = Math.max(...data.map(d => parseDate(d.date).getFullYear()))
    return [max, max - 1, max - 2]
  }, [data])

  const [selectedYear, setSelectedYear] = useState(() => availableYears[0])

  const yearData = useMemo(() => {
    const filtered = data.filter(d => d.date.startsWith(`${selectedYear}-`))
    if (filtered.length > 0) return filtered
    const pad = (n: number) => String(n).padStart(2, "0")
    const days = (selectedYear % 4 === 0 && selectedYear % 100 !== 0) || selectedYear % 400 === 0 ? 366 : 365
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(selectedYear, 0, 1 + i)
      return { date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, intensity: 0, successRate: 0 }
    })
  }, [data, selectedYear])

  const weeks = useMemo(() => {
    const ws: HeatDay[][] = []
    let w: HeatDay[] = []
    const firstDay = yearData[0]?.date ? parseDate(yearData[0].date).getDay() : 0
    for (let i = 0; i < firstDay; i++) w.push({ date: "", intensity: 0, successRate: 0 })
    for (const day of yearData) {
      w.push(day)
      if (w.length === 7) { ws.push(w); w = [] }
    }
    if (w.length) ws.push(w)
    return ws
  }, [yearData])

  const monthStarts = useMemo(() => {
    const map = new Map<number, string>()
    let last = -1
    weeks.forEach((w, wi) => {
      const first = w.find(d => d.date)
      if (!first) return
      const m = parseDate(first.date).getMonth()
      if (m !== last) {
        map.set(wi, parseDate(first.date).toLocaleDateString("en-US", { month: "short" }))
        last = m
      }
    })
    return map
  }, [weeks])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-9 items-start">

        {/* Day-of-week labels — pt must equal month-row h + gap-1 = h-6 + gap-1 = 28px = pt-7 */}
        <div className="flex flex-col gap-[3px] pt-7 shrink-0">
          {DAY_LABELS.map((d, i) => (
            <span key={d} className={cn(
              // layout
              "flex items-center h-5",
              // typography
              "text-xs text-muted-foreground",
              // visibility
              !SHOW_DAYS.has(i) && "invisible",
            )}>{d}</span>
          ))}
        </div>

        {/* Month labels + cell grid */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-[3px] h-6">
            {weeks.map((_, wi) => (
              <div key={wi} className="w-5 relative">
                {monthStarts.has(wi) && (
                  <span className="absolute text-xs text-muted-foreground whitespace-nowrap">
                    {monthStarts.get(wi)}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {w.map((d, di) => {
                  const tooltipSide = wi >= weeks.length - 4 ? "right-0" : "left-1/2 -translate-x-1/2"
                  return (
                    <div
                      key={di}
                      className="relative group"
                      onMouseEnter={() => d.date ? setHovered(d) : null}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span className={cn(
                        // layout
                        "block size-5 rounded-[2px]",
                        // animation
                        "transition-all duration-100",
                        // hover
                        d.date && "group-hover:scale-110 group-hover:brightness-110 cursor-pointer",
                        // color
                        d.date ? cellColor(d.intensity, d.successRate) : "bg-transparent",
                      )} />
                      {hovered?.date === d.date && d.date && (
                        <div className={cn(
                          // layout
                          "absolute bottom-full z-10",
                          // spacing
                          "mb-1.5",
                          // border
                          "rounded-lg border",
                          // color
                          "bg-popover shadow-md",
                          // typography
                          "whitespace-nowrap px-3 py-2 text-xs",
                          // horizontal alignment
                          tooltipSide,
                        )}>
                          <p className="font-semibold mb-0.5">
                            {parseDate(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                          <p className="text-muted-foreground">
                            {d.intensity > 0.7 ? "High" : d.intensity > 0.4 ? "Moderate" : "Low"} activity · {Math.round(d.successRate * 100)}% success
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Year nav */}
        <div className="flex flex-col gap-1 pl-1 pt-7 shrink-0">
          {availableYears.map(y => (
            <Button
              key={y}
              size="lg"
              variant={y === selectedYear ? "outline" : "ghost"}
              onClick={() => setSelectedYear(y)}
            >
              {y}
            </Button>
          ))}
        </div>

      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 pl-9">
        <span className="text-[10px] text-muted-foreground">Less</span>
        {["bg-muted", "bg-emerald-200/30", "bg-emerald-300/50", "bg-emerald-400/70", "bg-emerald-500"].map((c, i) => (
          <span key={i} className={cn("size-3 rounded-[2px]", c)} />
        ))}
        <span className="text-[10px] text-muted-foreground">More</span>
      </div>
    </div>
  )
}
