"use client"

import { useState, useEffect, useRef } from "react"
import type { ImmediateReviewResult } from "@/types/ImmediateReviewType"
import type { Question } from "@/types/QuestionType"

export type GradeData = {
  aiRating:   "correct" | "partial" | "missed"
  aiFeedback: string
}

type ApiGrade = { id: string; round: 1 | 2; rating: "correct" | "partial" | "missed"; feedback: string }

export function useSessionGrading(
  results:      ImmediateReviewResult[],
  round2Results: ImmediateReviewResult[],
  questions:    Question[],
) {
  const [grades,       setGrades]       = useState<Record<string, GradeData>>({})
  const [round1Grades, setRound1Grades] = useState<Record<string, GradeData>>({})
  const [round2Grades, setRound2Grades] = useState<Record<string, GradeData>>({})
  const [loading,      setLoading]      = useState(() => results.length > 0)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current || results.length === 0) return
    hasFetched.current = true

    const allResults = [...results, ...round2Results]

    const items = allResults.map((r, i) => {
      const q     = questions.find(q => q.id === r.questionId)
      const round = i < results.length ? 1 : 2
      return { id: String(i), round, body: r.questionBody || q?.body || "", correctAnswer: r.correctAnswer || q?.correct_answer || "", studentAnswer: r.studentAnswer }
    }).filter(item => item.body)

    if (items.length === 0) return

    fetch("/api/session/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then(r => r.json())
      .then((data: { grades?: ApiGrade[]; error?: string }) => {
        if (data.error) { console.error("[useSessionGrading]", data.error); return }
        const combined: Record<string, GradeData> = {}
        const r1: Record<string, GradeData>       = {}
        const r2: Record<string, GradeData>       = {}
        data.grades?.forEach((g, i) => {
          const entry  = { aiRating: g.rating, aiFeedback: g.feedback }
          combined[String(i)] = entry
          const result = allResults[i]
          if (result) {
            if (g.round === 1) r1[result.questionId] = entry
            else               r2[result.questionId] = entry
          }
        })
        setGrades(combined)
        setRound1Grades(r1)
        setRound2Grades(r2)
      })
      .catch(err => console.error("[useSessionGrading fetch]", err))
      .finally(() => setLoading(false))
  }, [results, round2Results, questions])

  return { grades, round1Grades, round2Grades, loading }
}
