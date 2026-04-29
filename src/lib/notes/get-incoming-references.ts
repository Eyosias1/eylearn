import 'server-only'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function getIncomingReferences(
  noteId: string,
): Promise<{ id: string; title: string; slug: string }[]> {
  const db = createClient(await cookies())
  const { data, error } = await db
    .from('note_references')
    .select('notes!source_note_id(id, title, slug)')
    .eq('target_note_id', noteId)
  if (error) return []
  return (data ?? []).map((row: Record<string, unknown>) => {
    const n = row.notes as { id: string; title: string; slug: string }
    return { id: n.id, title: n.title, slug: n.slug }
  })
}
