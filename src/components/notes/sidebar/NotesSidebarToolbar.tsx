'use client'

import { ChevronsDownUp, FilePlus, FolderPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NotesSidebarToolbarProps {
  onCreateFolder: () => void
  onCreateNote: () => void
  onCollapseAll: () => void
}

export function NotesSidebarToolbar(props: NotesSidebarToolbarProps) {
  return (
    <div className="border-b border-border/70 px-2 py-3">
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={props.onCreateFolder} className="h-10 flex-1 gap-2 text-base"><FolderPlus className="size-5" /> Folder</Button>
        <Button variant="ghost" size="sm" onClick={props.onCreateNote} className="h-10 flex-1 gap-2 text-base"><FilePlus className="size-5" /> Note</Button>
        <Button variant="ghost" size="icon-sm" onClick={props.onCollapseAll} className="h-10" title="Collapse all folders"><ChevronsDownUp className="size-5" /></Button>
      </div>
    </div>
  )
}
