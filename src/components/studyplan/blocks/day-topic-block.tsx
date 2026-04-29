"use client"

import { cn } from "@/lib/utils"
import { encodeDrag, storeDragOffset } from "@/lib/studyplan/drag-time-utility"
import { useBlockResize } from "@/hooks/useBlockResize"
import { updateScheduledStudy } from "@/lib/actions/studyplan-actions"
import type { BlockLayout } from "@/lib/studyplan/layout-blocks"
import type { PlanTopic } from "@/types/studyplan"

export const DAY_HOUR_PX = 80

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

interface Props {
  topic: PlanTopic
  selected: boolean
  onClick: () => void
  layout?: BlockLayout
}

export function DayTopicBlock({ topic, selected, onClick, layout }: Props) {
  const col      = layout?.col ?? 0
  const colCount = layout?.colCount ?? 1
  const top      = ((timeToMinutes(topic.startTime) - 6 * 60) / 60) * DAY_HOUR_PX
  const w        = 100 / colCount
  const l        = col * w

  const { duration, onMouseDown: onResizeDown } = useBlockResize(
    topic.durationMinutes, DAY_HOUR_PX,
    (newDuration) => updateScheduledStudy(topic.id, { title: topic.name, subtopicId: topic.subtopicId, startTime: topic.startTime, durationMinutes: newDuration }),
  )
  const height = Math.max((duration / 60) * DAY_HOUR_PX, 32)

  return (
    <button
      draggable
      onDragStart={(e) => {
        const offsetMinutes = ((e.clientY - e.currentTarget.getBoundingClientRect().top) / DAY_HOUR_PX) * 60
        storeDragOffset(offsetMinutes)
        const { key, data } = encodeDrag(topic.id, 'topic', offsetMinutes)
        e.dataTransfer.setData(key, data)
        e.dataTransfer.effectAllowed = 'move'
      }}
      onClick={onClick}
      style={{ top, height, left: `calc(${l}% + 1px)`, width: `calc(${w}% - 2px)` }}
      className={cn(
        // layout
        "absolute cursor-pointer",
        // animation
        "transition-opacity",
        // conditional
        selected ? "opacity-100 ring-1 ring-foreground/30 rounded-md" : "opacity-85 hover:opacity-100",
      )}
    >
      <div className={cn("absolute inset-0 opacity-20 rounded-md", topic.subjectColor)} />
      <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-r-full", topic.subjectColor)} />
      <div className="relative flex flex-col justify-start px-2.5 pt-1 h-full">
        <p className="text-sm font-semibold leading-tight truncate">{topic.name}</p>
        <p className="text-[11px] text-muted-foreground leading-tight">{topic.subject} · {topic.startTime} — {duration}m</p>
      </div>
      <div
        onMouseDown={onResizeDown}
        className="absolute bottom-0 inset-x-0 h-2.5 cursor-ns-resize flex items-end justify-center pb-0.5 opacity-0 hover:opacity-100"
      >
        <div className="w-6 h-0.5 rounded-full bg-foreground/50" />
      </div>
    </button>
  )
}
