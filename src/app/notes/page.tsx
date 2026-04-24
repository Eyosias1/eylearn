import { getAllNotes } from '@/lib/notes/queries'
import { NotesStoreProvider } from '@/components/notes/NotesStoreProvider'
import { NotesShell } from '@/components/notes/list/NotesShell'

export default async function NotesPage() {
  const notes = await getAllNotes()
  return (
    <NotesStoreProvider initialNotes={notes}>
      <NotesShell />
    </NotesStoreProvider>
  )
}
