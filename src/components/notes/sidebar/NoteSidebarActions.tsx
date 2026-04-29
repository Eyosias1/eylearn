'use client'

import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotesDeleteDialog } from '@/components/notes/sidebar/NotesDeleteDialog'
import { cn } from '@/lib/utils'

interface NoteSidebarActionsProps {
  title:    string
  slug:     string
  editing:  boolean
  onEdit:   () => void
  onDelete: () => Promise<void>
}

export function NoteSidebarActions({ title, slug, editing, onEdit, onDelete }: NoteSidebarActionsProps) {
  return (
    <div className={cn("absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 opacity-0 group-hover/note:opacity-100", editing && "hidden")}>
      <Button variant="ghost" size="icon-xs" onClick={onEdit} title="Rename note" className="hover:text-sky-500"><Pencil className="size-5" /></Button>
      <NotesDeleteDialog itemType="note" title={title} slug={slug} onDelete={onDelete} />
    </div>
  )
}
