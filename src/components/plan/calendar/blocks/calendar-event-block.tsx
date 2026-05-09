"use client"

import { cn } from "@/lib/utils"
import { encodeDrag, storeDragOffset } from "@/lib/studyplan/drag-time-utility"
import { useBlockResize } from "@/hooks/useBlockResize"
import { updateCalendarEvent } from "@/lib/actions/studyplan/calendar"
import type { BlockLayout } from "@/lib/studyplan/layout-blocks"
import type { CalendarEvent } from "@/types/studyplan"

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

interface Props {
  event: CalendarEvent
  hourPx: number
  layout?: BlockLayout
  selected?: boolean
  onClick?: () => void
}

export function CalendarEventBlock({ event, hourPx, layout, selected, onClick }: Props) {
  const col      = layout?.col ?? 0
  const colCount = layout?.colCount ?? 1
  const top      = ((timeToMinutes(event.startTime) - 6 * 60) / 60) * hourPx
  const w        = 100 / colCount
  const l        = col * w

  const { duration, onMouseDown: onResizeDown } = useBlockResize(
    event.durationMinutes, hourPx,
    (newDuration) => updateCalendarEvent(event.id, { title: event.title, startTime: event.startTime, durationMinutes: newDuration }),
  )
  const height = Math.max((duration / 60) * hourPx, 24)

  return (
    <div
      data-block="true"
      draggable
      onDragStart={(e) => {
        const offsetMinutes = ((e.clientY - e.currentTarget.getBoundingClientRect().top) / hourPx) * 60
        storeDragOffset(offsetMinutes)
        const { key, data } = encodeDrag(event.id, 'calev', offsetMinutes)
        e.dataTransfer.setData(key, data)
        e.dataTransfer.effectAllowed = 'move'
      }}
      onClick={onClick}
      style={{ top, height, left: `calc(${l}% + 1px)`, width: `calc(${w}% - 2px)` }}
      className={cn(
        // layout
        "absolute",
        // animation
        "transition-opacity",
        // colors
        "bg-violet-500/10",
        // border
        "border border-violet-500/30 rounded-sm",
        // conditional
        onClick && "cursor-pointer",
        selected ? "opacity-100 ring-1 ring-violet-500/40" : "opacity-85 hover:opacity-100",
      )}
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-violet-500 rounded-l-sm" />
      <div className="flex flex-col justify-start px-1.5 pt-0.5 h-full">
        <p className={cn("text-xs font-semibold leading-tight truncate", "text-violet-700 dark:text-violet-300")}>
          {event.title}
        </p>
        <p className="text-[11px] leading-tight text-violet-500/80">{event.startTime} · {duration}m</p>
      </div>
      <div
        onMouseDown={onResizeDown}
        className="absolute bottom-0 inset-x-0 h-2.5 cursor-ns-resize flex items-end justify-center pb-0.5 opacity-0 hover:opacity-100"
      >
        <div className="w-6 h-0.5 rounded-full bg-violet-500/60" />
      </div>
    </div>
  )
}
