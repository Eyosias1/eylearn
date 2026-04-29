'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { NoteSidebarActions } from '@/components/notes/sidebar/NoteSidebarActions'
import { SidebarEmojiPicker } from '@/components/notes/sidebar/SidebarEmojiPicker'
import type { NoteMeta } from '@/types/NoteRecordType'

const noteEmojis = ['📄', '🧠', '✍️', '📌', '🔬', '⚗️', '📐', '💡']

interface NoteSidebarLinkProps {
  note: NoteMeta
  activeSlug: string
  onDeleteNote: (slug: string) => Promise<void>
  onRenameNote: (slug: string, title: string) => Promise<void>
  onChangeNoteEmoji: (slug: string, emoji: string) => Promise<void>
}

export function NoteSidebarLink(props: NoteSidebarLinkProps) {
  const { note, activeSlug, onDeleteNote, onRenameNote, onChangeNoteEmoji } = props
  const [editing, setEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(note.title)
  const [isPending, startTransition] = useTransition()

  function commitTitle() {
    const title = draftTitle.trim()
    if (!title || title === note.title) {
      setDraftTitle(note.title)
      setEditing(false)
      return
    }
    startTransition(async () => {
      await onRenameNote(note.slug, title)
      setEditing(false)
    })
  }

  return (
    <li className={cn("group/note relative my-1.5 flex items-center")}> 
      {!editing && (
        <SidebarEmojiPicker
          value={note.emoji ?? '📄'}
          options={noteEmojis}
          onChange={(emoji) => onChangeNoteEmoji(note.slug, emoji)}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 opacity-100"
        />
      )}
      {editing ? (
        <Input
          autoFocus
          value={draftTitle}
          disabled={isPending}
          onChange={event => setDraftTitle(event.target.value)}
          onBlur={commitTitle}
          onKeyDown={event => {
            if (event.key === 'Enter') { event.preventDefault(); commitTitle() }
            if (event.key === 'Escape') { event.preventDefault(); setDraftTitle(note.title); setEditing(false) }
          }}
          className="mx-1 h-11 min-w-0 flex-1 pl-8 text-base"
        />
      ) : (
        <Link
          href={`/notes/${note.slug}`}
          prefetch={false}
          draggable
        onDragStart={event => {
          event.dataTransfer.effectAllowed = 'move'
          event.dataTransfer.setData('application/x-note-slug', note.slug)
          event.dataTransfer.setData('text/plain', note.slug)
        }}
          className={cn(
            // layout
            "flex min-w-0 flex-1 items-center",
            // spacing
            "h-11 px-2 py-2.5 pl-10 pr-3 mx-1 group-hover/note:pr-20",
            // typography
            "text-base truncate",
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
          <span className="truncate">{note.title}</span>
        </Link>
      )}
      <NoteSidebarActions title={note.title} slug={note.slug} editing={editing} onEdit={() => setEditing(true)} onDelete={() => onDeleteNote(note.slug)} />
    </li>
  )
}
