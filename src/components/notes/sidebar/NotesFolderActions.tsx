'use client'

import { FilePlus, FolderPlus, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotesDeleteDialog } from '@/components/notes/sidebar/NotesDeleteDialog'

interface NotesFolderActionsProps {
  title: string
  onEdit: () => void
  onCreateNote: () => void
  onCreateFolder: () => void
  onDelete: () => Promise<void>
}

export function NotesFolderActions(props: NotesFolderActionsProps) {
  return (
    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 opacity-0 group-hover/folder:opacity-100">
      <Button variant="ghost" size="icon-xs" onClick={props.onEdit} className="hover:text-sky-500"><Pencil className="size-5" /></Button>
      <Button variant="ghost" size="icon-xs" onClick={props.onCreateNote} className="hover:text-emerald-500"><FilePlus className="size-5" /></Button>
      <Button variant="ghost" size="icon-xs" onClick={props.onCreateFolder} className="hover:text-amber-500"><FolderPlus className="size-5" /></Button>
      <NotesDeleteDialog itemType="folder" title={props.title} onDelete={props.onDelete} />
    </div>
  )
}
