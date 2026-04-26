'use client'

import { createContext, useContext } from 'react'
import { useNotesStore, type NoteSaveState } from '@/hooks/useNotesStore'
import type { NoteMeta, NoteRecord } from '@/types/NoteRecordType'
import type { NoteFolder } from '@/types/NoteFolderType'

interface NotesStoreContext {
  notes: NoteMeta[]
  folders: NoteFolder[]
  status: NoteSaveState
  isLoaded: boolean
  getNote: (slug: string) => NoteMeta | null
  createNote: (note: NoteRecord) => Promise<void>
  updateNote: (slug: string, updates: Partial<NoteRecord>) => Promise<void>
  removeNote: (slug: string) => Promise<void>
  createFolder: (name: string, parentId: string | null) => Promise<void>
  removeFolder: (id: string) => Promise<void>
  moveFolder: (id: string, parentId: string | null) => Promise<void>
  updateFolder: (id: string, name: string) => Promise<void>
  updateFolderEmoji: (id: string, emoji: string) => Promise<void>
}

const Ctx = createContext<NotesStoreContext | null>(null)

export function NotesStoreProvider({
  initialNotes,
  initialFolders,
  children,
}: {
  initialNotes: NoteMeta[]
  initialFolders: NoteFolder[]
  children: React.ReactNode
}) {
  // Mount once at `src/app/(app)/notes/layout.tsx`; child components should use `useNotesContext()`.
  const store = useNotesStore(initialNotes, initialFolders)
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useNotesContext(): NotesStoreContext {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useNotesContext must be used inside NotesStoreProvider')
  return ctx
}
