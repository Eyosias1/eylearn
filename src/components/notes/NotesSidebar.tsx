'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NotesGroup } from './NotesGroup'
import type { NoteGroup } from '@/lib/group-notes'

interface NotesSidebarProps {
  groups: NoteGroup[]
}

export function NotesSidebar({ groups }: NotesSidebarProps) {
  const pathname = usePathname()
  const activeSlug = pathname.startsWith('/notes/') ? pathname.slice(7) : ''
  const [open, setOpen] = useState(true)

  return (
    <aside className={cn(
      // layout
      "flex flex-col shrink-0",
      // sizing
      "h-full",
      open ? "w-60" : "w-10",
      // colors
      "bg-sidebar",
      // border
      "border-r border-border",
      // overflow + animation
      "overflow-hidden transition-[width] duration-200 ease-linear",
    )}>

      {/* header */}
      <div className={cn(
        // layout
        "flex items-center shrink-0",
        open ? "justify-between px-4" : "justify-center px-1",
        // sizing
        "h-(--header-height)",
        // border
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
        <button
          onClick={() => setOpen(o => !o)}
          className={cn(
            // layout
            "flex items-center justify-center shrink-0",
            // sizing
            "size-7 rounded-md",
            // colors
            "text-muted-foreground",
            // hover
            "hover:bg-accent hover:text-accent-foreground transition-colors",
            open && "ml-2",
          )}
        >
          {open
            ? <ChevronLeft className="size-4" />
            : <ChevronRight className="size-4" />
          }
        </button>
      </div>

      {/* nav — hidden when collapsed */}
      {open && (
        <nav className="flex-1 overflow-y-auto py-2">
          {groups.map(group => (
            <NotesGroup key={group.subject} group={group} activeSlug={activeSlug} />
          ))}
        </nav>
      )}

    </aside>
  )
}
