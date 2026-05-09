import 'server-only'
import { getAuthenticatedSupabase } from "@/lib/supabase/auth"
import type { CalendarEvent, PlanEvent, PlanTopic } from "@/types/studyplan"

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const { supabase } = await getAuthenticatedSupabase()

  const { data, error } = await supabase
    .from("calendar_events")
    .select("id, title, scheduled_date, start_time, duration_minutes, source")
    .order("scheduled_date")
    .order("start_time")

  if (error) throw new Error(error.message)

  return (data ?? []).map(row => ({
    id:              row.id,
    title:           row.title,
    scheduledDate:   row.scheduled_date,
    startTime:       row.start_time.slice(0, 5),
    durationMinutes: row.duration_minutes,
    source:          row.source as CalendarEvent["source"],
  }))
}

export async function getPlanEvents(): Promise<PlanEvent[]> {
  const { supabase } = await getAuthenticatedSupabase()

  const { data, error } = await supabase
    .from("scheduled_study")
    .select(`
      id, scheduled_date, start_time, duration_minutes, title, subtopic_id,
      subtopics ( id, name, leitner_box, topics ( id, name, subjects ( id, name, color ) ) )
    `)
    .order("scheduled_date")
    .order("start_time")

  if (error) throw new Error(error.message)

  const grouped = new Map<string, PlanTopic[]>()

  type SubjectJoin  = { id: string; name: string; color: string }
  type TopicJoin    = { id: string; name: string; subjects: SubjectJoin | null }
  type SubtopicJoin = { id: string; name: string; leitner_box: number; topics: TopicJoin | null } | null

  for (const row of data ?? []) {
    const sub     = row.subtopics as SubtopicJoin
    const topic   = sub?.topics
    const subject = topic?.subjects

    const planTopic: PlanTopic = {
      id:              row.id,
      subtopicId:      row.subtopic_id ?? null,
      topicId:         topic?.id ?? null,
      subjectId:       subject?.id ?? null,
      name:            row.title ?? sub?.name ?? "Untitled",
      topicName:       topic?.name ?? "",
      subject:         subject?.name ?? "",
      subjectColor:    subject?.color ?? "bg-slate-400",
      box:             (sub?.leitner_box ?? 1) as 1 | 2 | 3 | 4 | 5,
      startTime:       row.start_time.slice(0, 5),
      durationMinutes: row.duration_minutes,
      lastSessions:    [],
      todayProgress:   null,
    }

    const date = row.scheduled_date
    const existing = grouped.get(date) ?? []
    existing.push(planTopic)
    grouped.set(date, existing)
  }

  return Array.from(grouped.entries()).map(([date, topics]) => ({ date, topics }))
}
