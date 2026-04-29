"use client"

import { cn } from "@/lib/utils"
import type { CalendarEvent, PlanTopic } from "@/types/studyplan"

interface Props {
  day: number
  dateStr: string
  isToday: boolean
  topics: PlanTopic[]
  calendarEvents: CalendarEvent[]
  selectedTopic: PlanTopic | null
  onSelectTopic: (t: PlanTopic) => void
  onOpenDialog: () => void
}

export function MonthDayCell({ day, dateStr, isToday, topics, calendarEvents, selectedTopic, onSelectTopic, onOpenDialog }: Props) {
  return (
    <div
      onClick={() => topics.length > 0 && onOpenDialog()}
      className={cn(
        // layout
        "border-r border-b flex flex-col gap-1",
        // sizing
        "min-h-[120px]",
        // spacing
        "p-2",
        // animation
        "transition-colors",
        // conditional
        topics.length > 0 && "cursor-pointer hover:bg-muted/80",
      )}
    >
      <span className={cn(
        // layout
        "flex items-center justify-center self-start",
        // sizing
        "size-6",
        // typography
        "text-xs",
        // border
        "rounded-full",
        // conditional
        isToday ? "bg-foreground text-background font-semibold" : "text-muted-foreground",
      )}>
        {day}
      </span>

      {calendarEvents.map((ev) => (
        <div
          key={ev.id}
          className={cn(
            // layout
            "flex items-center gap-1",
            // spacing
            "px-1.5 py-0.5",
            // colors
            "bg-violet-500/10 text-violet-700 dark:text-violet-300",
            // border
            "border border-violet-400/30 rounded-sm",
          )}
        >
          <p className="text-[10px] font-medium leading-tight truncate">{ev.title}</p>
        </div>
      ))}

      {topics.map((t) => (
        <button
          key={t.id}
          onClick={(e) => { e.stopPropagation(); onSelectTopic(t) }}
          className={cn(
            // layout
            "flex items-center gap-1.5 w-full text-left",
            // spacing
            "px-1.5 py-0.5",
            // typography
            "text-[11px] truncate",
            // border
            "rounded-md",
            // animation
            "transition-colors",
            // hover
            "hover:bg-muted",
            // conditional
            selectedTopic?.id === t.id && "bg-muted ring-1 ring-foreground/20",
          )}
        >
          <span className={cn("size-1.5 rounded-full shrink-0", t.subjectColor)} />
          <span className="truncate">{t.name}</span>
          <span className="text-muted-foreground shrink-0">{t.startTime}</span>
        </button>
      ))}
    </div>
  )
}
