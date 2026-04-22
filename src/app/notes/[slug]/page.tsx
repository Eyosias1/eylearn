import { notFound } from 'next/navigation'
import { getNote } from '@/lib/get-note'
import { renderMarkdown } from '@/lib/render-markdown'
import { NoteHeader } from '@/components/notes/NoteHeader'
import { NotePageClient } from '@/components/notes/NotePageClient'
import { cn } from '@/lib/utils'

import 'katex/dist/katex.min.css'

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  const html = await renderMarkdown(note.content)

  return (
    <main className={cn("container mx-auto", "py-10 px-8", "max-w-6xl")}>
      <NotePageClient slug={slug} html={html} rawContent={note.content}>
        <NoteHeader note={note} />
      </NotePageClient>
    </main>
  )
}
