import { getAuthenticatedSupabase } from "@/lib/supabase/auth"
import type { RetroTopic, RetroSubjectGroup } from "@/types/progress"

export async function getRetroTopics(): Promise<RetroTopic[]> {
  const { supabase } = await getAuthenticatedSupabase()

  const { data, error } = await supabase
    .from("subtopics")
    .select(`
      id,
      name,
      leitner_box,
      last_reviewed_at,
      topics (
        name,
        subjects ( name )
      ),
      review_sessions (
        date,
        mode,
        actual_duration_minutes,
        round1_avg_confidence,
        overall_rating
      )
    `)
    .eq("leitner_active", true)
    .order("date", { referencedTable: "review_sessions", ascending: true })

  if (error) throw new Error(error.message)
  if (!data) return []

  return data.map((row) => {
    const topic  = Array.isArray(row.topics) ? row.topics[0] : row.topics
    const subject = Array.isArray(topic?.subjects) ? topic.subjects[0] : topic?.subjects

    return {
      subtopic:   row.name,
      topic:      topic?.name ?? "",
      subject:    subject?.name ?? "",
      box:        (row.leitner_box ?? 1) as 1 | 2 | 3 | 4 | 5,
      lastReview: row.last_reviewed_at?.split("T")[0] ?? "",
      sessions:   (row.review_sessions ?? []).map((s) => ({
        date:       s.date,
        rating:     (s.overall_rating ?? null) as "strong" | "partial" | "poor" | null,
        mode:       s.mode ?? undefined,
        duration:   s.actual_duration_minutes ?? undefined,
        confidence: s.round1_avg_confidence ?? undefined,
      })),
    }
  })
}

function computeHealthScore(topics: RetroTopic[]): number {
  const ratingWeight = { strong: 100, partial: 50, poor: 0 }
  let total = 0, count = 0
  for (const t of topics) {
    for (const s of t.sessions) {
      if (s.rating !== null) {
        total += ratingWeight[s.rating]
        count++
      }
    }
  }
  return count === 0 ? 0 : Math.round(total / count)
}

function lastStudiedDate(topics: RetroTopic[]): string {
  let latest = ""
  for (const t of topics) {
    for (const s of t.sessions) {
      if (s.rating !== null && s.date > latest) latest = s.date
    }
  }
  return latest
}

export async function getRetroSubjectGroups(): Promise<RetroSubjectGroup[]> {
  const topics = await getRetroTopics()
  const map = new Map<string, RetroTopic[]>()
  for (const t of topics) {
    if (!map.has(t.subject)) map.set(t.subject, [])
    map.get(t.subject)!.push(t)
  }
  const groups: RetroSubjectGroup[] = Array.from(map.entries()).map(([subject, subjectTopics]) => ({
    subject,
    topics: subjectTopics,
    healthScore: computeHealthScore(subjectTopics),
    lastStudied: lastStudiedDate(subjectTopics),
  }))
  groups.sort((a, b) => b.lastStudied.localeCompare(a.lastStudied))
  return groups
}
