import type {
  DueCard,
  LeitnerCard,
  RetroTopic,
  ProspectiveDay,
  SessionRecord,
  AnalyticsData,
} from "@/types/progress"

export async function getDueCards(): Promise<DueCard[]> {
  return [
    { id: "d1", topic: "Quantum Electrodynamics", subject: "Physics",        subjectColor: "bg-blue-500",    isLate: true,  box: 1, lastReviewed: "2 days ago", confidenceHistory: ["poor","poor","partial","poor","poor"] },
    { id: "d2", topic: "Epigenetic Markers",       subject: "Biology",        subjectColor: "bg-emerald-500", isLate: true,  box: 1, lastReviewed: "3 days ago", confidenceHistory: ["poor","partial","poor","poor","partial"] },
    { id: "d3", topic: "Cognitive Biases",         subject: "Psychology",     subjectColor: "bg-violet-500",  isLate: true,  box: 2, lastReviewed: "1 day ago",  confidenceHistory: ["partial","partial","poor","partial","poor"] },
    { id: "d4", topic: "Beta Blockers",            subject: "Pharmacology",   subjectColor: "bg-orange-500",  isLate: false, box: 2, lastReviewed: "Today",      confidenceHistory: ["strong","partial","strong","strong","partial"] },
    { id: "d5", topic: "Zeigarnik Effect",         subject: "Psychology",     subjectColor: "bg-violet-500",  isLate: false, box: 1, lastReviewed: "Yesterday",  confidenceHistory: ["poor","partial","partial","poor","partial"] },
  ]
}

export async function getLeitnerCards(): Promise<LeitnerCard[]> {
  return [
    { id: "l1",  topic: "Cell Division",          subject: "Biology",      subjectColor: "bg-emerald-500", box: 1, lastReviewed: "2026-04-19" },
    { id: "l2",  topic: "Quantum Mechanics",       subject: "Physics",      subjectColor: "bg-blue-500",    box: 1, lastReviewed: "2026-04-19" },
    { id: "l3",  topic: "Organic Chemistry",       subject: "Chemistry",    subjectColor: "bg-yellow-500",  box: 1, lastReviewed: "2026-04-19" },
    { id: "l4",  topic: "Renaissance",             subject: "History",      subjectColor: "bg-rose-500",    box: 1, lastReviewed: "2026-04-19" },
    { id: "l5",  topic: "Cognitive Biases",        subject: "Psychology",   subjectColor: "bg-violet-500",  box: 1, lastReviewed: "2026-04-18" },
    { id: "l6",  topic: "Differential Equations",  subject: "Mathematics",  subjectColor: "bg-sky-500",     box: 1, lastReviewed: "2026-04-18" },
    { id: "l7",  topic: "Photosynthesis",          subject: "Biology",      subjectColor: "bg-emerald-500", box: 2, lastReviewed: "2026-04-16" },
    { id: "l8",  topic: "Thermodynamics",          subject: "Chemistry",    subjectColor: "bg-yellow-500",  box: 2, lastReviewed: "2026-04-17" },
    { id: "l9",  topic: "Electromagnetism",        subject: "Physics",      subjectColor: "bg-blue-500",    box: 2, lastReviewed: "2026-04-16" },
    { id: "l10", topic: "Linear Algebra",          subject: "Mathematics",  subjectColor: "bg-sky-500",     box: 2, lastReviewed: "2026-04-16" },
    { id: "l11", topic: "Operating Systems",       subject: "CS",           subjectColor: "bg-pink-500",    box: 2, lastReviewed: "2026-04-16" },
    { id: "l12", topic: "Cold War",                subject: "History",      subjectColor: "bg-rose-500",    box: 2, lastReviewed: "2026-04-15" },
    { id: "l13", topic: "Derivatives",             subject: "Mathematics",  subjectColor: "bg-sky-500",     box: 2, lastReviewed: "2026-04-17" },
    { id: "l14", topic: "Natural Selection",       subject: "Biology",      subjectColor: "bg-emerald-500", box: 3, lastReviewed: "2026-04-13" },
    { id: "l15", topic: "Acid-Base Reactions",     subject: "Chemistry",    subjectColor: "bg-yellow-500",  box: 3, lastReviewed: "2026-04-12" },
    { id: "l16", topic: "Newtonian Mechanics",     subject: "Physics",      subjectColor: "bg-blue-500",    box: 3, lastReviewed: "2026-04-11" },
    { id: "l17", topic: "Algorithms",              subject: "CS",           subjectColor: "bg-pink-500",    box: 3, lastReviewed: "2026-04-10" },
    { id: "l18", topic: "Probability",             subject: "Mathematics",  subjectColor: "bg-sky-500",     box: 3, lastReviewed: "2026-04-13" },
    { id: "l19", topic: "DNA Replication",         subject: "Biology",      subjectColor: "bg-emerald-500", box: 3, lastReviewed: "2026-04-13" },
    { id: "l20", topic: "Wave Optics",             subject: "Physics",      subjectColor: "bg-blue-500",    box: 3, lastReviewed: "2026-04-13" },
    { id: "l21", topic: "Integration",             subject: "Mathematics",  subjectColor: "bg-sky-500",     box: 4, lastReviewed: "2026-04-12" },
    { id: "l22", topic: "Data Structures",         subject: "CS",           subjectColor: "bg-pink-500",    box: 4, lastReviewed: "2026-04-11" },
    { id: "l23", topic: "Industrial Revolution",   subject: "History",      subjectColor: "bg-rose-500",    box: 4, lastReviewed: "2026-04-12" },
    { id: "l24", topic: "Electron Configuration",  subject: "Chemistry",    subjectColor: "bg-yellow-500",  box: 4, lastReviewed: "2026-04-11" },
    { id: "l25", topic: "World War II",            subject: "History",      subjectColor: "bg-rose-500",    box: 5, lastReviewed: "2026-04-09" },
    { id: "l26", topic: "Acid-Base Equilibrium",   subject: "Chemistry",    subjectColor: "bg-yellow-500",  box: 5, lastReviewed: "2026-04-08" },
    { id: "l27", topic: "Binary Search",           subject: "CS",           subjectColor: "bg-pink-500",    box: 5, lastReviewed: "2026-04-07" },
    { id: "l28", topic: "Newton's Laws",           subject: "Physics",      subjectColor: "bg-blue-500",    box: 5, lastReviewed: "2026-04-06" },
    { id: "l29", topic: "Cell Membrane",           subject: "Biology",      subjectColor: "bg-emerald-500", box: 5, lastReviewed: "2026-04-05" },
  ]
}

export async function getRetroTopics(): Promise<RetroTopic[]> {
  const ratings = ["strong", "partial", "poor", null] as const
  const topics = [
    { topic: "Cell Division",      subject: "Biology"     },
    { topic: "Quantum Mechanics",  subject: "Physics"     },
    { topic: "Organic Chemistry",  subject: "Chemistry"   },
    { topic: "Derivatives",        subject: "Mathematics" },
    { topic: "Algorithms",         subject: "CS"          },
    { topic: "Natural Selection",  subject: "Biology"     },
  ]
  const patterns: (typeof ratings[number])[][] = [
    ["poor","poor","partial","poor","partial","poor","partial","poor","partial","partial","partial","partial","poor","partial","poor"],
    ["poor","partial","poor","poor","partial","partial","poor","partial","partial","partial","strong","partial","partial","strong","strong"],
    ["partial","partial","poor","partial","partial","partial","partial","strong","partial","strong","strong","strong","strong","strong","strong"],
    ["partial","partial","partial","strong","partial","strong","strong","strong","strong","strong","strong","strong","strong","strong","strong"],
    [null,null,"poor","partial","partial","partial","strong","partial","strong","strong","strong","strong","strong","strong","strong"],
    ["poor","partial","poor","partial","poor","partial","partial","partial","poor","partial","partial","poor","partial","partial","partial"],
  ]
  const today = new Date("2026-04-21")
  const dates = Array.from({ length: 15 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (14 - i))
    return d.toISOString().split("T")[0]
  })
  return topics.map((t, i) => ({
    ...t,
    sessions: dates.map((date, j) => ({ date, rating: patterns[i][j] ?? null })),
  }))
}

export async function getProspectiveDays(): Promise<ProspectiveDay[]> {
  return [
    { date: "2026-04-22", topics: [
      { name: "Photosynthesis",    subject: "Biology",    subjectColor: "bg-emerald-500", box: 2 },
      { name: "Thermodynamics",    subject: "Chemistry",  subjectColor: "bg-yellow-500",  box: 2 },
    ]},
    { date: "2026-04-24", topics: [
      { name: "Electromagnetism",  subject: "Physics",    subjectColor: "bg-blue-500",    box: 2 },
      { name: "Linear Algebra",    subject: "Mathematics",subjectColor: "bg-sky-500",     box: 2 },
      { name: "Operating Systems", subject: "CS",         subjectColor: "bg-pink-500",    box: 2 },
    ]},
    { date: "2026-04-26", topics: [
      { name: "Integration",       subject: "Mathematics",subjectColor: "bg-sky-500",     box: 4 },
    ]},
    { date: "2026-04-28", topics: [
      { name: "Data Structures",   subject: "CS",         subjectColor: "bg-pink-500",    box: 4 },
      { name: "Industrial Revolution", subject: "History",subjectColor: "bg-rose-500",    box: 4 },
    ]},
  ]
}

export async function getSessionHistory(): Promise<SessionRecord[]> {
  return [
    { id: "s1", date: "2026-04-21", mode: "Active Recall",    subjects: ["Biology"],       durationMinutes: 42, cardsReviewed: 84,  avgConfidence: 72 },
    { id: "s2", date: "2026-04-20", mode: "Spaced Repetition",subjects: ["Chemistry"],     durationMinutes: 18, cardsReviewed: 32,  avgConfidence: 88 },
    { id: "s3", date: "2026-04-19", mode: "Feynman",          subjects: ["Physics"],       durationMinutes: 35, cardsReviewed: 12,  avgConfidence: 65 },
    { id: "s4", date: "2026-04-18", mode: "Blurting",         subjects: ["Mathematics"],   durationMinutes: 28, cardsReviewed: 18,  avgConfidence: 80 },
    { id: "s5", date: "2026-04-17", mode: "Active Recall",    subjects: ["CS", "History"], durationMinutes: 55, cardsReviewed: 104, avgConfidence: 91 },
  ]
}

export async function getAnalytics(): Promise<AnalyticsData> {
  const today = new Date("2026-04-21")
  const heatmap = Array.from({ length: 365 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (364 - i))
    const pattern = [0.8,0,0.6,0.9,0.4,0,0.7,0.5,0,0.8,0.6,0,0.4,0.3,0.9]
    const intensity = pattern[i % pattern.length]
    return { date: d.toISOString().split("T")[0], intensity, successRate: intensity > 0 ? 0.5 + intensity * 0.4 : 0 }
  })

  const theoretical = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    retention: Math.round(100 * Math.exp(-0.1 * i)),
  }))
  const actual = theoretical.map(({ day, retention }) => ({
    day,
    retention: Math.min(100, Math.round(retention * (1.1 + Math.random() * 0.2))),
  }))

  return {
    heatmap,
    consecutiveDays: 124,
    masteryBySubject: [
      { name: "Organic Chemistry", masteryPercent: 88 },
      { name: "Neuroscience",      masteryPercent: 74 },
      { name: "Statistical Models",masteryPercent: 91 },
      { name: "Physics",           masteryPercent: 67 },
    ],
    retentionCurve: { theoretical, actual },
    techniqueEfficiency: [
      { mode: "Spaced Repetition", masteryGainPerHour: 18.5 },
      { mode: "Feynman Technique", masteryGainPerHour: 14.2 },
      { mode: "Blurting",          masteryGainPerHour: 11.8 },
      { mode: "Active Recall",     masteryGainPerHour: 9.4  },
    ],
    aiInsight: "Spaced Repetition continues to show the highest ROI for long-term retention. Consider increasing Feynman sessions for conceptual subjects.",
  }
}
