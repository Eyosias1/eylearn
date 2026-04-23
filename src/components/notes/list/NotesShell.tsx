'use client'

import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NoteCard } from '@/components/notes/list/NoteCard'
import { NewNoteDialog } from '@/components/notes/list/NewNoteDialog'
import { useNotesContext } from '@/components/notes/NotesStoreProvider'
import type { NoteRecord } from '@/types/NoteRecordType'

export function NotesShell() {
  const { notes, createNote, removeNote, updateNote } = useNotesContext()
  const router = useRouter()

  async function handleCreate(note: NoteRecord) {
    await createNote(note)
    router.push(`/notes/${note.slug}`)
  }

  async function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Delete "${title}"?`)) return
    await removeNote(slug)
  }

  async function handleRename(slug: string, title: string) {
    await updateNote(slug, { title })
  }

  return (
    <main className={cn("container mx-auto", "max-w-5xl py-10 px-8")}>
      <div className={cn("mb-6 flex items-end justify-between gap-4")}>
        <h1 className={cn("text-2xl font-bold")}>My Notes</h1>
        <NewNoteDialog onCreate={handleCreate} />
      </div>
      <div className={cn("grid gap-4", "sm:grid-cols-2")}>
        {notes.map(note => (
          <NoteCard
            key={`${note.slug}:${note.title}`}
            note={note}
            onDelete={handleDelete}
            onRename={handleRename}
          />
        ))}
      </div>
    </main>
  )
}
