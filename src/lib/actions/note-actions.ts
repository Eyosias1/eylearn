'use server'

import { updateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { renderMarkdown } from '@/lib/markdown/render-markdown'
import type { NoteRecord } from '@/types/NoteRecordType'

function toNoteRow(note: Partial<NoteRecord>) {
  const row = {
    slug: note.slug,
    title: note.title,
    subject: note.subject,
    topic: note.topic,
    content: note.content,
    tags: note.tags,
    status: note.status,
    difficulty: note.difficulty,
    date: note.date,
    path: note.path,
    emoji: note.emoji,
    folder_id: note.folderId,
    subject_slug: note.subjectSlug,
  }

  return Object.fromEntries(
    Object.entries(row).filter((entry) => entry[1] !== undefined),
  )
}

export async function createNoteAction(note: NoteRecord): Promise<void> {
  const rendered_html = await renderMarkdown(note.content)
  const db = createAdminClient()
  const { error } = await db.from('notes').insert({ ...toNoteRow(note), rendered_html })
  if (error) throw new Error(error.message)
  updateTag('notes')
}

export async function updateNoteAction(slug: string, updates: Partial<NoteRecord>): Promise<void> {
  const db = createAdminClient()
  const row: Record<string, unknown> = toNoteRow(updates)
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
