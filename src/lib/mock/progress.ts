import type {
  DueCard,
  LeitnerCard,
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
  const todayYear = 2026
  const todayMonth = 3 // April (0-indexed)
  const todayDay = 21
  const pad = (n: number) => String(n).padStart(2, "0")
  const localDateStr = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`

  const daysInYear = 365
  const heatmap = Array.from({ length: daysInYear }, (_, i) => {
    const d = new Date(todayYear, 0, 1 + i)
    const y = d.getFullYear()
    const m = d.getMonth()
    const day = d.getDate()
    const dateStr = localDateStr(y, m, day)
    const isPast = y < todayYear || (y === todayYear && (m < todayMonth || (m === todayMonth && day <= todayDay)))
    if (!isPast) return { date: dateStr, intensity: 0, successRate: 0 }
    const pattern = [0.8,0,0.6,0.9,0.4,0,0.7,0.5,0,0.8,0.6,0,0.4,0.3,0.9]
    const intensity = pattern[i % pattern.length]
    return { date: dateStr, intensity, successRate: intensity > 0 ? 0.5 + intensity * 0.4 : 0 }
  })

  const theoretical = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    retention: Math.round(100 * Math.exp(-0.1 * i)),
  }))
  // fixed noise per day so the curve looks organic but is deterministic
  const noise = [0.12,0.08,0.19,0.05,0.15,0.11,0.17,0.03,0.14,0.09,0.18,0.06,0.13,0.16,0.07,0.10,0.04,0.12,0.19,0.08,0.15,0.11,0.05,0.17,0.09,0.14,0.03,0.18,0.06,0.13,0.07]
  const actual = theoretical.map(({ day, retention }) => ({
    day,
    retention: Math.min(100, Math.round(retention * (1.1 + noise[day]))),
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
      {
        mode: "Spaced Review", masteryGainPerHour: 18.5, usagePercent: 42, trend: "up",
        bySubject: [
          { subject: "Biology", score: 91, topics: [
            { topic: "Cell Biology", score: 88, subtopics: [{ subtopic: "Mitosis", score: 94 }, { subtopic: "Meiosis", score: 82 }] },
            { topic: "Genetics",     score: 94, subtopics: [{ subtopic: "DNA Replication", score: 96 }, { subtopic: "Gene Expression", score: 91 }] },
          ]},
          { subject: "Chemistry", score: 88, topics: [
            { topic: "Organic",   score: 85, subtopics: [{ subtopic: "Alkenes", score: 88 }, { subtopic: "Aldehydes", score: 82 }] },
            { topic: "Acid-Base", score: 91, subtopics: [{ subtopic: "pH Scale", score: 93 }, { subtopic: "Buffers", score: 89 }] },
          ]},
          { subject: "Physics", score: 79, topics: [
            { topic: "Mechanics",       score: 82, subtopics: [{ subtopic: "Newton's Laws", score: 85 }, { subtopic: "Momentum", score: 79 }] },
            { topic: "Electromagnetism",score: 76, subtopics: [{ subtopic: "Coulomb's Law", score: 78 }, { subtopic: "Faraday's Law", score: 74 }] },
          ]},
          { subject: "Mathematics", score: 74, topics: [
            { topic: "Calculus",      score: 78, subtopics: [{ subtopic: "Derivatives", score: 82 }, { subtopic: "Integration", score: 74 }] },
            { topic: "Linear Algebra",score: 70, subtopics: [{ subtopic: "Matrices", score: 72 }, { subtopic: "Eigenvalues", score: 68 }] },
          ]},
        ],
        history: [{ week: "W1", score: 14 }, { week: "W2", score: 15 }, { week: "W3", score: 17 }, { week: "W4", score: 18.5 }],
      },
      {
        mode: "Feynman Mode", masteryGainPerHour: 14.2, usagePercent: 21, trend: "up",
        bySubject: [
          { subject: "Physics", score: 94, topics: [
            { topic: "Mechanics",       score: 96, subtopics: [{ subtopic: "Newton's Laws", score: 98 }, { subtopic: "Momentum", score: 94 }] },
            { topic: "Electromagnetism",score: 92, subtopics: [{ subtopic: "Coulomb's Law", score: 93 }, { subtopic: "Faraday's Law", score: 91 }] },
          ]},
          { subject: "Biology", score: 82, topics: [
            { topic: "Cell Biology", score: 80, subtopics: [{ subtopic: "Mitosis", score: 84 }, { subtopic: "Meiosis", score: 76 }] },
            { topic: "Genetics",     score: 84, subtopics: [{ subtopic: "DNA Replication", score: 86 }, { subtopic: "Gene Expression", score: 82 }] },
          ]},
          { subject: "Chemistry", score: 71, topics: [
            { topic: "Organic",   score: 68, subtopics: [{ subtopic: "Alkenes", score: 70 }, { subtopic: "Aldehydes", score: 66 }] },
            { topic: "Acid-Base", score: 74, subtopics: [{ subtopic: "pH Scale", score: 76 }, { subtopic: "Buffers", score: 72 }] },
          ]},
          { subject: "Mathematics", score: 68, topics: [
            { topic: "Calculus",      score: 72, subtopics: [{ subtopic: "Derivatives", score: 74 }, { subtopic: "Integration", score: 70 }] },
            { topic: "Linear Algebra",score: 64, subtopics: [{ subtopic: "Matrices", score: 66 }, { subtopic: "Eigenvalues", score: 62 }] },
          ]},
        ],
        history: [{ week: "W1", score: 11 }, { week: "W2", score: 12 }, { week: "W3", score: 13 }, { week: "W4", score: 14.2 }],
      },
      {
        mode: "Blurting Mode", masteryGainPerHour: 11.8, usagePercent: 14, trend: "flat",
        bySubject: [
          { subject: "Chemistry", score: 85, topics: [
            { topic: "Organic",   score: 82, subtopics: [{ subtopic: "Alkenes", score: 85 }, { subtopic: "Aldehydes", score: 79 }] },
            { topic: "Acid-Base", score: 88, subtopics: [{ subtopic: "pH Scale", score: 90 }, { subtopic: "Buffers", score: 86 }] },
          ]},
          { subject: "Biology", score: 78, topics: [
            { topic: "Cell Biology", score: 76, subtopics: [{ subtopic: "Mitosis", score: 80 }, { subtopic: "Meiosis", score: 72 }] },
            { topic: "Genetics",     score: 80, subtopics: [{ subtopic: "DNA Replication", score: 82 }, { subtopic: "Gene Expression", score: 78 }] },
          ]},
          { subject: "Physics", score: 70, topics: [
            { topic: "Mechanics",       score: 72, subtopics: [{ subtopic: "Newton's Laws", score: 75 }, { subtopic: "Momentum", score: 69 }] },
            { topic: "Electromagnetism",score: 68, subtopics: [{ subtopic: "Coulomb's Law", score: 70 }, { subtopic: "Faraday's Law", score: 66 }] },
          ]},
          { subject: "Mathematics", score: 61, topics: [
            { topic: "Calculus",      score: 64, subtopics: [{ subtopic: "Derivatives", score: 66 }, { subtopic: "Integration", score: 62 }] },
            { topic: "Linear Algebra",score: 58, subtopics: [{ subtopic: "Matrices", score: 60 }, { subtopic: "Eigenvalues", score: 56 }] },
          ]},
        ],
        history: [{ week: "W1", score: 11 }, { week: "W2", score: 12 }, { week: "W3", score: 11 }, { week: "W4", score: 11.8 }],
      },
      {
        mode: "Immediate Review", masteryGainPerHour: 10.3, usagePercent: 11, trend: "flat",
        bySubject: [
          { subject: "Mathematics", score: 88, topics: [
            { topic: "Calculus",      score: 90, subtopics: [{ subtopic: "Derivatives", score: 92 }, { subtopic: "Integration", score: 88 }] },
            { topic: "Linear Algebra",score: 86, subtopics: [{ subtopic: "Matrices", score: 88 }, { subtopic: "Eigenvalues", score: 84 }] },
          ]},
          { subject: "Physics", score: 76, topics: [
            { topic: "Mechanics",       score: 78, subtopics: [{ subtopic: "Newton's Laws", score: 80 }, { subtopic: "Momentum", score: 76 }] },
            { topic: "Electromagnetism",score: 74, subtopics: [{ subtopic: "Coulomb's Law", score: 76 }, { subtopic: "Faraday's Law", score: 72 }] },
          ]},
          { subject: "Biology", score: 69, topics: [
            { topic: "Cell Biology", score: 67, subtopics: [{ subtopic: "Mitosis", score: 70 }, { subtopic: "Meiosis", score: 64 }] },
            { topic: "Genetics",     score: 71, subtopics: [{ subtopic: "DNA Replication", score: 74 }, { subtopic: "Gene Expression", score: 68 }] },
          ]},
          { subject: "Chemistry", score: 65, topics: [
            { topic: "Organic",   score: 62, subtopics: [{ subtopic: "Alkenes", score: 64 }, { subtopic: "Aldehydes", score: 60 }] },
            { topic: "Acid-Base", score: 68, subtopics: [{ subtopic: "pH Scale", score: 70 }, { subtopic: "Buffers", score: 66 }] },
          ]},
        ],
        history: [{ week: "W1", score: 10 }, { week: "W2", score: 10 }, { week: "W3", score: 11 }, { week: "W4", score: 10.3 }],
      },
      {
        mode: "Exam Simulation", masteryGainPerHour: 9.4, usagePercent: 7, trend: "up",
        bySubject: [
          { subject: "Chemistry", score: 80, topics: [
            { topic: "Organic",   score: 78, subtopics: [{ subtopic: "Alkenes", score: 80 }, { subtopic: "Aldehydes", score: 76 }] },
            { topic: "Acid-Base", score: 82, subtopics: [{ subtopic: "pH Scale", score: 84 }, { subtopic: "Buffers", score: 80 }] },
          ]},
          { subject: "Mathematics", score: 77, topics: [
            { topic: "Calculus",      score: 80, subtopics: [{ subtopic: "Derivatives", score: 82 }, { subtopic: "Integration", score: 78 }] },
            { topic: "Linear Algebra",score: 74, subtopics: [{ subtopic: "Matrices", score: 76 }, { subtopic: "Eigenvalues", score: 72 }] },
          ]},
          { subject: "Physics", score: 72, topics: [
            { topic: "Mechanics",       score: 74, subtopics: [{ subtopic: "Newton's Laws", score: 76 }, { subtopic: "Momentum", score: 72 }] },
            { topic: "Electromagnetism",score: 70, subtopics: [{ subtopic: "Coulomb's Law", score: 72 }, { subtopic: "Faraday's Law", score: 68 }] },
          ]},
          { subject: "Biology", score: 66, topics: [
            { topic: "Cell Biology", score: 64, subtopics: [{ subtopic: "Mitosis", score: 68 }, { subtopic: "Meiosis", score: 60 }] },
            { topic: "Genetics",     score: 68, subtopics: [{ subtopic: "DNA Replication", score: 70 }, { subtopic: "Gene Expression", score: 66 }] },
          ]},
        ],
        history: [{ week: "W1", score: 7 }, { week: "W2", score: 8 }, { week: "W3", score: 9 }, { week: "W4", score: 9.4 }],
      },
      {
        mode: "End of Day Review", masteryGainPerHour: 8.7, usagePercent: 3, trend: "down",
        bySubject: [
          { subject: "Biology", score: 74, topics: [
            { topic: "Cell Biology", score: 72, subtopics: [{ subtopic: "Mitosis", score: 76 }, { subtopic: "Meiosis", score: 68 }] },
            { topic: "Genetics",     score: 76, subtopics: [{ subtopic: "DNA Replication", score: 78 }, { subtopic: "Gene Expression", score: 74 }] },
          ]},
          { subject: "Chemistry", score: 70, topics: [
            { topic: "Organic",   score: 68, subtopics: [{ subtopic: "Alkenes", score: 70 }, { subtopic: "Aldehydes", score: 66 }] },
            { topic: "Acid-Base", score: 72, subtopics: [{ subtopic: "pH Scale", score: 74 }, { subtopic: "Buffers", score: 70 }] },
          ]},
          { subject: "Physics", score: 65, topics: [
            { topic: "Mechanics",       score: 67, subtopics: [{ subtopic: "Newton's Laws", score: 70 }, { subtopic: "Momentum", score: 64 }] },
            { topic: "Electromagnetism",score: 63, subtopics: [{ subtopic: "Coulomb's Law", score: 65 }, { subtopic: "Faraday's Law", score: 61 }] },
          ]},
          { subject: "Mathematics", score: 58, topics: [
            { topic: "Calculus",      score: 60, subtopics: [{ subtopic: "Derivatives", score: 62 }, { subtopic: "Integration", score: 58 }] },
            { topic: "Linear Algebra",score: 56, subtopics: [{ subtopic: "Matrices", score: 58 }, { subtopic: "Eigenvalues", score: 54 }] },
          ]},
        ],
        history: [{ week: "W1", score: 10 }, { week: "W2", score: 9 }, { week: "W3", score: 9 }, { week: "W4", score: 8.7 }],
      },
      {
        mode: "Pre-Test", masteryGainPerHour: 6.2, usagePercent: 2, trend: "flat",
        bySubject: [
          { subject: "Physics", score: 68, topics: [
            { topic: "Mechanics",       score: 70, subtopics: [{ subtopic: "Newton's Laws", score: 72 }, { subtopic: "Momentum", score: 68 }] },
            { topic: "Electromagnetism",score: 66, subtopics: [{ subtopic: "Coulomb's Law", score: 68 }, { subtopic: "Faraday's Law", score: 64 }] },
          ]},
          { subject: "Biology", score: 62, topics: [
            { topic: "Cell Biology", score: 60, subtopics: [{ subtopic: "Mitosis", score: 64 }, { subtopic: "Meiosis", score: 56 }] },
            { topic: "Genetics",     score: 64, subtopics: [{ subtopic: "DNA Replication", score: 66 }, { subtopic: "Gene Expression", score: 62 }] },
          ]},
          { subject: "Chemistry", score: 59, topics: [
            { topic: "Organic",   score: 57, subtopics: [{ subtopic: "Alkenes", score: 59 }, { subtopic: "Aldehydes", score: 55 }] },
            { topic: "Acid-Base", score: 61, subtopics: [{ subtopic: "pH Scale", score: 63 }, { subtopic: "Buffers", score: 59 }] },
          ]},
          { subject: "Mathematics", score: 55, topics: [
            { topic: "Calculus",      score: 57, subtopics: [{ subtopic: "Derivatives", score: 59 }, { subtopic: "Integration", score: 55 }] },
            { topic: "Linear Algebra",score: 53, subtopics: [{ subtopic: "Matrices", score: 55 }, { subtopic: "Eigenvalues", score: 51 }] },
          ]},
        ],
        history: [{ week: "W1", score: 6 }, { week: "W2", score: 6 }, { week: "W3", score: 6 }, { week: "W4", score: 6.2 }],
      },
    ],
    aiInsight: "Spaced Repetition continues to show the highest ROI for long-term retention. Consider increasing Feynman sessions for conceptual subjects.",
  }
}
