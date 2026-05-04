"use client"

import { TopicCard } from "@/components/library/question-bank/TopicCard"
import { useQuestionsStore } from "@/providers/questions-store-provider"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

type Props = {
  subjects: Subject[]
  topicsBySubject: Record<string, Topic[]>
  subtopicsByTopic: Record<string, Subtopic[]>
}

export function QuestionsOverview({ subjects, topicsBySubject, subtopicsByTopic }: Props) {
  const { topicCounts } = useQuestionsStore()
  const subjectsWithTopics = subjects.filter((s) => (topicsBySubject[s.id] ?? []).length > 0)

  if (subjectsWithTopics.length === 0) {
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
        <p className="text-sm">No topics yet. Add subjects and topics in the Subjects page first.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {subjectsWithTopics.map((subject) => {
        const topics = topicsBySubject[subject.id] ?? []
        return (
          <div key={subject.id} className="flex flex-col gap-3">
            <div className={cn(
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
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  subject={subject}
                  subtopics={subtopicsByTopic[topic.id] ?? []}
                  questionCount={topicCounts[topic.id] ?? 0}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
