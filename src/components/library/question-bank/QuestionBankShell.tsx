'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { QuestionsOverview } from '@/components/library/question-bank/QuestionsOverview'
import type { Subject } from '@/types/SubjectType'
import type { Topic } from '@/types/TopicType'
import type { Subtopic } from '@/types/SubtopicType'

type Props = {
  subjects: Subject[]
  topicsBySubject: Record<string, Topic[]>
  subtopicsByTopic: Record<string, Subtopic[]>
}

export function QuestionBankShell({ subjects, topicsBySubject, subtopicsByTopic }: Props) {
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null)
  const [topicFilter, setTopicFilter] = useState<string | null>(null)

  const allTopics = Object.values(topicsBySubject).flat()
  const visibleTopics = subjectFilter ? (topicsBySubject[subjectFilter] ?? []) : allTopics
  const filteredSubjects = subjectFilter ? subjects.filter((s) => s.id === subjectFilter) : subjects
  const filteredTopics = topicFilter
    ? Object.fromEntries(Object.entries(topicsBySubject).map(([sid, ts]) => [sid, ts.filter((t) => t.id === topicFilter)]))
    : topicsBySubject

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={subjectFilter === null ? 'secondary' : 'ghost'}
          onClick={() => setSubjectFilter(null)}
          className="h-9 rounded-sm text-sm px-3"
        >
          All
        </Button>
        <Select
          value={subjectFilter ?? 'all'}
          onValueChange={(v) => { setSubjectFilter(v === 'all' ? null : v); setTopicFilter(null) }}
        >
          <SelectTrigger className="w-48 h-9 text-sm rounded-sm px-3.5">
            <SelectValue placeholder="All subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="pl-3 py-2 cursor-pointer">All subjects</SelectItem>
            {subjects.map((s) => (
              <SelectItem key={s.id} value={s.id} className="pl-3 py-2 cursor-pointer">{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={topicFilter ?? 'all'}
          onValueChange={(v) => setTopicFilter(v === 'all' ? null : v)}
        >
          <SelectTrigger className="w-48 h-9 text-sm rounded-sm px-3.5">
            <SelectValue placeholder="All topics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="pl-3 py-2 cursor-pointer">All topics</SelectItem>
            {visibleTopics.map((t) => (
              <SelectItem key={t.id} value={t.id} className="pl-3 py-2 cursor-pointer">{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <QuestionsOverview
        subjects={filteredSubjects}
        topicsBySubject={filteredTopics}
        subtopicsByTopic={subtopicsByTopic}
      />
    </div>
  )
}
