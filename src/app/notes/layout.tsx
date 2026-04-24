import { Suspense } from 'react'
import 'katex/dist/katex.min.css'
import { getAllNotes } from '@/lib/notes/queries'
import { NotesSidebarShell } from '@/components/notes/sidebar/NotesSidebarShell'
import { NotesStoreProvider } from '@/components/notes/NotesStoreProvider'
import { cn } from '@/lib/utils'

export default async function NotesLayout({ children }: { children: React.ReactNode }) {
  const notes = await getAllNotes()

  return (
    <div className={cn(
      // layout
      "absolute flex",
      // sizing
      "inset-0",
    )}>
      <Suspense>
        <NotesStoreProvider initialNotes={notes}>
          <NotesSidebarShell />
        </NotesStoreProvider>
      </Suspense>
      <div className={cn(
        // layout
        "flex-1 min-w-0",
        // overflow
        "overflow-y-auto",
        // spacing
        "p-6",
      )}>
        {children}
      </div>
    </div>
  )
}
