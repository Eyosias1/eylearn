"use client"

import { SubtopicCard } from "@/components/library/subjects/SubtopicCard"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

type Props = {
  subjects:         Subject[]
  topicsBySubject:  Record<string, Topic[]>
  subtopicsByTopic: Record<string, Subtopic[]>
  selected:         Subtopic | null
  onSelect:         (subtopic: Subtopic | null) => void
}

export function SubjectsOverview({ subjects, topicsBySubject, subtopicsByTopic, selected, onSelect }: Props) {
  if (subjects.length === 0) {
    return (
      <div className={cn(
        // layout
        "flex flex-col items-center justify-center",
        // sizing
        "min-h-48",
        // border
        "rounded-xl border border-dashed",
        // colors
        "text-muted-foreground",
      )}>
        <p className="text-sm">No subjects yet. Add one to get started.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 flex-1 min-w-0">
      {subjects.map((subject) => {
        const topics = topicsBySubject[subject.id] ?? []

        const cards = topics.length === 0
          ? [<SubtopicCard key={`subject-${subject.id}`} subject={subject} />]
          : topics.flatMap((topic) => {
              const subtopics = subtopicsByTopic[topic.id] ?? []
              return subtopics.length === 0
                ? [<SubtopicCard key={`topic-${topic.id}`} subject={subject} topic={topic} />]
                : subtopics.map((subtopic) => (
                    <SubtopicCard
                      key={subtopic.id}
                      subject={subject}
                      topic={topic}
                      subtopic={subtopic}
                      selected={selected?.id === subtopic.id}
                      onClick={() => onSelect(selected?.id === subtopic.id ? null : subtopic)}
                    />
                  ))
            })

        return (
          <div key={subject.id} className={cn(
            // layout
            "grid",
            // sizing
            "grid-cols-1",
            // spacing
            "gap-3",
            // mobile
            "sm:grid-cols-2",
            // desktop
            "lg:grid-cols-3",
          )}>
            {cards}
          </div>
        )
      })}
    </div>
  )
}
