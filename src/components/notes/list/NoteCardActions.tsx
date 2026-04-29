'use client'

import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotesDeleteDialog } from '@/components/notes/sidebar/NotesDeleteDialog'

interface NoteCardActionsProps {
  title:    string
  slug:     string
  onEdit:   () => void
  onDelete: () => Promise<void>
}

export function NoteCardActions({ title, slug, onEdit, onDelete }: NoteCardActionsProps) {
  return (
    <div className="absolute right-3 top-3 z-10 flex items-center gap-1 opacity-0 transition-opacity group-hover/card:opacity-100">
      <Button variant="ghost" size="icon-xs" onClick={onEdit} title="Edit title">
        <Pencil className="size-3.5" />
      </Button>
      <NotesDeleteDialog itemType="note" title={title} slug={slug} onDelete={onDelete} />
    </div>
  )
}
