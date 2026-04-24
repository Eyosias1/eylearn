import { Suspense } from 'react'
import 'katex/dist/katex.min.css'
import { getAllNotes } from '@/lib/notes/queries'
import { NotesSidebarPortal } from '@/components/notes/sidebar/NotesSidebarPortal'
import { NotesStoreProvider } from '@/components/notes/NotesStoreProvider'

export default async function NotesLayout({ children }: { children: React.ReactNode }) {
  const notes = await getAllNotes()

  return (
    <NotesStoreProvider initialNotes={notes}>
      <Suspense>
        <NotesSidebarPortal />
      </Suspense>
      {children}
    </NotesStoreProvider>
  )
}
