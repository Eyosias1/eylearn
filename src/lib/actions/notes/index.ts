'use server'

import { updateTag } from 'next/cache'
import { getAuthenticatedSupabase } from '@/lib/supabase/auth'
import { renderMarkdown } from '@/lib/markdown/render-markdown'
import { syncNoteReferences } from '@/lib/notes/sync-references'
import { getIncomingReferences } from '@/lib/notes/get-incoming-references'
import type { Database } from '@/types/database.types'
import type { NoteRecord } from '@/types/NoteRecordType'

type NoteInsert = Database['public']['Tables']['notes']['Insert']
type NoteUpdate = Database['public']['Tables']['notes']['Update']

function toNoteRow(note: Partial<NoteRecord>): NoteUpdate {
  return {
    slug:         note.slug,
    title:        note.title,
    subject:      note.subject,
    topic:        note.topic,
    content:      note.content,
    tags:         note.tags,
    status:       note.status,
    difficulty:   note.difficulty,
    date:         note.date,
    path:         note.path,
    emoji:        note.emoji,
    folder_id:    note.folderId ?? null,
    subject_slug: note.subjectSlug ?? null,
  }
}

export async function createNoteAction(note: NoteRecord): Promise<void> {
  const rendered_html = await renderMarkdown(note.content)
  const { supabase } = await getAuthenticatedSupabase()
  const row: NoteInsert = {
    ...toNoteRow(note),
    slug:       note.slug,
    title:      note.title,
    subject:    note.subject,
    topic:      note.topic,
    status:     note.status,
    difficulty: note.difficulty,
    date:       note.date,
    rendered_html,
  }
  const { error } = await supabase.from('notes').insert(row)
  if (error) throw new Error(error.message)
  updateTag('notes')
  await syncNoteReferences(note.slug, note.content)
}

export async function updateNoteAction(slug: string, updates: Partial<NoteRecord>): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const row: NoteUpdate = toNoteRow(updates)
  if (updates.content !== undefined) {
    row.rendered_html = await renderMarkdown(updates.content)
  }
  const { error } = await supabase.from('notes').update(row).eq('slug', slug)
  if (error) throw new Error(error.message)
  updateTag(`note:${slug}`)
  updateTag('notes')
  if (updates.content !== undefined) {
    await syncNoteReferences(updates.slug ?? slug, updates.content)
  }
}

export async function getIncomingReferencesAction(
  slug: string,
): Promise<{ id: string; title: string; slug: string }[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data: note } = await supabase.from('notes').select('id').eq('slug', slug).single()
  if (!note) return []
  return getIncomingReferences(note.id)
}

export async function deleteNoteAction(slug: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from('notes').delete().eq('slug', slug)
  if (error) throw new Error(error.message)
  updateTag(`note:${slug}`)
  updateTag('notes')
}
