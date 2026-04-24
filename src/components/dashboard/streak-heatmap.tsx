"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStudyHistory } from "@/lib/mock/mock-data"
import { StreakYearGrid } from "@/components/dashboard/streak-year-grid"
import { cn } from "@/lib/utils"

function groupByYear(history: ReturnType<typeof getStudyHistory>) {
  const map = new Map<number, typeof history>()
  for (const day of history) {
    const year = new Date(day.date).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(day)
  }
  return Array.from(map.entries()).map(([year, data]) => ({ year, data }))
}

export function StreakHeatmap() {
  const history = getStudyHistory()
  const years = groupByYear(history)
  const [selected, setSelected] = useState(years[years.length - 1].year)
  const current = years.find((y) => y.year === selected) ?? years[years.length - 1]

  return (
    <Card className="flex-[3]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Study Streak</CardTitle>
        <p className="text-xs text-muted-foreground">Your study activity across the year</p>
      </CardHeader>
      <CardContent className="flex gap-6">
        <div className="flex flex-col gap-1 shrink-0">
          {years.map(({ year }) => (
            <button
              key={year}
              onClick={() => setSelected(year)}
              className={cn(
                "text-left text-xs px-3 py-1.5 rounded-md transition-colors",
                selected === year
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {year}
            </button>
          ))}
        </div>
        <StreakYearGrid data={current.data} year={current.year} />
      </CardContent>
    </Card>
  )
}
