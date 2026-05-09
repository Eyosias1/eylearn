"use client"

import { useState, useEffect, useCallback } from "react"
import type { Question } from "@/types/QuestionType"
import type { ImmediateReviewRating, ImmediateReviewConfidence, ImmediateReviewResult, ImmediateReviewSession } from "@/types/ImmediateReviewType"

export function useImmediateReviewSession(questions: Question[], durationMinutes: number, subtopicId: string, enableRound2: boolean, elaborativeInterrogation: boolean): ImmediateReviewSession {
  const totalSeconds = durationMinutes * 60
  const [stage, setStage]                     = useState<"question" | "between-rounds" | "summary">("question")
  const [round, setRound]                     = useState<1 | 2>(1)
  const [currentIndex, setCurrentIndex]       = useState(0)
  const [studentAnswer, setStudentAnswer]     = useState("")
  const [isRevealed, setIsRevealed]           = useState(false)
  const [selectedConfidence, setSelectedConfidence] = useState<ImmediateReviewConfidence | null>(null)
  const [selectedRating, setSelectedRating]         = useState<ImmediateReviewRating | null>(null)
  const [elapsedSeconds, setElapsed]          = useState(0)
  const [results, setResults]                 = useState<ImmediateReviewResult[]>([])
  const [round2Questions, setRound2Questions] = useState<Question[]>([])
  const [round2Results, setRound2Results]     = useState<ImmediateReviewResult[]>([])

  useEffect(() => {
    if (stage !== "question" && stage !== "between-rounds") return
    const id = setInterval(() => setElapsed(prev => Math.min(prev + 1, totalSeconds)), 1000)
    return () => clearInterval(id)
  }, [stage, totalSeconds])

  useEffect(() => {
    if (elapsedSeconds < totalSeconds) return
    if (stage !== "question" && stage !== "between-rounds") return
    const id = setTimeout(() => setStage("summary"), 0)
    return () => clearTimeout(id)
  }, [elapsedSeconds, totalSeconds, stage])

  const selectConfidence = useCallback((c: ImmediateReviewConfidence) => {
    setSelectedConfidence(c)
  }, [])

  const revealAnswer = useCallback(() => {
    setIsRevealed(true)
  }, [])

  const selectRating = useCallback((r: ImmediateReviewRating) => {
    setSelectedRating(r)
  }, [])

  const finishSession = useCallback(() => setStage("summary"), [])

  const advanceQuestion = useCallback(() => {
    if (!selectedRating) return
    const activeQs = round === 1 ? questions : round2Questions
    const current  = activeQs[currentIndex]
    const next     = currentIndex + 1
    const result: ImmediateReviewResult = {
      questionId: current.id, questionBody: current.body, correctAnswer: current.correct_answer,
      studentAnswer, confidence: selectedConfidence ?? "medium", selfRating: selectedRating,
    }

    const resetQuestion = () => {
      setStudentAnswer(""); setIsRevealed(false); setSelectedConfidence(null); setSelectedRating(null)
    }

    if (round === 1) {
      const newResults = [...results, result]
      setResults(newResults)
      if (next >= questions.length) {
        const weakQs = questions
          .filter(q => newResults.some(r => r.questionId === q.id && r.selfRating !== "correct"))
          .sort(() => Math.random() - 0.5)
        resetQuestion()
        if (!enableRound2 || weakQs.length === 0) setStage("summary")
        else { setRound2Questions(weakQs); setStage("between-rounds") }
      } else {
        setCurrentIndex(next); resetQuestion()
      }
    } else {
      setRound2Results(prev => [...prev, result])
      if (next >= round2Questions.length) { resetQuestion(); setStage("summary") }
      else { setCurrentIndex(next); resetQuestion() }
    }
  }, [round, currentIndex, questions, round2Questions, results, studentAnswer, selectedConfidence, selectedRating, enableRound2])

  const skipQuestion = useCallback(() => {
    const activeQs = round === 1 ? questions : round2Questions
    const current  = activeQs[currentIndex]
    const next     = currentIndex + 1
    const result: ImmediateReviewResult = {
      questionId: current.id, questionBody: current.body, correctAnswer: current.correct_answer,
      studentAnswer: "", confidence: "low", selfRating: "skipped",
    }
    const reset = () => { setStudentAnswer(""); setIsRevealed(false); setSelectedConfidence(null); setSelectedRating(null) }
    if (round === 1) {
      const newResults = [...results, result]; setResults(newResults); reset()
      if (next >= questions.length) {
        const weakQs = questions.filter(q => newResults.some(r => r.questionId === q.id && r.selfRating !== "correct")).sort(() => Math.random() - 0.5)
        !enableRound2 || weakQs.length === 0 ? setStage("summary") : (setRound2Questions(weakQs), setStage("between-rounds"))
      } else setCurrentIndex(next)
    } else {
      setRound2Results(prev => [...prev, result]); reset()
      next >= round2Questions.length ? setStage("summary") : setCurrentIndex(next)
    }
  }, [round, currentIndex, questions, round2Questions, results, enableRound2])

  const startRound2 = useCallback(() => {
    setRound(2); setCurrentIndex(0); setStudentAnswer(""); setIsRevealed(false); setStage("question")
  }, [])

  const activeQuestions  = round === 1 ? questions : round2Questions
  const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds)

  return {
    subtopicId, scheduledDuration: durationMinutes,
    stage, round, activeQuestions, questions, round2Questions, currentIndex,
    currentQuestion: activeQuestions[currentIndex] ?? null,
    studentAnswer, isRevealed, elapsedSeconds, remainingSeconds,
    timeProgress: (remainingSeconds / totalSeconds) * 100,
    results, round2Results, elaborativeInterrogation, selectedConfidence, selectedRating,
    setStudentAnswer, selectConfidence, revealAnswer, selectRating, advanceQuestion, skipQuestion, startRound2, finishSession,
  }
}
