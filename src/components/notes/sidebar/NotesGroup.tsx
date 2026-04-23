'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NoteGroup } from '@/lib/group-notes'

interface NotesGroupProps {
  group: NoteGroup
  activeSlug: string
}

export function NotesGroup({ group, activeSlug }: NotesGroupProps) {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          // layout
          "flex items-center gap-1.5 w-full",
          // spacing
          "px-3 py-1.5",
          // typography
          "text-xs font-semibold uppercase tracking-wider",
          // colors
          "text-muted-foreground",
          // hover
          "hover:text-foreground transition-colors",
        )}
      >
        <ChevronRight className={cn("size-3.5 transition-transform", open && "rotate-90")} />
        {group.subject}
      </button>

      {open && (
        <ul>
          {group.notes.map(note => (
            <li key={note.slug}>
              <Link
                href={`/notes/${note.slug}`}
                className={cn(
                  // layout
                  "block",
                  // spacing
                  "px-4 py-1.5 pl-7 mx-1",
                  // typography
                  "text-sm truncate",
                  // border
                  "rounded-md",
                  // animation
                  "transition-colors",
                  // conditional
                  note.slug === activeSlug
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                {note.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
