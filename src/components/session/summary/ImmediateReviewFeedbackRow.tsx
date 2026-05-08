"use client"

import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImmediateReviewResult } from "@/types/ImmediateReviewType"
import type { GradeData } from "@/hooks/useSessionGrading"
import type { Question } from "@/types/QuestionType"

type Props = { result: ImmediateReviewResult; question: Question | undefined; grade: GradeData | undefined; isLoading: boolean }

const RATING_COLOR = { "correct": "text-green-500", "partial": "text-yellow-500", "missed": "text-destructive" }
const RATING_BG    = { "correct": "bg-green-200/15", "partial": "bg-yellow-300/15", "missed": "bg-red-500/10" }

function getMismatchMessage(result: ImmediateReviewResult, grade: GradeData | undefined) {
  if (result.confidence === "high" && result.selfRating === "missed")  return "High confidence but missed, likely a misconception."
  if (result.confidence === "high" && result.selfRating === "partial") return "High confidence but partial, you may be overestimating here."
  if (grade && result.selfRating === "correct" && grade.aiRating !== "correct") return "You rated Correct, but AI marked it differently review carefully."
  return null
}

export function ImmediateReviewFeedbackRow({ result, question, grade, isLoading }: Props) {
  const mismatch = getMismatchMessage(result, grade)

  return (
    <div className="rounded-xl border p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-base font-semibold">{result.questionBody || question?.body || "Unknown question"}</span>
        <div className="flex items-center gap-2 shrink-0 text-xs font-medium">
          <span className="text-muted-foreground">Confidence: <span className="capitalize">{result.confidence}</span></span>
          <span className="text-muted-foreground">You rated: <span className={cn("capitalize", RATING_COLOR[result.selfRating])}>{result.selfRating}</span></span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your answer</p>
          <p className="text-sm">{result.studentAnswer || <span className="italic text-muted-foreground">No answer given</span>}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Correct answer</p>
          <p className="text-sm">{result.correctAnswer || question?.correct_answer}</p>
        </div>
      </div>

      {mismatch && (
        <p className="border-l-2 border-yellow-500 pl-3 text-xs font-bold text-muted-foreground">
          {mismatch}
        </p>
      )}

      <div className={cn("flex flex-col gap-2 rounded-xl p-3 border", grade ? RATING_BG[grade.aiRating] : "bg-muted/60")}>
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-muted-foreground" />
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI Analysis</p>
          {grade && (
            <span className={cn("text-xs font-semibold capitalize", RATING_COLOR[grade.aiRating])}>
              {grade.aiRating}
            </span>
          )}
        </div>
        {isLoading && !grade && <p className="text-xs text-muted-foreground animate-pulse">Analyzing with AI...</p>}
        {grade && <p className="text-sm">{grade.aiFeedback}</p>}
        {!isLoading && !grade && <p className="text-xs text-muted-foreground italic">Analysis unavailable</p>}
      </div>
    </div>
  )
}
