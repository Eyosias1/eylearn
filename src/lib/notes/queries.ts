import { cacheTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { splitNoteHtml } from '@/lib/notes/split-note-html'
import type { NoteMeta, NoteRecord } from '@/types/NoteRecordType'
import type { NoteChunk } from '@/types/NoteChunk'

function toNoteMeta(row: Record<string, unknown>): NoteMeta {
  return {
    slug: row.slug as string,
    title: row.title as string,
    subject: row.subject as string,
    topic: row.topic as string,
    tags: row.tags as string[],
    status: row.status as string,
    difficulty: row.difficulty as string,
    date: row.date as string,
    subjectSlug: (row.subject_slug as string | null) ?? undefined,
    path: (row.path as string | null) ?? undefined,
  }
}

export async function getAllNotes(): Promise<NoteMeta[]> {
  'use cache'
  cacheTag('notes')
  const db = createAdminClient()
  const { data, error } = await db
    .from('notes')
    .select('slug, title, subject, topic, tags, status, difficulty, date, subject_slug, path')
    .order('date', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []).map(toNoteMeta)
}

export async function getRenderedNote(
  slug: string,
): Promise<{ note: NoteRecord; chunks: NoteChunk[] } | null> {
  'use cache'
  cacheTag('notes', `note:${slug}`)

  const db = createAdminClient()
  const { data, error } = await db.from('notes').select('*').eq('slug', slug).single()
  if (error) return null

  const note: NoteRecord = { ...toNoteMeta(data as Record<string, unknown>), content: data.content }

  // Fast path: HTML already stored — pure string fetch, zero rendering
  if (data.rendered_html) return { note, chunks: splitNoteHtml(data.rendered_html as string) }

  // Lazy fallback for rows not yet backfilled — dynamic import keeps render pipeline off the read path
  const { renderMarkdown } = await import('@/lib/markdown/render-markdown')
  const html = await renderMarkdown(note.content)
  return { note, chunks: splitNoteHtml(html) }
}
