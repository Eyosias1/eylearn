'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { NoteMeta } from '@/types/NoteRecordType'
import type { NoteFolderNode } from '@/lib/notes/folder-tree'

interface CollapsedNotesNavProps {
  roots: NoteFolderNode[]
  unfiled: NoteMeta[]
  activeSlug: string
  onOpen: () => void
}

export function CollapsedNotesNav({ roots, unfiled, activeSlug, onOpen }: CollapsedNotesNavProps) {
  return (
    <nav className="flex flex-1 flex-col items-center gap-2 overflow-y-auto py-2">
      {unfiled.map(note => (
        <Link
          key={note.slug}
          href={`/notes/${note.slug}`}
          prefetch={false}
          title={note.title}
          className={cn(
            "flex size-8 items-center justify-center rounded-md text-base transition-colors",
            note.slug === activeSlug
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {note.emoji ?? '📄'}
        </Link>
      ))}
      {roots.map(node => (
        <Button
          key={node.folder.id}
          type="button"
          variant="ghost"
          size="icon-xs"
          title={node.folder.name}
          onClick={onOpen}
          className="size-8 text-base text-muted-foreground"
        >
          {node.folder.emoji ?? '📁'}
        </Button>
      ))}
    </nav>
  )
}
