import { getAllNotes } from '@/lib/get-note'
import { NoteCard } from '@/components/notes/NoteCard'
import { cn } from '@/lib/utils'

export default function NotesPage() {
  const notes = getAllNotes()

  return (
    <main className={cn("container mx-auto", "py-10 px-8", "max-w-5xl")}>
      <h1 className={cn("text-2xl font-bold", "mb-6")}>My Notes</h1>
      <div className={cn("grid gap-4", "sm:grid-cols-2")}>
        {notes.map(note => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </main>
  )
}
