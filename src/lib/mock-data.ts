import type { Subject, Topic, UserStats, TopicRetention } from "@/types/study"

const mockSubjects: Subject[] = [
  { id: "s1", name: "Biology" },
  { id: "s2", name: "Chemistry" },
  { id: "s3", name: "Mathematics" },
]

const mockTopics: Topic[] = [
  { id: "t1", name: "Cell Division", subjectId: "s1", health: "red", retentionScore: 28, intervalDays: 1, lastReviewedAt: "2026-04-17", dueDate: "2026-04-18" },
  { id: "t2", name: "Photosynthesis", subjectId: "s1", health: "yellow", retentionScore: 61, intervalDays: 3, lastReviewedAt: "2026-04-16", dueDate: "2026-04-19" },
  { id: "t3", name: "Organic Chemistry", subjectId: "s2", health: "red", retentionScore: 35, intervalDays: 1, lastReviewedAt: "2026-04-18", dueDate: "2026-04-19" },
  { id: "t4", name: "Acid-Base Reactions", subjectId: "s2", health: "green", retentionScore: 88, intervalDays: 8, lastReviewedAt: "2026-04-11", dueDate: "2026-04-23" },
  { id: "t5", name: "Derivatives", subjectId: "s3", health: "yellow", retentionScore: 54, intervalDays: 2, lastReviewedAt: "2026-04-17", dueDate: "2026-04-19" },
  { id: "t6", name: "Integration", subjectId: "s3", health: "green", retentionScore: 82, intervalDays: 7, lastReviewedAt: "2026-04-12", dueDate: "2026-04-26" },
  { id: "t7", name: "DNA Replication", subjectId: "s1", health: "green", retentionScore: 79, intervalDays: 6, lastReviewedAt: "2026-04-13", dueDate: "2026-04-25" },
  { id: "t8", name: "Thermodynamics", subjectId: "s2", health: "yellow", retentionScore: 47, intervalDays: 2, lastReviewedAt: "2026-04-17", dueDate: "2026-04-19" },
]

const mockRetention: TopicRetention[] = [
  {
    topicId: "t1",
    topicName: "Cell Division",
    history: [
      { date: "Apr 13", retention: 100 },
      { date: "Apr 14", retention: 82 },
      { date: "Apr 15", retention: 66 },
      { date: "Apr 16", retention: 51 },
      { date: "Apr 17", retention: 38 },
      { date: "Apr 18", retention: 28 },
      { date: "Apr 19", retention: 20 },
    ],
  },
  {
    topicId: "t2",
    topicName: "Photosynthesis",
    history: [
      { date: "Apr 13", retention: 100 },
      { date: "Apr 14", retention: 90 },
      { date: "Apr 15", retention: 80 },
      { date: "Apr 16", retention: 71 },
      { date: "Apr 17", retention: 61 },
      { date: "Apr 18", retention: 55 },
      { date: "Apr 19", retention: 48 },
    ],
  },
  {
    topicId: "t5",
    topicName: "Derivatives",
    history: [
      { date: "Apr 13", retention: 100 },
      { date: "Apr 14", retention: 86 },
      { date: "Apr 15", retention: 74 },
      { date: "Apr 16", retention: 64 },
      { date: "Apr 17", retention: 54 },
      { date: "Apr 18", retention: 47 },
      { date: "Apr 19", retention: 40 },
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

export function getSubjects(): Subject[] {
  return mockSubjects
}

export function getTopics(): Topic[] {
  return mockTopics
}

export function getDueTopics(): Topic[] {
  const today = "2026-04-19"
  return mockTopics.filter((t) => t.dueDate <= today)
}

export function getSubjectById(id: string): Subject | undefined {
  return mockSubjects.find((s) => s.id === id)
}

export function getUserStats(): UserStats {
  return mockStats
}

export function getRetentionData(): TopicRetention[] {
  return mockRetention
}
