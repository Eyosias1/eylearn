"use client"

import { MousePointerClick } from "lucide-react"
import { SubtopicPanel } from "@/components/subtopics/subtopic-panel"
import { SubjectsManageView } from "@/components/library/subjects/SubjectsManageView"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

type Props = {
  mode:             "subtopic" | "manage" | null
  subtopic:         Subtopic | null
  topic:            Topic | null
  subject:          Subject | null
  subjects:         Subject[]
  topicsBySubject:  Record<string, Topic[]>
  subtopicsByTopic: Record<string, Subtopic[]>
  onClose:          () => void
}

export function SubjectsPanel({ mode, subtopic, topic, subject, subjects, topicsBySubject, subtopicsByTopic, onClose }: Props) {
  if (mode === "manage") {
    return <SubjectsManageView subjects={subjects} topicsBySubject={topicsBySubject} subtopicsByTopic={subtopicsByTopic} onClose={onClose} />
  }

  if (mode === "subtopic" && subtopic && topic && subject) {
    return <SubtopicPanel subtopic={subtopic} topic={topic} subject={subject} onClose={onClose} />
  }

  return (
    <div className={cn(
      // layout
      "flex flex-col items-center justify-center gap-3 shrink-0 text-center",
      // sizing
      "w-72",
      // spacing
      "p-6",
      // border
      "rounded-xl border border-dashed",
      // colors
      "bg-card",
      // position
      "sticky top-4",
    )}>
      <MousePointerClick className="size-6 text-muted-foreground/50" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Nothing selected</p>
        <p className="text-xs text-muted-foreground">Click a subtopic card to view details, or Manage to edit subjects</p>
      </div>
    </div>
  )
}
