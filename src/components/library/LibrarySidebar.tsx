'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, FilePlus, FolderPlus, ChevronsDownUp, BookMarked, Tag, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotesSidebarNav } from '@/components/notes/sidebar/NotesSidebarNav'
import { CollapsedNotesNav } from '@/components/notes/sidebar/CollapsedNotesNav'
import { useNotesSidebarPanel } from '@/components/notes/sidebar/notes-sidebar-panel-context'
import { cn } from '@/lib/utils'
import type { NoteMeta } from '@/types/NoteRecordType'
import type { NoteFolderNode } from '@/lib/notes/folder-tree'

const LIBRARY_PAGES = [
  { label: 'Subjects',      href: '/library/subjects',      icon: Tag           },
  { label: 'Question Bank', href: '/library/question-bank', icon: ClipboardList },
  { label: 'Exam Sets',     href: '/library/exam-sets',     icon: BookMarked    },
]

interface LibrarySidebarProps {
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

export function LibrarySidebar(props: LibrarySidebarProps) {
  const { roots, unfiled } = props
  const pathname = usePathname()
  const activeSlug = pathname.startsWith('/notes/') ? pathname.slice(7) : ''
  const { open, setOpen } = useNotesSidebarPanel()

  const [creatingRootFolder, setCreatingRootFolder] = useState(false)
  const [creatingRootNote, setCreatingRootNote] = useState(false)
  const [collapseSignal, setCollapseSignal] = useState(0)
  const [revealedFolderId, setRevealedFolderId] = useState<string | null>(null)

  return (
    <aside className={cn(
      // layout
      'flex flex-col shrink-0',
      // sizing
      'h-full',
      open ? 'w-full' : 'w-10',
      // colors
      'bg-sidebar',
      // border
      'border-r border-border',
      // animation
      'overflow-hidden transition-[width] duration-200 ease-linear',
    )}>
      {/* Header */}
      <div className={cn(
        // layout
        'flex items-center shrink-0',
        // spacing
        open ? 'justify-between px-3' : 'justify-center px-1',
        // sizing
        'h-(--header-height)',
        // border
        'border-b border-border',
      )}>
        {open && (
          <span className="px-1.5 text-sm font-semibold text-sidebar-foreground">Library</span>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => setOpen((o) => !o)}
          className={cn('text-muted-foreground', open && 'ml-1')}
        >
          {open ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </Button>
      </div>

      {open && (
        <>
          {/* Library page nav */}
          <nav className="flex flex-col gap-0.5 px-2 pt-3 pb-2 shrink-0">
            {LIBRARY_PAGES.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  // layout
                  'flex items-center gap-2',
                  // spacing
                  'px-2 py-1.5',
                  // typography
                  'text-sm',
                  // border
                  'rounded-md',
                  // animation
                  'transition-colors',
                  pathname.startsWith(href)
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Notes section divider */}
          <div className={cn(
            // layout
            'flex items-center justify-between shrink-0',
            // spacing
            'px-3 py-2',
            // border
            'border-t border-border',
          )}>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-xs" onClick={() => setCreatingRootFolder(true)} title="New folder">
                <FolderPlus className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-xs" onClick={() => setCreatingRootNote(true)} title="New note">
                <FilePlus className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-xs" onClick={() => setCollapseSignal((v) => v + 1)} title="Collapse all">
                <ChevronsDownUp className="size-4" />
              </Button>
            </div>
          </div>

          {/* Notes folder tree */}
          <NotesSidebarNav
            {...props}
            activeSlug={activeSlug}
            creatingRootFolder={creatingRootFolder}
            setCreatingRootFolder={setCreatingRootFolder}
            creatingRootNote={creatingRootNote}
            setCreatingRootNote={setCreatingRootNote}
            collapseSignal={collapseSignal}
            revealedFolderId={revealedFolderId}
          />
        </>
      )}

      {!open && (
        <CollapsedNotesNav
          roots={roots}
          unfiled={unfiled}
          activeSlug={activeSlug}
          onOpenFolder={(id) => {
            setRevealedFolderId(id)
            setOpen(true)
          }}
        />
      )}
    </aside>
  )
}
