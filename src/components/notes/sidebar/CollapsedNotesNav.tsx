'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { NoteMeta } from '@/types/NoteRecordType'
import type { NoteFolderNode } from '@/lib/notes/folder-tree'

interface CollapsedNotesNavProps {
  roots: NoteFolderNode[]
  unfiled: NoteMeta[]
  activeSlug: string
  onOpenFolder: (id: string) => void
}

export function CollapsedNotesNav({ roots, unfiled, activeSlug, onOpenFolder }: CollapsedNotesNavProps) {
  return (
    <nav className="flex flex-1 flex-col items-center gap-2 overflow-y-auto py-2">
      {unfiled.map(note => (
        <CollapsedTooltip key={note.slug} label={note.title}>
          <Link
            href={`/notes/${note.slug}`}
            prefetch={false}
            className={cn(
              "flex size-8 items-center justify-center rounded-md text-base transition-colors",
              note.slug === activeSlug
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-primary/10 hover:text-sidebar-primary",
            )}
          >
            {note.emoji ?? '📄'}
          </Link>
        </CollapsedTooltip>
      ))}
      {roots.map(node => (
        <CollapsedTooltip key={node.folder.id} label={node.folder.name}>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onOpenFolder(node.folder.id)}
            className="size-8 text-base text-sidebar-foreground hover:bg-sidebar-primary/10 hover:text-sidebar-primary"
          >
            {node.folder.emoji ?? '📁'}
          </Button>
        </CollapsedTooltip>
      ))}
    </nav>
  )
}

function CollapsedTooltip({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" align="center">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
