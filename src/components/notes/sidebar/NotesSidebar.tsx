'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CollapsedNotesNav } from '@/components/notes/sidebar/CollapsedNotesNav'
import { useNotesSidebarPanel } from '@/components/notes/sidebar/notes-sidebar-panel-context'
import { NotesSidebarNav } from '@/components/notes/sidebar/NotesSidebarNav'
import type { NoteMeta } from '@/types/NoteRecordType'
import type { NoteFolderNode } from '@/lib/notes/folder-tree'

interface NotesSidebarProps {
  roots: NoteFolderNode[]
  unfiled: NoteMeta[]
  onCreateFolder: (name: string, parentId: string | null) => Promise<void>
  onCreateNote: (title: string, folderId: string | null) => Promise<void>
  onDeleteFolder: (id: string) => Promise<void>
  onDeleteNote: (slug: string) => Promise<void>
  onRenameNote: (slug: string, title: string) => Promise<void>
  onChangeNoteEmoji: (slug: string, emoji: string) => Promise<void>
  onRenameFolder: (id: string, name: string) => Promise<void>
  onChangeFolderEmoji: (id: string, emoji: string) => Promise<void>
  onMoveNote: (slug: string, folderId: string | null) => Promise<void>
  onMoveFolder: (id: string, parentId: string | null) => Promise<void>
}

export function NotesSidebar(props: NotesSidebarProps) {
  const { roots, unfiled } = props
  const pathname = usePathname()
  const activeSlug = pathname.startsWith('/notes/') ? pathname.slice(7) : ''
  const { open, setOpen } = useNotesSidebarPanel()

  return (
    <aside className={cn(
      "flex flex-col shrink-0",
      "h-full",
      open ? "w-full" : "w-10",
      "bg-sidebar",
      "border-r border-border",
      "overflow-hidden transition-[width] duration-200 ease-linear",
    )}>
      <div className={cn(
        "flex items-center shrink-0",
        open ? "justify-between px-4" : "justify-center px-1",
        "h-(--header-height)",
        "border-b border-border",
      )}>
        {open && (
          <>
            <span className="text-sm font-semibold">Notes</span>
            <Link
              href="/notes"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              All notes
            </Link>
          </>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => setOpen(o => !o)}
          className={cn(
            "text-muted-foreground",
            open && "ml-2",
          )}
        >
          {open
            ? <ChevronLeft className="size-4" />
            : <ChevronRight className="size-4" />
          }
        </Button>
      </div>

      {open && (
        <NotesSidebarNav {...props} activeSlug={activeSlug} />
      )}
      {!open && (
        <CollapsedNotesNav
          roots={roots}
          unfiled={unfiled}
          activeSlug={activeSlug}
          onOpen={() => setOpen(true)}
        />
      )}

    </aside>
  )
}
