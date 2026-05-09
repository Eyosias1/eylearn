import type { ImmediateReviewResult } from "@/types/ImmediateReviewType"
import type { GradeData } from "@/hooks/useSessionGrading"

type Rating = "correct" | "partial" | "missed"

const CONFIDENCE_SCORE = { high: 100, medium: 50, low: 0 } as const
const RATING_SCORE     = { correct: 100, partial: 50, missed: 0 } as const

function avgScore(scores: number[]): number | null {
  if (scores.length === 0) return null
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

function combinedRating(r1: Rating, r2: Rating): Rating {
  if (r1 === "correct")             return "correct"
  if (r2 === "correct")             return "partial"
  if (r1 === "partial" && r2 === "partial") return "partial"
  return "missed"
}

function deriveOverallRating(finals: Rating[]): Rating {
  if (finals.every(r => r === "correct")) return "correct"
  if (finals.some(r => r === "missed"))   return "missed"
  return "partial"
}

export type SessionAggregates = {
  actualDurationMinutes: number
  round1Score:           number | null
  round2Score:           number | null
  round1AvgConfidence:   number | null
  aiVerifiedScore:       number
  overallRating:         Rating
}

export function computeSessionAggregates({
  elapsedSeconds,
  results,
  round2Results,
  round1Grades,
  round2Grades,
}: {
  elapsedSeconds: number
  results:        ImmediateReviewResult[]
  round2Results:  ImmediateReviewResult[]
  round1Grades:   Record<string, GradeData>
  round2Grades:   Record<string, GradeData>
}): SessionAggregates {
  const actualDurationMinutes = Math.round(elapsedSeconds / 60)

  const r1Scores = results.map(r => RATING_SCORE[round1Grades[r.questionId]?.aiRating ?? "missed"])
  const round1Score = avgScore(r1Scores)

  const r2Scores = round2Results.map(r => RATING_SCORE[round2Grades[r.questionId]?.aiRating ?? "missed"])
  const round2Score = r2Scores.length > 0 ? avgScore(r2Scores) : null

  const confScores = results.map(r => CONFIDENCE_SCORE[r.confidence])
  const round1AvgConfidence = avgScore(confScores)

  const allAiScores = [
    ...results.map(r => RATING_SCORE[round1Grades[r.questionId]?.aiRating ?? "missed"]),
    ...round2Results.map(r => RATING_SCORE[round2Grades[r.questionId]?.aiRating ?? "missed"]),
  ]
  const aiVerifiedScore = avgScore(allAiScores) ?? 0

  const finals: Rating[] = results.map(r => {
    const r1 = round1Grades[r.questionId]?.aiRating ?? "missed"
    const r2Grade = round2Grades[r.questionId]
    if (!r2Grade) return r1
    return combinedRating(r1, r2Grade.aiRating)
  })
  const overallRating = deriveOverallRating(finals)

  return { actualDurationMinutes, round1Score, round2Score, round1AvgConfidence, aiVerifiedScore, overallRating }
}
