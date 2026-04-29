import 'server-only'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { extractWikilinks } from '@/lib/notes/extract-wikilinks'

export async function syncNoteReferences(sourceSlug: string, content: string): Promise<void> {
  const db = createClient(await cookies())

  // Get source note id
  const { data: source } = await db.from('notes').select('id').eq('slug', sourceSlug).single()
  if (!source) return

  const slugs = extractWikilinks(content)

  // Resolve target slugs to ids (skip self-references)
  const targetIds: string[] = []
  if (slugs.length > 0) {
    const { data: targets } = await db.from('notes').select('id').in('slug', slugs)
    targets?.forEach((t) => { if (t.id !== source.id) targetIds.push(t.id) })
  }

  // Replace all outgoing references for this note
  await db.from('note_references').delete().eq('source_note_id', source.id)
  if (targetIds.length > 0) {
    await db.from('note_references').insert(
      targetIds.map((id) => ({ source_note_id: source.id, target_note_id: id }))
    )
  }
}
