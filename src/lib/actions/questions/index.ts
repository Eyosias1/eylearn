"use server"

import { getAuthenticatedSupabase } from "@/lib/supabase/auth"
import type { Question, QuestionType } from "@/types/QuestionType"

export async function getQuestionsByTopic(topicId: string): Promise<Question[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("topic_id", topicId)
    .order("created_at", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as Question[]
}

export async function getQuestionCountsByTopicIds(topicIds: string[]): Promise<Record<string, number>> {
  if (topicIds.length === 0) return {}
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("questions")
    .select("topic_id")
    .in("topic_id", topicIds)
  if (error) throw new Error(error.message)
  return (data ?? []).reduce<Record<string, number>>((acc, row) => {
    acc[row.topic_id] = (acc[row.topic_id] ?? 0) + 1
    return acc
  }, {})
}

export async function createQuestion(
  topicId: string,
  subtopicId: string | null,
  body: string,
  type: QuestionType,
  correctAnswer: string,
): Promise<Question> {
  const { supabase, userId } = await getAuthenticatedSupabase()
  const { data, error } = await supabase.from("questions").insert({
    topic_id: topicId,
    subtopic_id: subtopicId,
    body,
    type,
    correct_answer: correctAnswer,
    user_id: userId,
  }).select().single()
  if (error) throw new Error(error.message)
  return data as Question
}

export async function updateQuestion(
  id: string,
  topicId: string,
  body: string,
  type: QuestionType,
  correctAnswer: string,
): Promise<Question> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("questions")
    .update({ body, type, correct_answer: correctAnswer })
    .eq("id", id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Question
}

export async function getQuestionsBySetId(setId: string): Promise<Question[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("set_id", setId)
    .order("position", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as Question[]
}

export async function getAllBankQuestions(): Promise<Question[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as Question[]
}

export async function deleteQuestion(id: string, topicId: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from("questions").delete().eq("id", id)
  if (error) throw new Error(error.message)
}
