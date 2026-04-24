'use server'

import { updateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { renderMarkdown } from '@/lib/markdown/render-markdown'
import type { NoteRecord } from '@/types/NoteRecordType'

export async function createNoteAction(note: NoteRecord): Promise<void> {
  const rendered_html = await renderMarkdown(note.content)
  const db = createAdminClient()
  const { error } = await db.from('notes').insert({ ...note, rendered_html })
  if (error) throw new Error(error.message)
  updateTag('notes')
}

export async function updateNoteAction(slug: string, updates: Partial<NoteRecord>): Promise<void> {
  const db = createAdminClient()
  const row: Record<string, unknown> = { ...updates }
  if (updates.content !== undefined) {
    row.rendered_html = await renderMarkdown(updates.content)
  }
  const { error } = await db.from('notes').update(row).eq('slug', slug)
  if (error) throw new Error(error.message)
  updateTag(`note:${slug}`)
  updateTag('notes')
}

export async function deleteNoteAction(slug: string): Promise<void> {
  const db = createAdminClient()
  const { error } = await db.from('notes').delete().eq('slug', slug)
  if (error) throw new Error(error.message)
  updateTag(`note:${slug}`)
  updateTag('notes')
}
