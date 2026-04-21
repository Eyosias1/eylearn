export type DueCard = {
  id: string
  topic: string
  subject: string
  subjectColor: string
  isLate: boolean
  box: number
  lastReviewed: string
  confidenceHistory: ("strong" | "partial" | "poor")[]
}

export type LeitnerCard = {
  id: string
  topic: string
  subject: string
  subjectColor: string
  box: 1 | 2 | 3 | 4 | 5
  lastReviewed: string
}

export type RetroTopic = {
  topic: string
  subject: string
  sessions: {
    date: string
    rating: "strong" | "partial" | "poor" | null
  }[]
}

export type ProspectiveDay = {
  date: string
  topics: {
    name: string
    subject: string
    subjectColor: string
    box: number
  }[]
}

export type SessionRecord = {
  id: string
  date: string
  mode: string
  subjects: string[]
  durationMinutes: number
  cardsReviewed: number
  avgConfidence: number
}

export type AnalyticsData = {
  heatmap: { date: string; intensity: number; successRate: number }[]
  consecutiveDays: number
  masteryBySubject: { name: string; masteryPercent: number }[]
  retentionCurve: {
    theoretical: { day: number; retention: number }[]
    actual: { day: number; retention: number }[]
  }
  techniqueEfficiency: { mode: string; masteryGainPerHour: number }[]
  aiInsight: string
}
