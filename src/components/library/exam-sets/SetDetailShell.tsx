"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SetDetailHeader } from "@/components/library/exam-sets/SetDetailHeader"
import { SetQuestionRow } from "@/components/library/exam-sets/SetQuestionRow"
import { AddQuestionsModal } from "@/components/library/exam-sets/AddQuestionsModal"
import { EditSetDialog } from "@/components/library/exam-sets/EditSetDialog"
import { removeQuestionFromSet, deleteQuestionSet } from "@/lib/actions/question-sets"
import { useQuestionsStore } from "@/providers/questions-store-provider"
import { cn } from "@/lib/utils"
import type { QuestionSet } from "@/types/QuestionSetType"
import type { Question } from "@/types/QuestionType"
import type { Topic } from "@/types/TopicType"
import type { Subject } from "@/types/SubjectType"

type Props = {
  set:           QuestionSet
  questions:     Question[]
  bankQuestions: Question[]
  topics:        Topic[]
  subjects:      Subject[]
}

export function SetDetailShell({ set: initial, questions: initialQuestions, bankQuestions, topics, subjects }: Props) {
  const router = useRouter()
  const { incrementSetCount, decrementSetCount, removeSet } = useQuestionsStore()
  const [set, setSet]             = useState(initial)
  const [questions, setQuestions] = useState([...initialQuestions].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)))
  const [modalOpen, setModalOpen] = useState(false)
  const [editOpen, setEditOpen]   = useState(false)
  const [deleting, setDeleting]   = useState(false)

  async function handleRemove(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
    decrementSetCount(set.id)
    const q = questions.find((q) => q.id === id)
    if (q) await removeQuestionFromSet(id, set.id)
  }

  function handleAdd(added: Question[]) {
    setQuestions((prev) => [...prev, ...added])
    incrementSetCount(set.id, added.length)
  }

  async function handleDelete() {
    setDeleting(true)
    removeSet(set.id)
    await deleteQuestionSet(set.id)
    router.push("/library")
  }

  const available = bankQuestions.filter((q) => !new Set(questions.map((q) => q.id)).has(q.id))

  return (
    <div className={cn("flex flex-col", "w-full max-w-5xl", "mx-auto gap-6")}>
      <SetDetailHeader set={set} deleting={deleting}
        onEdit={() => setEditOpen(true)} onDelete={handleDelete} onAddQuestions={() => setModalOpen(true)} />

      {questions.length === 0 ? (
        <div className={cn(
          "flex flex-col items-center justify-center gap-3",
          "min-h-48",
          "rounded-xl border border-dashed",
          "text-muted-foreground",
        )}>
          <p className="text-sm">No questions yet.</p>
          <Button size="sm" variant="outline" onClick={() => setModalOpen(true)}>
            <Plus className="size-3.5" />Add Questions
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {questions.map((q, i) => (
            <SetQuestionRow key={q.id} question={q} index={i + 1} onRemove={handleRemove} />
          ))}
        </div>
      )}

      <AddQuestionsModal setId={set.id} open={modalOpen} onOpenChange={setModalOpen}
        subjects={subjects} topics={topics} bankQuestions={available} onAdd={handleAdd} />
      <EditSetDialog set={set} open={editOpen} onOpenChange={setEditOpen} onUpdate={setSet} />
    </div>
  )
}
