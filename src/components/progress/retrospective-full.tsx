"use client"

import { useState, useMemo } from "react"
import { RetroTable } from "@/components/progress/retrospective-table"
import { FilterBar } from "@/components/progress/retrospective-filters"
import { RetroLegend } from "@/components/progress/retro-legend"
import type { RetroTopic } from "@/types/progress"

export type SortKey    = "recent" | "name" | "weakest" | "strongest"
export type PerfFilter = "all" | "struggling" | "needs-work" | "strong"
export type DateRange  = "7" | "15" | "30"

function topicScore(t: RetroTopic): number {
  const w = { strong: 100, partial: 50, poor: 0 }
  let total = 0, count = 0
  for (const s of t.sessions) {
    if (s.rating !== null) { total += w[s.rating]; count++ }
  }
  return count === 0 ? 0 : Math.round(total / count)
}

interface Props { topics: RetroTopic[] }

export function RetrospectiveFull({ topics }: Props) {
  const [query,     setQuery]     = useState("")
  const [sort,      setSort]      = useState<SortKey>("recent")
  const [subject,   setSubject]   = useState("all")
  const [perf,      setPerf]      = useState<PerfFilter>("all")
  const [dateRange, setDateRange] = useState<DateRange>("15")

  const subjects = useMemo(
    () => Array.from(new Set(topics.map((t) => t.subject))),
    [topics],
  )

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    const n = parseInt(dateRange)
    const result = topics
      .map((t) => ({ ...t, sessions: t.sessions.slice(-n) }))
      .filter((t) => {
        if (subject !== "all" && t.subject !== subject) return false
        const score = topicScore(t)
        if (perf === "struggling"  && score >= 50)                return false
        if (perf === "needs-work"  && (score < 50 || score >= 70)) return false
        if (perf === "strong"      && score < 70)                 return false
        if (q && !t.topic.toLowerCase().includes(q) && !t.subject.toLowerCase().includes(q)) return false
        return true
      })
    if (sort === "name")      result.sort((a, b) => a.topic.localeCompare(b.topic))
    if (sort === "weakest")   result.sort((a, b) => topicScore(a) - topicScore(b))
    if (sort === "strongest") result.sort((a, b) => topicScore(b) - topicScore(a))
    return result
  }, [topics, query, sort, subject, perf, dateRange])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <FilterBar
          query={query} sort={sort} subject={subject} perf={perf} dateRange={dateRange} subjects={subjects}
          onQuery={setQuery} onSort={setSort} onSubject={setSubject} onPerf={setPerf} onDateRange={setDateRange}
        />
        <RetroLegend />
      </div>

      <RetroTable topics={filtered} emptyMessage="No topics match your filters." />
    </div>
  )
}
