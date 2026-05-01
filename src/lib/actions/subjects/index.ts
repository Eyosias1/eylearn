"use server"

import { revalidatePath } from "next/cache"
import { getAuthenticatedSupabase } from "@/lib/supabase/auth"
import type { Subject } from "@/types/SubjectType"

export async function getSubjects(): Promise<Subject[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .order("created_at", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as Subject[]
}

export async function createSubject(name: string, color: string): Promise<void> {
  const { supabase, userId } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("subjects").insert({ name, color, user_id: userId })
  if (error) throw new Error(error.message)
  revalidatePath("/subjects")
}

export async function updateSubject(id: string, name: string, color: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("subjects").update({ name, color }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/subjects")
}

export async function deleteSubject(id: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("subjects").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/subjects")
}
