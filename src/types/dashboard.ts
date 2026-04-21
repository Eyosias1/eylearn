export type DashboardStats = {
  activeRecallDone: number
  activeRecallTotal: number
  spacedRepDue: number
  totalFocusMinutes: number
  currentStreakDays: number
  bestStreakDays: number
  itemsMemorized: number
  streakBroken: boolean
}

export type NextSessionData = {
  subject: string
  topic: string
  durationMinutes: number
  status: "ready" | "ahead" | "overdue"
  daysOverdue?: number
}

export type TodaySession = {
  id: string
  time: string
  subject: string
  topic: string
  completed: boolean
  inProgress: boolean
}

export type SubjectWithMastery = {
  id: string
  name: string
  masteryPercent: number
}

export type ConsistencyDay = {
  date: string
  minutes: number
}
