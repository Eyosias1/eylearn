export const QUESTION_TYPES = [
  { value: "short-answer" as const, label: "Short Answer" },
  { value: "mcq"          as const, label: "MCQ"          },
  { value: "true-false"   as const, label: "True / False" },
]

export type QuestionType = typeof QUESTION_TYPES[number]["value"]

export type Question = {
  id: string
  user_id: string
  topic_id: string
  subtopic_id: string | null
  set_id: string | null
  position: number | null
  body: string
  type: QuestionType
  correct_answer: string
  created_at: string | null
}
