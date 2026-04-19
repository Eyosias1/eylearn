export type TopicHealth = "green" | "yellow" | "red"

export interface Subject {
  id: string
  name: string
}

export interface Topic {
  id: string
  name: string
  subjectId: string
  health: TopicHealth
  retentionScore: number
  intervalDays: number
  lastReviewedAt: string
  dueDate: string
}

export interface RetentionPoint {
  date: string
  retention: number
}

export interface TopicRetention {
  topicId: string
  topicName: string
  history: RetentionPoint[]
}

export interface StudyDay {
  date: string
  minutesStudied: number
}

export interface ScheduledSession {
  id: string
  scheduledFor: string
  subjects: string[]
  topics: string[]
  estimatedMinutes: number
}

export interface UserStats {
  streak: number
  totalSessions: number
  totalHoursStudied: number
  nextExamDate: string
  nextExamLabel: string
}
