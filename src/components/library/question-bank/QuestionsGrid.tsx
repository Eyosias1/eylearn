"use client"

import { useState } from "react"
import { QuestionCard } from "@/components/library/question-bank/QuestionCard"
import { AddQuestionForm } from "@/components/library/question-bank/AddQuestionForm"
import { QuestionsGridFilters } from "@/components/library/question-bank/QuestionsGridFilters"
import { deleteQuestion } from "@/lib/actions/questions"
import { useQuestionsStore } from "@/providers/questions-store-provider"
import { cn } from "@/lib/utils"
import type { Subtopic } from "@/types/SubtopicType"
import type { Question, QuestionType } from "@/types/QuestionType"

type Props = {
  topicId:   string
  subtopics: Subtopic[]
  questions: Question[]
}

export function QuestionsGrid({ topicId, subtopics, questions: initial }: Props) {
  const { incrementTopicCount, decrementTopicCount } = useQuestionsStore()
  const [questions,  setQuestions]  = useState(initial)
  const [filter,     setFilter]     = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<QuestionType | null>(null)
  const [showForm,   setShowForm]   = useState(false)

  const filtered = questions
    .filter((q) => filter ? q.subtopic_id === filter : true)
    .filter((q) => typeFilter ? q.type === typeFilter : true)

  function handleUpdate(updated: Question) {
    setQuestions((prev) => prev.map((q) => q.id === updated.id ? updated : q))
  }

  async function handleDelete(id: string) {
    const q = questions.find((q) => q.id === id)
    setQuestions((prev) => prev.filter((q) => q.id !== id))
    decrementTopicCount(topicId)
    if (q) await deleteQuestion(id, topicId)
  }

  return (
    <div className="flex flex-col gap-4">
      <QuestionsGridFilters
        subtopics={subtopics} filter={filter} typeFilter={typeFilter}
        onFilterChange={setFilter} onTypeFilterChange={setTypeFilter}
        onAddClick={() => setShowForm((v) => !v)}
      />

      {showForm && (
        <AddQuestionForm topicId={topicId} subtopicId={filter} subtopics={subtopics}
          onSuccess={(q) => { setQuestions((prev) => [...prev, q]); setShowForm(false); incrementTopicCount(topicId) }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {filtered.length === 0 ? (
        <div className={cn("flex items-center justify-center", "h-32", "rounded-lg border border-dashed", "text-muted-foreground")}>
          <p className="text-sm">No questions yet</p>
        </div>
      ) : (
        <div className={cn("grid", "grid-cols-2", "gap-3", "sm:grid-cols-3", "lg:grid-cols-4")}>
          {filtered.map((q) => (
            <QuestionCard key={q.id} question={q} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  )
}
