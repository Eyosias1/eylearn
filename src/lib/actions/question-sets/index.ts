"use server"

import { revalidatePath } from "next/cache"
import { getAuthenticatedSupabase } from "@/lib/supabase/auth"
import type { QuestionSet, QuestionSetWithCount } from "@/types/QuestionSetType"

export async function getQuestionSets(): Promise<QuestionSetWithCount[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("question_sets")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)

  const sets = data ?? []
  if (sets.length === 0) return []

  const ids = sets.map((s) => s.id)
  const { data: counts, error: countError } = await supabase
    .from("questions")
    .select("set_id")
    .in("set_id", ids)
  if (countError) throw new Error(countError.message)

  const countMap = (counts ?? []).reduce<Record<string, number>>((acc, row) => {
    if (row.set_id) acc[row.set_id] = (acc[row.set_id] ?? 0) + 1
    return acc
  }, {})

  return sets.map((s) => ({ ...s, question_count: countMap[s.id] ?? 0 })) as QuestionSetWithCount[]
}

export async function getQuestionSetById(id: string): Promise<QuestionSet | null> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("question_sets")
    .select("*")
    .eq("id", id)
    .single()
  if (error) return null
  return data as QuestionSet
}

export async function createQuestionSet(subjectId: string, name: string, description?: string): Promise<QuestionSet> {
  const { supabase, userId } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("question_sets")
    .insert({ name, description: description ?? null, user_id: userId, subject_id: subjectId })
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath("/library")
  return data as QuestionSet
}

export async function updateQuestionSet(id: string, name: string, description?: string): Promise<QuestionSet> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("question_sets")
    .update({ name, description: description ?? null })
    .eq("id", id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath("/library")
  return data as QuestionSet
}

export async function deleteQuestionSet(id: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("question_sets").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/library")
}

export async function addQuestionsToSet(setId: string, questionIds: string[]): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()

  const { data: existing, error: fetchError } = await supabase
    .from("questions")
    .select("id, position")
    .eq("set_id", setId)
    .order("position", { ascending: false })
    .limit(1)
  if (fetchError) throw new Error(fetchError.message)

  const nextPosition = existing && existing.length > 0 ? (existing[0].position ?? 0) + 1 : 1

  const updates = questionIds.map((id, i) => ({
    id,
    set_id: setId,
    position: nextPosition + i,
  }))

  for (const update of updates) {
    const { error } = await supabase
      .from("questions")
      .update({ set_id: update.set_id, position: update.position })
      .eq("id", update.id)
    if (error) throw new Error(error.message)
  }
}

export async function removeQuestionFromSet(questionId: string, _setId: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase
    .from("questions")
    .update({ set_id: null, position: null })
    .eq("id", questionId)
  if (error) throw new Error(error.message)
}
