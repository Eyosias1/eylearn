"use client"

import { useEffect, useRef, useState } from "react"
import { computeSessionAggregates } from "@/lib/session-history/aggregates"
import { saveReviewSession } from "@/lib/actions/study-session/review-sessions"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"
import type { GradeData } from "@/hooks/useSessionGrading"

const RATING_SCORE = { correct: 100, partial: 50, missed: 0 } as const

export function useSaveReviewSession(
  session:      ImmediateReviewSession,
  round1Grades: Record<string, GradeData>,
  round2Grades: Record<string, GradeData>,
  loading:      boolean,
) {
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState<string | null>(null)
  const hasSaved = useRef(false)

  const { subtopicId, scheduledDuration, results, round2Results, elapsedSeconds } = session

  useEffect(() => {
    if (loading || hasSaved.current || results.length === 0) return
    hasSaved.current = true

    const aggregates = computeSessionAggregates({
      elapsedSeconds, results, round2Results, round1Grades, round2Grades,
    })

    const questionResponses = [
      ...results.filter(r => r.selfRating !== "skipped").map(r => ({
        questionId:    r.questionId,
        round:         1 as const,
        preConfidence: r.confidence,
        selfRating:    r.selfRating as "correct" | "partial" | "missed",
        aiScore:       round1Grades[r.questionId] ? RATING_SCORE[round1Grades[r.questionId].aiRating] : null,
        aiFeedback:    round1Grades[r.questionId]?.aiFeedback ?? null,
      })),
      ...round2Results.filter(r => r.selfRating !== "skipped").map(r => ({
        questionId:    r.questionId,
        round:         2 as const,
        preConfidence: null,
        selfRating:    r.selfRating as "correct" | "partial" | "missed",
        aiScore:       round2Grades[r.questionId] ? RATING_SCORE[round2Grades[r.questionId].aiRating] : null,
        aiFeedback:    round2Grades[r.questionId]?.aiFeedback ?? null,
      })),
    ]

    setSaving(true)
    saveReviewSession({
      subtopicId,
      mode:                     "immediate-review",
      date:                     new Date().toISOString().split("T")[0],
      scheduledDurationMinutes: scheduledDuration,
      actualDurationMinutes:    aggregates.actualDurationMinutes,
      round1AvgConfidence:      aggregates.round1AvgConfidence,
      round1Score:              aggregates.round1Score,
      round2Score:              aggregates.round2Score,
      aiVerifiedScore:          aggregates.aiVerifiedScore,
      overallRating:            aggregates.overallRating,
      questionResponses,
    })
      .catch(err => setError(err instanceof Error ? err.message : "Failed to save session"))
      .finally(() => setSaving(false))
  }, [loading, subtopicId, scheduledDuration, results, round2Results, elapsedSeconds, round1Grades, round2Grades])

  return { saving, error }
}
