"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

type Props = {
  subjects:  Subject[]
  topics:    Topic[]
  subtopics: Subtopic[]
  value:     string | null
  onChange:  (subtopicId: string | null) => void
}

function BadgeRow({ label, items, selected, onSelect }: {
  label:    string
  items:    { id: string; name: string; color?: string }[]
  selected: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <Button key={item.id} type="button" variant="pill" onClick={() => onSelect(item.id)}
            className={cn(
              // layout
              "flex items-center gap-1.5",
              // spacing
              "px-4 py-1",
              // typography
              "text-sm font-medium",
              // animation
              "transition-colors duration-150",
              // conditional
              selected === item.id
                ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                : "bg-muted text-foreground",
            )}
          >
            {item.color && <span className={cn("size-2 rounded-full shrink-0", item.color)} />}
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function ImmediateReviewSubtopicPicker({ subjects, topics, subtopics, value, onChange }: Props) {
  const [subjectId, setSubjectId] = useState<string | null>(null)
  const [topicId,   setTopicId]   = useState<string | null>(null)

  const filteredTopics    = topics.filter(t => t.subject_id === subjectId)
  const filteredSubtopics = subtopics.filter(s => s.topic_id === topicId)

  function handleSubject(id: string) {
    const next = subjectId === id ? null : id
    setSubjectId(next)
    setTopicId(null)
    onChange(null)
  }

  function handleTopic(id: string) {
    const next = topicId === id ? null : id
    setTopicId(next)
    onChange(null)
  }

  function handleSubtopic(id: string) {
    onChange(value === id ? null : id)
  }

  return (
    <div className="flex flex-col gap-4">
      <BadgeRow label="Subject"  items={subjects} selected={subjectId} onSelect={handleSubject} />
      {subjectId && <BadgeRow label="Topic" items={filteredTopics} selected={topicId} onSelect={handleTopic} />}
      {topicId   && <BadgeRow label="Subtopic" items={filteredSubtopics} selected={value} onSelect={handleSubtopic} />}
    </div>
  )
}
