import type {
  DashboardStats,
  NextSessionData,
  TodaySession,
  SubjectWithMastery,
  ConsistencyDay,
} from "@/types/dashboard"

// Each function mirrors what a Supabase query would return.
// Replace the return value with a real query when ready.

export async function getDashboardStats(): Promise<DashboardStats> {
  return {
    activeRecallDone: 4,
    activeRecallTotal: 10,
    spacedRepDue: 12,
    totalFocusMinutes: 8532,
    currentStreakDays: 18,
    bestStreakDays: 31,
    itemsMemorized: 3492,
    streakBroken: false,
  }
}

export async function getNextSession(): Promise<NextSessionData> {
  return {
    subject: "Biochemistry",
    topic: "Metabolic Pathways",
    durationMinutes: 45,
    status: "ready",
  }
}

export async function getTodaySchedule(): Promise<TodaySession[]> {
  return [
    { id: "ts1", time: "09:00 AM", subject: "Biochemistry",     topic: "Reviewing Citric Acid Cycle", completed: true,  inProgress: false },
    { id: "ts2", time: "10:30 AM", subject: "Neuroanatomy",     topic: "Limbic System Structures",    completed: false, inProgress: true  },
    { id: "ts3", time: "01:00 PM", subject: "Organic Chemistry", topic: "Hydration Reactions",         completed: false, inProgress: false },
  ]
}

export async function getActiveSubjects(): Promise<SubjectWithMastery[]> {
  return [
    { id: "s1", name: "Microbiology",  masteryPercent: 88 },
    { id: "s2", name: "Pharmacology",  masteryPercent: 62 },
    { id: "s3", name: "Pathology",     masteryPercent: 45 },
    { id: "s4", name: "Genetics",      masteryPercent: 74 },
  ]
}

export async function getConsistencyData(): Promise<ConsistencyDay[]> {
  const pattern = [45, 0, 60, 90, 30, 0, 75, 60, 45, 0, 90, 30, 60, 45]
  const today = new Date("2026-04-21")
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (13 - i))
    return { date: d.toISOString().split("T")[0], minutes: pattern[i] }
  })
}
