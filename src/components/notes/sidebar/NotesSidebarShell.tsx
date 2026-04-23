'use client'

import { NotesSidebar } from '@/components/notes/sidebar/NotesSidebar'
import { useNotesContext } from '@/components/notes/NotesStoreProvider'
import { groupNotesBySubject } from '@/lib/group-notes'

export function NotesSidebarShell() {
  const { notes } = useNotesContext()

  return <NotesSidebar groups={groupNotesBySubject(notes)} />
}
