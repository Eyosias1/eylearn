export type CalendarView = "day" | "week" | "month"
export type SessionRating = "strong" | "partial" | "poor" | null

export type PlanTopic = {
  id: string
  subtopicId:   string | null
  topicId:      string | null
  subjectId:    string | null
  name: string
  topicName:    string
  subject: string
  subjectColor: string
  box: 1 | 2 | 3 | 4 | 5
  startTime: string       // HH:MM
  durationMinutes: number // e.g. 30, 45, 60
  lastSessions: SessionRating[]
  todayProgress: SessionRating
}

export type PlanEvent = {
  date: string // YYYY-MM-DD
  topics: PlanTopic[]
}

export type CalendarEvent = {
  id:              string
  title:           string
  scheduledDate:   string  // YYYY-MM-DD
  startTime:       string  // HH:MM
  durationMinutes: number
  source:          "ics" | "google" | "apple" | "manual"
}

export type CalendarEventInsert = Omit<CalendarEvent, "id"> & {
  externalId?: string
}
