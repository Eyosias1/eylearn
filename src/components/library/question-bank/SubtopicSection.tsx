"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { QuestionCard } from "@/components/library/question-bank/QuestionCard"
import { AddQuestionForm } from "@/components/library/question-bank/AddQuestionForm"
import { deleteQuestion } from "@/lib/actions/questions"
import { useQuestionsStore } from "@/providers/questions-store-provider"
import { cn } from "@/lib/utils"
import type { Subtopic } from "@/types/SubtopicType"
import type { Question } from "@/types/QuestionType"

type Props = {
  subtopic:  Subtopic
  questions: Question[]
  topicId:   string
}

export function SubtopicSection({ subtopic, questions: initial, topicId }: Props) {
  const { decrementTopicCount } = useQuestionsStore()
  const [questions, setQuestions] = useState(initial)
  const [showForm,  setShowForm]  = useState(false)

  async function handleDelete(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
    decrementTopicCount(topicId)
    await deleteQuestion(id, topicId)
  }

  function handleUpdate(updated: Question) {
    setQuestions((prev) => prev.map((q) => q.id === updated.id ? updated : q))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold">{subtopic.name}</p>
        <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-muted text-muted-foreground">
          {questions.length}
        </span>
      </div>

      <div className={cn("grid grid-cols-2 gap-3", "sm:grid-cols-3", "lg:grid-cols-4")}>
        {questions.length === 0 && !showForm && (
          <div className="flex items-center justify-center col-span-full h-24 rounded-lg border border-dashed text-muted-foreground">
            <p className="text-xs">No questions yet</p>
          </div>
        )}
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-1.5 h-28 rounded-lg border border-dashed text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Plus className="size-3.5" />
            <span className="text-xs">Add</span>
          </button>
        )}
      </div>

      {showForm && (
        <AddQuestionForm topicId={topicId} subtopicId={subtopic.id}
          onSuccess={(q) => { setQuestions((prev) => [...prev, q]); setShowForm(false) }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
