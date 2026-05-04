"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionDialog } from "@/components/library/question-bank/QuestionDialog"
import { deleteQuestion } from "@/lib/actions/questions"
import { cn } from "@/lib/utils"
import { QUESTION_TYPES } from "@/types/QuestionType"
import type { Question } from "@/types/QuestionType"

const TYPE_STYLES: Record<Question["type"], string> = {
  "short-answer": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "mcq":          "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "true-false":   "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

type Props = {
  question: Question
  onDelete: (id: string) => void
  onUpdate: (updated: Question) => void
}

export function QuestionCard({ question: initial, onDelete, onUpdate }: Props) {
  const [question, setQuestion] = useState(initial)
  const [open, setOpen]         = useState(false)

  function handleUpdate(updated: Question) {
    setQuestion(updated)
    onUpdate(updated)
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={cn(
          // layout
          "group relative flex flex-col gap-2 text-left",
          // sizing
          "w-full h-full",
          // spacing
          "p-3",
          // border
          "rounded-lg border",
          // colors
          "bg-card",
          // hover
          "hover:border-foreground/20 hover:shadow-sm cursor-pointer",
          // animation
          "transition-all",
        )}
      >
        <Button
          variant="link"
          size="sm"
          onClick={(e) => { e.stopPropagation(); onDelete(question.id); deleteQuestion(question.id, question.topic_id) }}
          className={cn(
            // layout
            "absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100",
            // colors
            "text-muted-foreground group-hover:text-white group-hover:bg-destructive/80",
            // animation
            "transition-all",
          )}
        >
          <Trash2 className="size-4" />
        </Button>
        <p className="text-sm font-medium line-clamp-2">{question.body}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{question.correct_answer}</p>
        <div className="mt-auto">
          <span className={cn("px-1.5 py-0.5 rounded text-xs font-semibold", TYPE_STYLES[question.type])}>
            {QUESTION_TYPES.find((t) => t.value === question.type)?.label}
          </span>
        </div>
      </div>

      <QuestionDialog
        question={question}
        open={open}
        onOpenChange={setOpen}
        onUpdate={handleUpdate}
        onDelete={onDelete}
      />
    </>
  )
}
