"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ProspectiveDay } from "@/types/progress"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface Props {
  prospectiveDays: ProspectiveDay[]
}

export function ProspectiveCalendar({ prospectiveDays }: Props) {
  const [current, setCurrent] = useState(new Date("2026-04-01"))
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const dueDateMap = new Map(prospectiveDays.map((d) => [d.date, d.topics]))
  const selectedTopics = selectedDay ? (dueDateMap.get(selectedDay) ?? []) : []

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold">
            {current.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon-sm" onClick={() => setCurrent(new Date(year, month - 1, 1))}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => setCurrent(new Date(year, month + 1, 1))}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((d) => (
            <p key={d} className="text-[10px] text-muted-foreground text-center font-medium pb-1">{d}</p>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            const topics = dueDateMap.get(dateStr) ?? []
            const isSelected = selectedDay === dateStr
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-md p-1 text-xs hover:bg-muted transition-colors",
                  isSelected && "bg-primary/10 ring-1 ring-primary",
                )}
              >
                <span>{day}</span>
                {topics.length > 0 && (
                  <div className="flex gap-0.5 flex-wrap justify-center">
                    {topics.slice(0, 3).map((t, j) => (
                      <span key={j} className={cn("size-1.5 rounded-full", t.subjectColor)} />
                    ))}
                    {topics.length > 3 && <span className="text-[8px] text-muted-foreground">+{topics.length - 3}</span>}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="w-52 shrink-0">
          <p className="text-sm font-semibold mb-3">
            {new Date(selectedDay).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </p>
          {selectedTopics.length === 0
            ? <p className="text-xs text-muted-foreground">No reviews due</p>
            : (
              <div className="flex flex-col gap-2">
                {selectedTopics.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className={cn("size-2 rounded-full shrink-0", t.subjectColor)} />
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-muted-foreground">Box {t.box} · {t.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      )}
    </div>
  )
}
