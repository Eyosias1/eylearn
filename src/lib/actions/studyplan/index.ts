"use server"

import { revalidatePath } from "next/cache"
import { getAuthenticatedSupabase } from "@/lib/supabase/auth"

export async function getSubtopicsByTopic(topicId: string): Promise<{ id: string; name: string }[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("subtopics")
    .select("id, name")
    .eq("topic_id", topicId)
    .order("name")
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function deleteScheduledStudy(id: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("scheduled_study").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/plan")
}

export async function updateScheduledStudy(
  id: string,
  payload: {
    title: string
    subtopicId: string | null
    startTime: string
    durationMinutes: number
    scheduledDate?: string
  }
): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase
    .from("scheduled_study")
    .update({
      title:            payload.title || null,
      subtopic_id:      payload.subtopicId,
      start_time:       payload.startTime,
      duration_minutes: payload.durationMinutes,
      ...(payload.scheduledDate && { scheduled_date: payload.scheduledDate }),
    })
    .eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/plan")
}
