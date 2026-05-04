import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Topic } from "@/types/TopicType"
import type { Subject } from "@/types/SubjectType"
import type { Subtopic } from "@/types/SubtopicType"

type Props = {
  topic: Topic
  subject: Subject
  subtopics: Subtopic[]
  questionCount: number
}

export function TopicCard({ topic, subject, subtopics, questionCount }: Props) {
  const visibleSubtopics = subtopics.slice(0, 3)
  const overflow = subtopics.length - 3
  const isEmpty = questionCount === 0

  return (
    <Link href={`/library/${topic.id}`}>
      <div className={cn(
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
        "hover:border-foreground/20 transition-colors cursor-pointer",
        // conditional
        isEmpty && "border-dashed",
      )}>
        <div className={cn(
          // layout
          "inline-flex items-center self-start",
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
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm font-semibold leading-snug">{topic.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {visibleSubtopics.map((s) => s.name).join(", ")}
            {overflow > 0 && `, +${overflow} more`}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className={cn(
            // spacing
            "px-2 py-0.5",
            // typography
            "text-xs font-medium",
            // border
            "rounded-full",
            // colors
            isEmpty ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary",
          )}>
            {questionCount} {questionCount === 1 ? "question" : "questions"}
          </span>
        </div>
      </div>
    </Link>
  )
}
