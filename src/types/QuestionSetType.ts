export type QuestionSet = {
  id: string
  user_id: string
  subject_id: string
  name: string
  description: string | null
  created_at: string
}

export type QuestionSetWithCount = QuestionSet & {
  question_count: number
}
