"use server"

import { revalidatePath } from "next/cache"
import { getAuthenticatedSupabase } from "@/lib/supabase/auth"
import type { CalendarEventInsert } from "@/types/studyplan"

export async function createCalendarEvent(payload: {
  title: string
  scheduledDate: string
  startTime: string
  durationMinutes: number
}): Promise<void> {
  const { supabase, userId } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("calendar_events").insert({
    user_id:          userId,
    title:            payload.title,
    scheduled_date:   payload.scheduledDate,
    start_time:       payload.startTime,
    duration_minutes: payload.durationMinutes,
    source:           "manual",
  })
  if (error) throw new Error(error.message)
  revalidatePath("/plan")
}

export async function deleteCalendarEvent(id: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("calendar_events").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/plan")
}

export async function updateCalendarEvent(
  id: string,
  payload: { title: string; startTime: string; durationMinutes: number; scheduledDate?: string }
): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase
    .from("calendar_events")
    .update({
      title:            payload.title,
      start_time:       payload.startTime,
      duration_minutes: payload.durationMinutes,
      ...(payload.scheduledDate && { scheduled_date: payload.scheduledDate }),
    })
    .eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/plan")
}

export async function importCalendarEvents(events: CalendarEventInsert[]): Promise<void> {
  const { supabase, userId } = await getAuthenticatedSupabase()

  const rows = events.map(e => ({
    user_id:          userId,
    title:            e.title,
    scheduled_date:   e.scheduledDate,
    start_time:       e.startTime,
    duration_minutes: e.durationMinutes,
    source:           e.source,
    external_id:      e.externalId ?? null,
  }))

  const { error } = await supabase
    .from("calendar_events")
    .upsert(rows, { onConflict: "external_id", ignoreDuplicates: true })

  if (error) throw new Error(error.message)

  revalidatePath("/plan")
}
