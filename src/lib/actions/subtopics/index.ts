"use server"

import { revalidatePath } from "next/cache"
import { getAuthenticatedSupabase } from "@/lib/supabase/auth"
import type { Subtopic } from "@/types/SubtopicType"

export async function getNotesForPicker(): Promise<{ id: string; title: string; subject: string; slug: string }[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("notes")
    .select("id, title, subject, slug")
    .order("title", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as { id: string; title: string; subject: string; slug: string }[]
}

export async function getLinkedNotes(subtopicId: string): Promise<{ id: string; title: string; slug: string }[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("subtopic_notes")
    .select("note_id, notes(id, title, slug)")
    .eq("subtopic_id", subtopicId)
  if (error) throw new Error(error.message)
  return (data ?? [])
    .map((row: Record<string, unknown>) => row.notes as { id: string; title: string; slug: string } | null)
    .filter((n): n is { id: string; title: string; slug: string } => n !== null)
    .map(n => ({ id: n.id, title: n.title, slug: n.slug }))
}

export async function linkSubtopicNote(subtopicId: string, noteId: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("subtopic_notes").insert({ subtopic_id: subtopicId, note_id: noteId })
  if (error && error.code !== "23505") throw new Error(error.message)
  revalidatePath("/subjects")
}

export async function unlinkSubtopicNote(subtopicId: string, noteId: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase
    .from("subtopic_notes")
    .delete()
    .eq("subtopic_id", subtopicId)
    .eq("note_id", noteId)
  if (error) throw new Error(error.message)
  revalidatePath("/subjects")
}

export async function getAllSubtopics(): Promise<Subtopic[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("subtopics")
    .select("*")
    .order("created_at", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as Subtopic[]
}

export async function createSubtopic(topicId: string, name: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("subtopics").insert({ topic_id: topicId, name })
  if (error) throw new Error(error.message)
  revalidatePath("/subjects")
}

export async function updateSubtopic(id: string, name: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("subtopics").update({ name }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/subjects")
}

export async function deleteSubtopic(id: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("subtopics").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/subjects")
}
