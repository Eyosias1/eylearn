"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImportCalendarButton } from "@/components/plan/calendar/import/import-calendar-button"
import { cn } from "@/lib/utils"
import type { CalendarView } from "@/types/studyplan"

const VIEWS: { value: CalendarView; label: string }[] = [
  { value: "day",   label: "Day"   },
  { value: "week",  label: "Week"  },
  { value: "month", label: "Month" },
]

interface Props {
  date: Date
  view: CalendarView
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onViewChange: (v: CalendarView) => void
}

export function CalendarHeader({ date, view, onPrev, onNext, onToday, onViewChange }: Props) {
  const label = view === "month"
    ? date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : view === "week"
    ? `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    : date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToday}>Today</Button>
        <div className="flex items-center">
          <Button variant="ghost" size="icon-sm" onClick={onPrev}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onNext}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <p className="text-sm font-semibold">{label}</p>
      </div>

      <div className="flex items-center gap-2">
        <ImportCalendarButton />
        <div className="flex items-center rounded-lg border p-0.5 gap-0.5">
          {VIEWS.map((v) => (
            <Button
              variant="ghost"
              key={v.value}
              onClick={() => onViewChange(v.value)}
              className={cn(
                // layout
                "flex items-center",
                // spacing
                "px-3 py-1 h-auto",
                // typography
                "text-sm",
                // border
                "rounded-md",
                // animation
                "transition-colors",
                // conditional
                view === v.value
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {v.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
