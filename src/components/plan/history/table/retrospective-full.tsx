"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { RetroTable } from "@/components/plan/history/table/retrospective-table"
import { FilterBar } from "@/components/plan/history/table/retrospective-filters"
import type { RetroTopic } from "@/types/progress"

export type SortKey    = "recent" | "name" | "weakest" | "strongest"
export type PerfFilter = "all" | "due" | "struggling" | "needs-work" | "strong"
export type DateRange  = "7" | "15" | "30"

function topicScore(t: RetroTopic): number {
  const w = { strong: 100, partial: 50, poor: 0 }
  let total = 0, count = 0
  for (const s of t.sessions) {
    if (s.rating !== null) { total += w[s.rating]; count++ }
  }
  return count === 0 ? 0 : Math.round(total / count)
}

const BOX_INTERVAL: Record<number, number> = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 }
const TODAY = new Date("2026-04-21")

function isDue(t: RetroTopic): boolean {
  const interval = BOX_INTERVAL[t.box] ?? 1
  const last = new Date(t.lastReview)
  const daysSince = Math.floor((TODAY.getTime() - last.getTime()) / 86400000)
  return daysSince >= interval
}

interface Props {
  topics: RetroTopic[]
}

export function RetrospectiveFull({ topics }: Props) {
  const searchParams = useSearchParams()
  const urlDue = searchParams.get("filter") === "due"

  const [query,      setQuery]      = useState("")
  const [sort,       setSort]       = useState<SortKey>("recent")
  const [subject,    setSubject]    = useState("all")
  const [perf,       setPerf]       = useState<PerfFilter>("all")
  const [userActed,  setUserActed]  = useState(false)
  const [dateRange,  setDateRange]  = useState<DateRange>("15")

  // Use URL param until user manually changes the filter
  const effectivePerf: PerfFilter = !userActed && urlDue ? "due" : perf

  function onPerf(v: PerfFilter) {
    setUserActed(true)
    setPerf(v)
  }

  const subjects = useMemo(
    () => Array.from(new Set(topics.map((t) => t.subject))),
    [topics],
  )

  const dueCount = useMemo(() => topics.filter(isDue).length, [topics])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    const n = parseInt(dateRange)
    const result = topics
      .map((t) => ({ ...t, sessions: t.sessions.slice(-n) }))
      .filter((t) => {
        if (subject !== "all" && t.subject !== subject) return false
        if (effectivePerf === "due"        && !isDue(t))               return false
        const score = topicScore(t)
        if (effectivePerf === "struggling" && score >= 50)             return false
        if (effectivePerf === "needs-work" && (score < 50 || score >= 70)) return false
        if (effectivePerf === "strong"     && score < 70)              return false
        if (q && !t.subtopic.toLowerCase().includes(q) && !t.topic.toLowerCase().includes(q) && !t.subject.toLowerCase().includes(q)) return false
        return true
      })
    if (sort === "name")      result.sort((a, b) => a.topic.localeCompare(b.topic))
    if (sort === "weakest")   result.sort((a, b) => topicScore(a) - topicScore(b))
    if (sort === "strongest") result.sort((a, b) => topicScore(b) - topicScore(a))
    return result
  }, [topics, query, sort, subject, effectivePerf, dateRange])

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        query={query} sort={sort} subject={subject} perf={effectivePerf} dateRange={dateRange} subjects={subjects} dueCount={dueCount}
        onQuery={setQuery} onSort={setSort} onSubject={setSubject} onPerf={onPerf} onDateRange={setDateRange}
      />
      <RetroTable
        topics={filtered}
        emptyMessage="No topics match your filters."
      />
    </div>
  )
}
