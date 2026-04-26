import { Suspense } from 'react'
import 'katex/dist/katex.min.css'
import { getAllNotes, getNoteFolders } from '@/lib/notes/queries'
import { NotesSidebarPortal } from '@/components/notes/sidebar/NotesSidebarPortal'
import { NotesStoreProvider } from '@/providers/notes-store-provider'

export default async function NotesLayout({ children }: { children: React.ReactNode }) {
  const [notes, folders] = await Promise.all([getAllNotes(), getNoteFolders()])

  return (
    <NotesStoreProvider initialNotes={notes} initialFolders={folders}>
      <Suspense>
        <NotesSidebarPortal />
      </Suspense>
      {children}
    </NotesStoreProvider>
  )
}
