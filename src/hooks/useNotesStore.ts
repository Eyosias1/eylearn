'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { NoteMeta, NoteRecord } from '@/types/NoteRecordType'
import { createNoteAction, updateNoteAction, deleteNoteAction } from '@/lib/actions/note-actions'

export type NoteSaveState = 'idle' | 'saving' | 'saved' | 'error'

export function useNotesStore(initialNotes: NoteMeta[] = []) {
  const router = useRouter()
  const [notes, setNotes] = useState(initialNotes)
  const [status, setStatus] = useState<NoteSaveState>('idle')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setNotes(initialNotes)
    setIsLoaded(true)
  }, [initialNotes])

  const run = useCallback(async (task: () => Promise<void>) => {
    setStatus('saving')
    try {
      await task()
      router.refresh()
      setStatus('saved')
    } catch {
      setStatus('error')
      throw new Error('Note store operation failed')
    }
  }, [router])

  return {
    notes,
    status,
    isLoaded,
    getNote: (slug: string) => notes.find(n => n.slug === slug) ?? null,
    createNote: (note: NoteRecord) => run(() => createNoteAction(note)),
    updateNote: (slug: string, updates: Partial<NoteRecord>) => run(() => updateNoteAction(slug, updates)),
    removeNote: (slug: string) => run(() => deleteNoteAction(slug)),
  }
}
