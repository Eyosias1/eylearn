export type StudyMode =
  | "active-recall"
  | "immediate-review"
  | "blurting"
  | "feynman"
  | "pre-test"
  | "exam-simulation"
  | "end-of-day-review"
  | "spaced-review"

export type SessionLength = 20 | 30 | "custom"

export type StudyModeConfig = {
  id: StudyMode
  label: string
  description: string
  iconName: string
}

export type SessionConfig = {
  mode: StudyMode
  subjectIds: string[]
  subtopicId: string | null
  questionCount: number
  interleave: boolean
  elaborativeInterrogation: boolean
  requeue: boolean
  length: SessionLength
  customMinutes: number
}
