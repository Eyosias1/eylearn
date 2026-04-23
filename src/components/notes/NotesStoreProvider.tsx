'use client'

import { createContext, useContext } from 'react'
import { useNotesStore, type NoteSaveState } from '@/hooks/useNotesStore'
import type { NoteMeta, NoteRecord } from '@/types/NoteRecordType'

interface NotesStoreContext {
  notes: NoteMeta[]
  status: NoteSaveState
  isLoaded: boolean
  getNote: (slug: string) => NoteMeta | null
  createNote: (note: NoteRecord) => Promise<void>
  updateNote: (slug: string, updates: Partial<NoteRecord>) => Promise<void>
  removeNote: (slug: string) => Promise<void>
}

const Ctx = createContext<NotesStoreContext | null>(null)

export function NotesStoreProvider({
  initialNotes,
  children,
}: {
  initialNotes: NoteMeta[]
  children: React.ReactNode
}) {
  const store = useNotesStore(initialNotes)
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useNotesContext(): NotesStoreContext {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useNotesContext must be used inside NotesStoreProvider')
  return ctx
}
