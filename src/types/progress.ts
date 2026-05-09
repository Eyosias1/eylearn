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
  subtopic:   string
  topic:      string
  subject:    string
  box:        1 | 2 | 3 | 4 | 5
  lastReview: string
  sessions: {
    date:       string
    rating:     "strong" | "partial" | "poor" | null
    mode?:      string
    duration?:  number
    confidence?: number
  }[]
}

export type RetroSubjectGroup = {
  subject: string
  topics: RetroTopic[]
  // 0–100 score: strong=100, partial=50, poor=0, null ignored
  healthScore: number
  lastStudied: string
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
  techniqueEfficiency: {
    mode: string
    masteryGainPerHour: number
    usagePercent: number
    trend: "up" | "down" | "flat"
    bySubject: {
      subject: string
      score: number
      topics: {
        topic: string
        score: number
        subtopics: { subtopic: string; score: number }[]
      }[]
    }[]
    history: { week: string; score: number }[]
  }[]
  aiInsight: string
}
