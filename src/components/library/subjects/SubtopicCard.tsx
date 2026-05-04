"use client"

import { cn } from "@/lib/utils"
import type { Subtopic } from "@/types/SubtopicType"
import type { Topic } from "@/types/TopicType"
import type { Subject } from "@/types/SubjectType"

type Props = {
  subject:   Subject
  topic?:    Topic
  subtopic?: Subtopic
  selected?: boolean
  onClick?:  () => void
}

export function SubtopicCard({ subject, topic, subtopic, selected = false, onClick }: Props) {
  const title      = subtopic?.name ?? topic?.name ?? null
  const topicBadge = !!subtopic && !!topic
  const isEmpty    = !subtopic

  return (
    <div
      onClick={onClick}
      className={cn(
        // layout
        "flex flex-col gap-3",
        // sizing
        "h-full",
        // spacing
        "p-4",
        // border
        "rounded-xl border",
        // colors
        "bg-card",
        // hover
        "transition-colors",
        // conditional
        onClick && "hover:border-foreground/20 cursor-pointer",
        isEmpty && "border-dashed",
        selected && "border-primary/40 ring-1 ring-primary/20",
      )}
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className={cn(
          // layout
          "inline-flex items-center",
          // spacing
          "px-2 py-0.5",
          // typography
          "text-xs font-medium text-white",
          // border
          "rounded-full",
          // colors
          subject.color,
        )}>
          {subject.name}
        </span>
        {topicBadge && (
          <span className={cn(
            // layout
            "inline-flex items-center",
            // spacing
            "px-2 py-0.5",
            // typography
            "text-xs font-medium",
            // border
            "rounded-full",
            // colors
            "bg-muted text-muted-foreground",
          )}>
            {topic!.name}
          </span>
        )}
      </div>

      {title && (
        <p className="text-sm font-semibold leading-snug flex-1">{title}</p>
      )}
    </div>
  )
}
