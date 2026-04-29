'use client'

import { useState } from 'react'
import { NotesFolder } from '@/components/notes/sidebar/NotesFolder'
import { NoteSidebarLink } from '@/components/notes/sidebar/NoteSidebarLink'
import { NewFolderInput } from '@/components/notes/sidebar/NewFolderInput'
import { NewNoteInput } from '@/components/notes/sidebar/NewNoteInput'
import type { NoteMeta } from '@/types/NoteRecordType'
import type { NoteFolderNode } from '@/lib/notes/folder-tree'

interface NotesSidebarNavProps {
  roots: NoteFolderNode[]
  unfiled: NoteMeta[]
  activeSlug: string
  creatingRootFolder: boolean
  setCreatingRootFolder: (v: boolean) => void
  creatingRootNote: boolean
  setCreatingRootNote: (v: boolean) => void
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

export function NotesSidebarNav(props: NotesSidebarNavProps) {
  const { roots, unfiled, activeSlug, creatingRootFolder, setCreatingRootFolder, creatingRootNote, setCreatingRootNote, collapseSignal, onCreateFolder, onCreateNote, onDeleteNote, onRenameNote, onChangeNoteEmoji, onMoveNote, onMoveFolder } = props
  const [dragOverRoot, setDragOverRoot] = useState(false)

  return (
    <nav className="flex-1 overflow-y-auto">
      <div className="space-y-2 px-2 py-4">
      {creatingRootFolder && (
        <NewFolderInput
          onCreate={(name) => onCreateFolder(name, null)}
          onCancel={() => setCreatingRootFolder(false)}
        />
      )}
      {creatingRootNote && (
        <NewNoteInput
          onCreate={(title) => onCreateNote(title, null)}
          onCancel={() => setCreatingRootNote(false)}
        />
      )}
      <div
        onDragOver={event => {
          const isFolder = event.dataTransfer.types.includes('application/x-folder-id')
          const isNote = event.dataTransfer.types.includes('application/x-note-slug')
          if (!isFolder && !isNote) return
          event.preventDefault()
          event.dataTransfer.dropEffect = 'move'
          setDragOverRoot(true)
        }}
        onDragLeave={() => setDragOverRoot(false)}
        onDrop={event => {
          event.preventDefault()
          setDragOverRoot(false)
          const folderId = event.dataTransfer.getData('application/x-folder-id')
          const noteSlug = event.dataTransfer.getData('application/x-note-slug')
          if (folderId) void onMoveFolder(folderId, null)
          if (noteSlug) void onMoveNote(noteSlug, null)
        }}
        className={dragOverRoot ? 'min-h-2 bg-accent text-accent-foreground' : 'min-h-2'}
      >
        {unfiled.length > 0 && (
        <ul className="space-y-2">
          {unfiled.map(note => (
            <NoteSidebarLink
              key={note.slug}
              note={note}
              activeSlug={activeSlug}
              onDeleteNote={onDeleteNote}
              onRenameNote={onRenameNote}
              onChangeNoteEmoji={onChangeNoteEmoji}
            />
          ))}
        </ul>
        )}
      </div>
      <div className="space-y-2">
        {roots.map(node => <NotesFolder key={`${node.folder.id}:${collapseSignal}`} {...props} node={node} collapseSignal={collapseSignal} />)}
      </div>
      </div>
    </nav>
  )
}
