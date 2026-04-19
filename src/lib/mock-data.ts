import type { Subject, Topic, UserStats, TopicRetention, StudyDay, ScheduledSession } from "@/types/study"

const mockSubjects: Subject[] = [
  { id: "s1", name: "Biology" },
  { id: "s2", name: "Chemistry" },
  { id: "s3", name: "Mathematics" },
  { id: "s4", name: "Physics" },
  { id: "s5", name: "Computer Science" },
  { id: "s6", name: "History" },
]

const mockTopics: Topic[] = [
  // Biology
  { id: "t1",  name: "Cell Division",         subjectId: "s1", health: "red",    retentionScore: 28, intervalDays: 1, lastReviewedAt: "2026-04-17", dueDate: "2026-04-18" },
  { id: "t2",  name: "Photosynthesis",         subjectId: "s1", health: "yellow", retentionScore: 61, intervalDays: 3, lastReviewedAt: "2026-04-16", dueDate: "2026-04-19" },
  { id: "t7",  name: "DNA Replication",        subjectId: "s1", health: "green",  retentionScore: 79, intervalDays: 6, lastReviewedAt: "2026-04-13", dueDate: "2026-04-25" },
  { id: "t9",  name: "Natural Selection",      subjectId: "s1", health: "yellow", retentionScore: 55, intervalDays: 3, lastReviewedAt: "2026-04-15", dueDate: "2026-04-19" },
  { id: "t10", name: "Cellular Respiration",   subjectId: "s1", health: "red",    retentionScore: 32, intervalDays: 1, lastReviewedAt: "2026-04-18", dueDate: "2026-04-19" },
  // Chemistry
  { id: "t3",  name: "Organic Chemistry",      subjectId: "s2", health: "red",    retentionScore: 35, intervalDays: 1, lastReviewedAt: "2026-04-18", dueDate: "2026-04-19" },
  { id: "t4",  name: "Acid-Base Reactions",    subjectId: "s2", health: "green",  retentionScore: 88, intervalDays: 8, lastReviewedAt: "2026-04-11", dueDate: "2026-04-23" },
  { id: "t8",  name: "Thermodynamics",         subjectId: "s2", health: "yellow", retentionScore: 47, intervalDays: 2, lastReviewedAt: "2026-04-17", dueDate: "2026-04-19" },
  { id: "t11", name: "Electron Configuration", subjectId: "s2", health: "green",  retentionScore: 83, intervalDays: 7, lastReviewedAt: "2026-04-12", dueDate: "2026-04-24" },
  { id: "t12", name: "Equilibrium",            subjectId: "s2", health: "red",    retentionScore: 41, intervalDays: 1, lastReviewedAt: "2026-04-18", dueDate: "2026-04-19" },
  // Mathematics
  { id: "t5",  name: "Derivatives",            subjectId: "s3", health: "yellow", retentionScore: 54, intervalDays: 2, lastReviewedAt: "2026-04-17", dueDate: "2026-04-19" },
  { id: "t6",  name: "Integration",            subjectId: "s3", health: "green",  retentionScore: 82, intervalDays: 7, lastReviewedAt: "2026-04-12", dueDate: "2026-04-26" },
  { id: "t13", name: "Linear Algebra",         subjectId: "s3", health: "yellow", retentionScore: 60, intervalDays: 3, lastReviewedAt: "2026-04-16", dueDate: "2026-04-19" },
  { id: "t14", name: "Probability",            subjectId: "s3", health: "green",  retentionScore: 76, intervalDays: 6, lastReviewedAt: "2026-04-13", dueDate: "2026-04-22" },
  { id: "t15", name: "Differential Equations", subjectId: "s3", health: "red",    retentionScore: 29, intervalDays: 1, lastReviewedAt: "2026-04-18", dueDate: "2026-04-19" },
  // Physics
  { id: "t16", name: "Newtonian Mechanics",    subjectId: "s4", health: "green",  retentionScore: 85, intervalDays: 8, lastReviewedAt: "2026-04-11", dueDate: "2026-04-24" },
  { id: "t17", name: "Electromagnetism",       subjectId: "s4", health: "yellow", retentionScore: 58, intervalDays: 3, lastReviewedAt: "2026-04-16", dueDate: "2026-04-19" },
  { id: "t18", name: "Quantum Mechanics",      subjectId: "s4", health: "red",    retentionScore: 22, intervalDays: 1, lastReviewedAt: "2026-04-18", dueDate: "2026-04-19" },
  { id: "t19", name: "Wave Optics",            subjectId: "s4", health: "green",  retentionScore: 78, intervalDays: 6, lastReviewedAt: "2026-04-13", dueDate: "2026-04-24" },
  { id: "t20", name: "Relativity",             subjectId: "s4", health: "yellow", retentionScore: 50, intervalDays: 2, lastReviewedAt: "2026-04-17", dueDate: "2026-04-19" },
  // Computer Science
  { id: "t21", name: "Algorithms",             subjectId: "s5", health: "green",  retentionScore: 90, intervalDays: 9, lastReviewedAt: "2026-04-10", dueDate: "2026-04-26" },
  { id: "t22", name: "Data Structures",        subjectId: "s5", health: "green",  retentionScore: 87, intervalDays: 8, lastReviewedAt: "2026-04-11", dueDate: "2026-04-24" },
  { id: "t23", name: "Operating Systems",      subjectId: "s5", health: "yellow", retentionScore: 63, intervalDays: 3, lastReviewedAt: "2026-04-16", dueDate: "2026-04-19" },
  { id: "t24", name: "Computer Networks",      subjectId: "s5", health: "red",    retentionScore: 38, intervalDays: 1, lastReviewedAt: "2026-04-18", dueDate: "2026-04-19" },
  { id: "t25", name: "Machine Learning",       subjectId: "s5", health: "yellow", retentionScore: 52, intervalDays: 2, lastReviewedAt: "2026-04-17", dueDate: "2026-04-19" },
  // History
  { id: "t26", name: "World War II",           subjectId: "s6", health: "green",  retentionScore: 91, intervalDays: 10, lastReviewedAt: "2026-04-09", dueDate: "2026-04-28" },
  { id: "t27", name: "Industrial Revolution",  subjectId: "s6", health: "green",  retentionScore: 80, intervalDays: 7,  lastReviewedAt: "2026-04-12", dueDate: "2026-04-25" },
  { id: "t28", name: "Cold War",               subjectId: "s6", health: "yellow", retentionScore: 65, intervalDays: 4,  lastReviewedAt: "2026-04-15", dueDate: "2026-04-20" },
  { id: "t29", name: "Renaissance",            subjectId: "s6", health: "red",    retentionScore: 33, intervalDays: 1,  lastReviewedAt: "2026-04-18", dueDate: "2026-04-19" },
  { id: "t30", name: "Ancient Civilizations",  subjectId: "s6", health: "yellow", retentionScore: 57, intervalDays: 3,  lastReviewedAt: "2026-04-16", dueDate: "2026-04-19" },
]

const mockRetention: TopicRetention[] = [
  {
    topicId: "t1", topicName: "Cell Division",
    history: [
      { date: "Apr 13", retention: 100 }, { date: "Apr 14", retention: 82 },
      { date: "Apr 15", retention: 66  }, { date: "Apr 16", retention: 51 },
      { date: "Apr 17", retention: 38  }, { date: "Apr 18", retention: 28 }, { date: "Apr 19", retention: 20 },
    ],
  },
  {
    topicId: "t2", topicName: "Photosynthesis",
    history: [
      { date: "Apr 13", retention: 100 }, { date: "Apr 14", retention: 90 },
      { date: "Apr 15", retention: 80  }, { date: "Apr 16", retention: 71 },
      { date: "Apr 17", retention: 61  }, { date: "Apr 18", retention: 55 }, { date: "Apr 19", retention: 48 },
    ],
  },
  {
    topicId: "t5", topicName: "Derivatives",
    history: [
      { date: "Apr 13", retention: 100 }, { date: "Apr 14", retention: 86 },
      { date: "Apr 15", retention: 74  }, { date: "Apr 16", retention: 64 },
      { date: "Apr 17", retention: 54  }, { date: "Apr 18", retention: 47 }, { date: "Apr 19", retention: 40 },
    ],
  },
]

const mockStats: UserStats = {
  streak: 7,
  totalSessions: 34,
  totalHoursStudied: 48,
  nextExamDate: "2026-05-12",
  nextExamLabel: "Biology Final",
}

export function getSubjects(): Subject[] { return mockSubjects }
export function getTopics(): Topic[] { return mockTopics }
export function getDueTopics(): Topic[] {
  const today = "2026-04-19"
  return mockTopics.filter((t) => t.dueDate <= today)
}
export function getSubjectById(id: string): Subject | undefined {
  return mockSubjects.find((s) => s.id === id)
}

function generateStudyHistory(): StudyDay[] {
  const days: StudyDay[] = []
  const start = new Date("2025-01-01")
  const end   = new Date("2026-04-19")
  const pattern = [45, 0, 60, 30, 0, 90, 45, 0, 0, 75, 60, 0, 45, 30, 90, 0, 60, 45, 0, 30, 75, 0, 45, 0, 60, 30, 0, 60]
  let i = 0
  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push({ date: d.toISOString().split("T")[0], minutesStudied: pattern[i % pattern.length] })
    i++
  }
  return days
}

const mockStudyHistory = generateStudyHistory()

const mockUpcomingSessions: ScheduledSession[] = [
  { id: "sess1", scheduledFor: "2026-04-19T18:00:00", subjects: ["Biology", "Chemistry"],   topics: ["Cell Division", "Organic Chemistry", "Thermodynamics"],  estimatedMinutes: 60 },
  { id: "sess2", scheduledFor: "2026-04-20T09:00:00", subjects: ["Mathematics"],            topics: ["Derivatives", "Integration"],                            estimatedMinutes: 45 },
  { id: "sess3", scheduledFor: "2026-04-21T17:30:00", subjects: ["Physics"],                topics: ["Quantum Mechanics", "Electromagnetism"],                 estimatedMinutes: 30 },
  { id: "sess4", scheduledFor: "2026-04-22T10:00:00", subjects: ["Computer Science"],       topics: ["Algorithms", "Machine Learning"],                        estimatedMinutes: 50 },
]

export function getUserStats(): UserStats { return mockStats }
export function getRetentionData(): TopicRetention[] { return mockRetention }
export function getStudyHistory(): StudyDay[] { return mockStudyHistory }
export function getUpcomingSessions(): ScheduledSession[] { return mockUpcomingSessions }
