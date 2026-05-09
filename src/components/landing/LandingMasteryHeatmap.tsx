"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const days = Array.from({ length: 56 }, (_, index) => ({
  id: index,
  label: ["Bio", "Chem", "Math", "CS"][index % 4],
  value: [0, 1, 2, 3, 4, 2, 1, 3][index % 8],
}))

const colors = [
  "bg-muted",
  "bg-emerald-200/50",
  "bg-emerald-300/70",
  "bg-emerald-400/80",
  "bg-emerald-500",
]

export function LandingMasteryHeatmap() {
  const [active, setActive] = useState(days[34])

  return (
    <div className={cn("flex flex-col gap-3 rounded-lg border bg-background p-4")}>
      <div className={cn("flex items-center justify-between gap-3")}>
        <div>
          <p className={cn("text-sm font-medium text-foreground")}>{active.label} mastery</p>
          <p className={cn("text-xs text-muted-foreground")}>{active.value * 20 + 12}% stronger this week</p>
        </div>
        <p className={cn("text-sm font-semibold text-foreground")}>Live</p>
      </div>
      <div className={cn("grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1")}>
        {days.map((day) => (
          <span
            key={day.id}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setActive(day)}
            onFocus={() => setActive(day)}
            className={cn(
              "size-4 rounded-[3px] transition-all hover:scale-125 focus-visible:outline-ring",
              colors[day.value],
            )}
            aria-label={`${day.label} mastery ${day.value}`}
          />
        ))}
      </div>
      <div className={cn("flex items-center gap-1 text-[10px] text-muted-foreground")}>
        <span>Less</span>
        {colors.map((color) => (
          <span key={color} className={cn("size-3 rounded-[2px]", color)} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
