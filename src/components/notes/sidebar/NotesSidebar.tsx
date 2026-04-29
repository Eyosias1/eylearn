'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NotesSidebarHeader } from '@/components/notes/sidebar/NotesSidebarHeader'
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
  const pathname   = usePathname()
  const activeSlug = pathname.startsWith('/notes/') ? pathname.slice(7) : ''
  const { open, setOpen } = useNotesSidebarPanel()

  const [creatingRootFolder, setCreatingRootFolder] = useState(false)
  const [creatingRootNote,   setCreatingRootNote]   = useState(false)
  const [collapseSignal,     setCollapseSignal]     = useState(0)

  return (
    <aside className={cn(
      // layout
      "flex flex-col shrink-0",
      // sizing
      "h-full",
      open ? "w-full" : "w-10",
      // colors
      "bg-sidebar",
      // border
      "border-r border-border",
      // animation
      "overflow-hidden transition-[width] duration-200 ease-linear",
    )}>
      <NotesSidebarHeader
        open={open}
        onToggle={() => setOpen(o => !o)}
        onCreateFolder={() => setCreatingRootFolder(true)}
        onCreateNote={() => setCreatingRootNote(true)}
        onCollapseAll={() => setCollapseSignal(v => v + 1)}
      />

      {open && (
        <NotesSidebarNav
          {...props}
          activeSlug={activeSlug}
          creatingRootFolder={creatingRootFolder}
          setCreatingRootFolder={setCreatingRootFolder}
          creatingRootNote={creatingRootNote}
          setCreatingRootNote={setCreatingRootNote}
          collapseSignal={collapseSignal}
        />
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
