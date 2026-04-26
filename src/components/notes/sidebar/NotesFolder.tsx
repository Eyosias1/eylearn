'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { NoteSidebarLink } from '@/components/notes/sidebar/NoteSidebarLink'
import { NewFolderInput } from '@/components/notes/sidebar/NewFolderInput'
import { NewNoteInput } from '@/components/notes/sidebar/NewNoteInput'
import { NotesFolderRow } from '@/components/notes/sidebar/NotesFolderRow'
import type { NoteFolderNode } from '@/lib/notes/folder-tree'
interface NotesFolderProps {
  node: NoteFolderNode
  activeSlug: string
  collapseSignal: number
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
export function NotesFolder(props: NotesFolderProps) {
  const { node, activeSlug, onCreateFolder, onCreateNote, onDeleteFolder, onDeleteNote, onRenameNote, onChangeNoteEmoji, onRenameFolder, onChangeFolderEmoji, onMoveNote, onMoveFolder } = props
  const [open, setOpen] = useState(props.collapseSignal === 0)
  const [creatingFolder, setCreatingFolder] = useState(false)
  const [creatingNote, setCreatingNote] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  return (
    <div className={cn(
      // border
      "rounded-md",
      // animation
      "transition-colors",
      // conditional
      dragOver && "bg-accent/60",
    )}>
      <NotesFolderRow
        folder={node.folder}
        open={open}
        dragOver={dragOver}
        onToggle={() => setOpen(value => !value)}
        onDragOver={event => {
            event.preventDefault()
            event.stopPropagation()
            event.dataTransfer.dropEffect = 'move'
            setDragOver(true)
        }}
        onDragLeave={event => {
            event.stopPropagation()
            setDragOver(false)
        }}
        onDrop={event => {
            event.preventDefault()
            event.stopPropagation()
            setDragOver(false)
            const folderId = event.dataTransfer.getData('application/x-folder-id')
            if (folderId) {
              if (folderId !== node.folder.id) void onMoveFolder(folderId, node.folder.id)
              return
            }
            const slug = event.dataTransfer.getData('application/x-note-slug')
            if (slug) void onMoveNote(slug, node.folder.id)
        }}
        onCreateNote={() => setCreatingNote(true)}
        onCreateFolder={() => setCreatingFolder(true)}
        onDeleteFolder={() => onDeleteFolder(node.folder.id)}
        onRenameFolder={(name) => onRenameFolder(node.folder.id, name)}
        onChangeFolderEmoji={(emoji) => onChangeFolderEmoji(node.folder.id, emoji)}
      />
      {open && (
        <div className="ml-4 space-y-2 border-l border-border/70 pl-2">
          {creatingFolder && (
            <NewFolderInput
              onCreate={(name) => onCreateFolder(name, node.folder.id)}
              onCancel={() => setCreatingFolder(false)}
            />
          )}
          {creatingNote && (
            <NewNoteInput
              onCreate={(title) => onCreateNote(title, node.folder.id)}
              onCancel={() => setCreatingNote(false)}
            />
          )}
          <ul className="space-y-2">{node.notes.map(note => <NoteSidebarLink key={note.slug} note={note} activeSlug={activeSlug} onDeleteNote={onDeleteNote} onRenameNote={onRenameNote} onChangeNoteEmoji={onChangeNoteEmoji} />)}</ul>
          {node.children.map(child => <NotesFolder key={`${child.folder.id}:${props.collapseSignal}`} {...props} node={child} />)}
        </div>
      )}
    </div>
  )
}
