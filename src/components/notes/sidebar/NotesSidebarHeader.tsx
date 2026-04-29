'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, FilePlus, FolderPlus, ChevronsDownUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onToggle: () => void
  onCreateFolder: () => void
  onCreateNote: () => void
  onCollapseAll: () => void
}

export function NotesSidebarHeader({ open, onToggle, onCreateFolder, onCreateNote, onCollapseAll }: Props) {
  return (
    <div className={cn(
      // layout
      "flex items-center shrink-0",
      // spacing
      open ? "justify-between px-3" : "justify-center px-1",
      // sizing
      "h-(--header-height)",
      // border
      "border-b border-border",
    )}>
      {open && (
        <>
          <span className="text-base font-semibold">Notes</span>
          <div className="flex items-center gap-1">
            <Link
              href="/notes"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-1.5"
            >
              All notes
            </Link>
            <Button variant="ghost" size="icon-xs" onClick={onCreateFolder} title="New folder">
              <FolderPlus className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-xs" onClick={onCreateNote} title="New note">
              <FilePlus className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-xs" onClick={onCollapseAll} title="Collapse all">
              <ChevronsDownUp className="size-4" />
            </Button>
          </div>
        </>
      )}
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={onToggle}
        className={cn("text-muted-foreground", open && "ml-1")}
      >
        {open ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
      </Button>
    </div>
  )
}
