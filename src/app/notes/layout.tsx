import { getAllNotes } from '@/lib/get-note'
import { groupNotesBySubject } from '@/lib/group-notes'
import { NotesSidebar } from '@/components/notes/NotesSidebar'
import { cn } from '@/lib/utils'

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  const groups = groupNotesBySubject(getAllNotes())

  return (
    <div className={cn(
      // layout
      "absolute flex",
      // sizing — cover main's full border-box, escaping its p-6 padding
      "inset-0",
    )}>
      <NotesSidebar groups={groups} />
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
