import { Suspense } from 'react'
import { getAllNotes, getNoteFolders } from '@/lib/notes/queries'
import { NotesStoreProvider } from '@/providers/notes-store-provider'
import { LibrarySidebarPortal } from '@/components/library/LibrarySidebarPortal'

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [notes, folders] = await Promise.all([getAllNotes(), getNoteFolders()])

  return (
    <NotesStoreProvider initialNotes={notes} initialFolders={folders}>
      <Suspense>
        <LibrarySidebarPortal />
      </Suspense>
      {children}
    </NotesStoreProvider>
  )
}
