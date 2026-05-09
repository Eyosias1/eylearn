import type { Question } from "@/types/QuestionType"

export type ImmediateReviewRating    = "correct" | "partial" | "missed" | "skipped"
export type ImmediateReviewConfidence = "high" | "medium" | "low"

export type ImmediateReviewResult = {
  questionId:    string
  questionBody:  string
  correctAnswer: string
  studentAnswer: string
  confidence:    ImmediateReviewConfidence
  selfRating:    ImmediateReviewRating
}

export type ImmediateReviewSession = {
  subtopicId:        string
  scheduledDuration: number
  stage: "question" | "between-rounds" | "summary"
  round: 1 | 2
  activeQuestions: Question[]
  questions: Question[]
  round2Questions: Question[]
  currentIndex: number
  currentQuestion: Question | null
  studentAnswer: string
  isRevealed: boolean
  elapsedSeconds: number
  remainingSeconds: number
  timeProgress: number
  results: ImmediateReviewResult[]
  round2Results: ImmediateReviewResult[]
  elaborativeInterrogation: boolean
  selectedConfidence: ImmediateReviewConfidence | null
  selectedRating: ImmediateReviewRating | null
  setStudentAnswer: (v: string) => void
  selectConfidence: (c: ImmediateReviewConfidence) => void
  revealAnswer: () => void
  selectRating: (r: ImmediateReviewRating) => void
  advanceQuestion: () => void
  skipQuestion: () => void
  startRound2: () => void
  finishSession: () => void
}
