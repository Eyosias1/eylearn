"use server"

import { revalidatePath } from "next/cache"
import { getAuthenticatedSupabase } from "@/lib/supabase/auth"
import type { Topic } from "@/types/TopicType"

export async function getAllTopics(): Promise<Topic[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .order("created_at", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as Topic[]
}

export async function getTopics(subjectId: string): Promise<Topic[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as Topic[]
}

export async function createTopic(subjectId: string, name: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("topics").insert({ subject_id: subjectId, name })
  if (error) throw new Error(error.message)
  revalidatePath(`/subjects/${subjectId}`)
}

export async function updateTopic(id: string, name: string, subjectId: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("topics").update({ name }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath(`/subjects/${subjectId}`)
}

export async function deleteTopic(id: string, subjectId: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("topics").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath(`/subjects/${subjectId}`)
}
