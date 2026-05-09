"use server"

import { getAuthenticatedSupabase } from "@/lib/supabase/auth"

type Rating = "correct" | "partial" | "missed"

export type QuestionResponse = {
  questionId:    string
  round:         1 | 2
  preConfidence: "high" | "medium" | "low" | null
  selfRating:    Rating | null
  aiScore:       number | null
  aiFeedback:    string | null
}

export type SaveReviewSessionPayload = {
  subtopicId:               string
  mode:                     string
  date:                     string
  scheduledDurationMinutes: number
  actualDurationMinutes:    number
  round1AvgConfidence:      number | null
  round1Score:              number | null
  round2Score:              number | null
  aiVerifiedScore:          number
  overallRating:            Rating
  questionResponses:        QuestionResponse[]
}

function intervalToBox(days: number): 1 | 2 | 3 | 4 | 5 {
  if (days <= 1)  return 1
  if (days <= 3)  return 2
  if (days <= 7)  return 3
  if (days <= 14) return 4
  return 5
}

function computeNewInterval(current: number, rating: Rating): number {
  if (rating === "correct") return current * 2
  if (rating === "partial") return current
  return 1
}

export async function saveReviewSession(payload: SaveReviewSessionPayload) {
  const { supabase, userId } = await getAuthenticatedSupabase()

  const { data: subtopic } = await supabase
    .from("subtopics")
    .select("last_reviewed_at, next_review_date")
    .eq("id", payload.subtopicId)
    .single()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let currentInterval = 1
  if (subtopic?.last_reviewed_at && subtopic?.next_review_date) {
    const last = new Date(subtopic.last_reviewed_at)
    const next = new Date(subtopic.next_review_date)
    currentInterval = Math.max(1, Math.round((next.getTime() - last.getTime()) / 86400000))
  }

  const interval   = computeNewInterval(currentInterval, payload.overallRating)
  const nextReview = new Date(today)
  nextReview.setDate(today.getDate() + interval)

  const { data: session, error: sessionError } = await supabase
    .from("review_sessions")
    .insert({
      user_id:                    userId,
      subtopic_id:                payload.subtopicId,
      mode:                       payload.mode,
      date:                       payload.date,
      scheduled_duration_minutes: payload.scheduledDurationMinutes,
      actual_duration_minutes:    payload.actualDurationMinutes,
      round1_avg_confidence:      payload.round1AvgConfidence,
      round1_score:               payload.round1Score,
      round2_score:               payload.round2Score,
      ai_verified_score:          payload.aiVerifiedScore,
      overall_rating:             payload.overallRating,
    })
    .select("id")
    .single()

  if (sessionError || !session) throw new Error(sessionError?.message ?? "Failed to save session")

  if (payload.questionResponses.length > 0) {
    const { error: respError } = await supabase
      .from("session_question_responses")
      .insert(payload.questionResponses.map(r => ({
        session_id:     session.id,
        question_id:    r.questionId,
        round:          r.round,
        pre_confidence: r.preConfidence,
        self_rating:    r.selfRating,
        ai_score:       r.aiScore,
        ai_feedback:    r.aiFeedback,
      })))

    if (respError) throw new Error(respError.message)
  }

  const { error: subtopicError } = await supabase
    .from("subtopics")
    .update({
      leitner_active:   true,
      leitner_box:      intervalToBox(interval),
      last_reviewed_at: today.toISOString(),
      next_review_date: nextReview.toISOString().split("T")[0],
    })
    .eq("id", payload.subtopicId)

  if (subtopicError) throw new Error(subtopicError.message)
}
