'use client'

import { useState, useTransition, type DragEvent } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { NotesFolderActions } from '@/components/notes/sidebar/NotesFolderActions'
import { SidebarEmojiPicker } from '@/components/notes/sidebar/SidebarEmojiPicker'
import type { NoteFolder } from '@/types/NoteFolderType'

const folderEmojis = ['📁', '📚', '🧬', '⚗️', '📐', '💻', '🧠', '⭐']

interface NotesFolderRowProps {
  folder: NoteFolder
  open: boolean
  dragOver: boolean
  onToggle: () => void
  onDragOver: (event: DragEvent<HTMLButtonElement>) => void
  onDragLeave: (event: DragEvent<HTMLButtonElement>) => void
  onDrop: (event: DragEvent<HTMLButtonElement>) => void
  onCreateNote: () => void
  onCreateFolder: () => void
  onDeleteFolder: () => Promise<void>
  onRenameFolder: (name: string) => Promise<void>
  onChangeFolderEmoji: (emoji: string) => Promise<void>
}

export function NotesFolderRow(props: NotesFolderRowProps) {
  const { folder, open, dragOver, onToggle, onDragOver, onDragLeave, onDrop } = props
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(folder.name)
  const [isPending, startTransition] = useTransition()

  function commitName() {
    const name = draftName.trim()
    if (!name || name === folder.name) {
      setDraftName(folder.name)
      setEditing(false)
      return
    }
    startTransition(async () => {
      await props.onRenameFolder(name)
      setEditing(false)
    })
  }

  return (
    <div className={cn("group/folder relative my-1.5 flex items-center")}>
      {!editing && (
        <SidebarEmojiPicker
          value={folder.emoji ?? '📁'}
          options={folderEmojis}
          onChange={props.onChangeFolderEmoji}
          className="absolute left-10 top-1/2 z-10 -translate-y-1/2 opacity-100"
        />
      )}
      {editing ? (
        <Input
          autoFocus
          value={draftName}
          disabled={isPending}
          onChange={event => setDraftName(event.target.value)}
          onBlur={commitName}
          onKeyDown={event => {
            if (event.key === 'Enter') { event.preventDefault(); commitName() }
            if (event.key === 'Escape') { event.preventDefault(); setDraftName(folder.name); setEditing(false) }
          }}
          className="mx-1 h-10 min-w-0 flex-1 pl-8 text-sm"
        />
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="default"
          draggable
          onDragStart={event => {
            event.stopPropagation()
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('application/x-folder-id', folder.id)
          }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onToggle}
          className={cn(
            "h-10 min-w-0 flex-1 justify-start gap-2.5 mx-1 p-2 pr-32 text-sm font-medium text-muted-foreground",
            dragOver && "bg-accent text-accent-foreground",
          )}
        >
          <ChevronRight className={cn("size-4 transition-transform", open && "rotate-90")} />
          <span className="w-6 shrink-0" />
          <span className="truncate">{folder.name}</span>
        </Button>
      )}
      <NotesFolderActions title={folder.name} onEdit={() => setEditing(true)} onCreateNote={props.onCreateNote} onCreateFolder={props.onCreateFolder} onDelete={props.onDeleteFolder} />
    </div>
  )
}
