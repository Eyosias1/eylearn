"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  index: number
  onRemove: (id: string) => void
}

export function SetQuestionRow({ question, index, onRemove }: Props) {
  const label = QUESTION_TYPES.find((t) => t.value === question.type)?.label

  return (
    <div className={cn(
      // layout
      "flex items-start gap-3",
      // spacing
      "p-3",
      // border
      "rounded-lg border",
      // colors
      "bg-card",
    )}>
      <span className="text-xs text-muted-foreground font-mono w-5 shrink-0 pt-0.5">{index}</span>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="text-base font-medium line-clamp-2">{question.body}</p>
        <p className="text-sm text-muted-foreground line-clamp-1">{question.correct_answer}</p>
        <span className={cn("self-start px-1.5 py-0.5 rounded text-xs font-semibold mt-0.5", TYPE_STYLES[question.type])}>
          {label}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(question.id)}
        className="shrink-0 text-muted-foreground hover:text-destructive"
      >
        <X className="size-3.5" />
      </Button>
    </div>
  )
}
