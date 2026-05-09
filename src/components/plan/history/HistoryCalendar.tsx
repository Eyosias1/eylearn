"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HistoryDayDetail } from "@/components/studyplan/history/HistoryDayDetail"
import { cn } from "@/lib/utils"
import type { RetroTopic } from "@/types/progress"
import type { DayEntry } from "@/components/studyplan/history/HistoryDayDetail"

const RATING_COLOR = { strong: "bg-emerald-500", partial: "bg-yellow-400", poor: "bg-red-500" }
const DAY_LABELS   = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function pad(n: number) { return String(n).padStart(2, "0") }

type DayData = { entries: DayEntry[]; dominant: "strong" | "partial" | "poor" }

export function HistoryCalendar({ topics }: { topics: RetroTopic[] }) {
  const dateMap = useMemo(() => {
    const map = new Map<string, DayData>()
    for (const t of topics) {
      for (const s of t.sessions) {
        if (!s.rating) continue
        if (!map.has(s.date)) map.set(s.date, { entries: [], dominant: "partial" })
        map.get(s.date)!.entries.push({ subtopic: t.subtopic, rating: s.rating, confidence: s.confidence })
      }
    }
    for (const [, d] of map) {
      const c = { strong: 0, partial: 0, poor: 0 }
      for (const e of d.entries) c[e.rating]++
      d.dominant = c.strong > c.poor ? "strong" : c.poor > c.strong ? "poor" : "partial"
    }
    return map
  }, [topics])

  const months = useMemo(() => {
    const seen = new Set<string>()
    const list: Date[] = []
    for (const [d] of dateMap) {
      const dt  = new Date(d)
      const key = `${dt.getFullYear()}-${dt.getMonth()}`
      if (!seen.has(key)) { seen.add(key); list.push(new Date(dt.getFullYear(), dt.getMonth(), 1)) }
    }
    return list.sort((a, b) => a.getTime() - b.getTime())
  }, [dateMap])

  const [idx,        setIdx]        = useState(() => Math.max(0, months.length - 1))
  const [activeDate, setActiveDate] = useState<string | null>(null)

  if (months.length === 0) return <p className="text-sm text-muted-foreground">No sessions recorded yet.</p>

  const cur   = months[Math.min(idx, months.length - 1)]
  const year  = cur.getFullYear()
  const mon   = cur.getMonth()
  const lead  = new Date(year, mon, 1).getDay()
  const days  = new Date(year, mon + 1, 0).getDate()
  const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  const active = activeDate ? dateMap.get(activeDate) ?? null : null

  return (
    <div className={cn("flex flex-col", "gap-4")}>
      {/* Month nav */}
      <div className={cn("flex items-center justify-between")}>
        <Button variant="ghost" size="icon-sm" onClick={() => setIdx(i => i - 1)} disabled={idx === 0}>
          <ChevronLeft className="size-3.5" />
        </Button>
        <span className="text-sm font-medium">
          {cur.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <Button variant="ghost" size="icon-sm" onClick={() => setIdx(i => i + 1)} disabled={idx === months.length - 1}>
          <ChevronRight className="size-3.5" />
        </Button>
      </div>

      {/* Day detail */}
      {activeDate && active
        ? <HistoryDayDetail date={activeDate} entries={active.entries} />
        : <div className={cn("flex items-center justify-center py-5 rounded-xl", "bg-muted/40")}>
            <span className="text-xs text-muted-foreground">Select a day to see sessions</span>
          </div>
      }

      {/* Calendar grid */}
      <div className={cn("grid grid-cols-7", "gap-1.5")}>
        {DAY_LABELS.map(d => (
          <span key={d} className="text-[11px] text-center text-muted-foreground pb-1">{d}</span>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const dateStr = `${year}-${pad(mon + 1)}-${pad(day)}`
          const data    = dateMap.get(dateStr)
          const isActive = activeDate === dateStr
          return (
            <div key={dateStr} onClick={() => setActiveDate(d => d === dateStr ? null : dateStr)}
              className={cn("cursor-pointer", "transition-transform duration-150 ease-out hover:scale-110 active:scale-95")}
            >
              <div className={cn(
                // layout
                "relative flex items-center justify-center w-full h-14 rounded-sm",
                // animation
                "transition-colors duration-150",
                // border + color
                isActive
                  ? "border-2 border-foreground/60 bg-muted/50"
                  : "border border-border/50 hover:border-foreground/30 bg-muted/30 hover:bg-muted/50",
              )}>
                <span className="absolute top-1.5 left-1 text-xs text-muted-foreground leading-none">{day}</span>
                {data && <span className={cn("block size-2.5 rounded-full", RATING_COLOR[data.dominant])} />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
