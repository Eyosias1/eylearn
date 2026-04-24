'use server'

import { splitNoteHtml } from '@/lib/notes/split-note-html'
import { renderMarkdown } from '@/lib/markdown/render-markdown'
import type { NoteChunk } from '@/types/NoteChunk'

export async function renderNote(content: string): Promise<NoteChunk[]> {
  return splitNoteHtml(await renderMarkdown(content))
}
