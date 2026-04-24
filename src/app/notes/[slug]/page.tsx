import { notFound } from 'next/navigation'
import { getRenderedNote } from '@/lib/notes/queries'
import { NotePageShell } from '@/components/notes/page/NotePageShell'
import { NoteRenderer } from '@/components/notes/renderer/NoteRenderer'
import { cn } from '@/lib/utils'

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getRenderedNote(slug)
  if (!result) notFound()

  return (
    <main className={cn("container mx-auto", "py-10 px-8", "max-w-6xl")}>
      <NotePageShell key={slug} serverNote={result.note}>
        <NoteRenderer chunks={result.chunks} />
      </NotePageShell>
    </main>
  )
}
