'use client'

import { startTransition, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { NoteMeta, NoteRecord } from '@/types/NoteRecordType'
import type { NoteFolder } from '@/types/NoteFolderType'
import { createNoteAction, updateNoteAction, deleteNoteAction } from '@/lib/actions/note-actions'
import { createNoteFolderAction, deleteNoteFolderAction, moveNoteFolderAction, updateNoteFolderAction, updateNoteFolderEmojiAction } from '@/lib/actions/note-folder-actions'

export type NoteSaveState = 'idle' | 'saving' | 'saved' | 'error'

export function useNotesStore(initialNotes: NoteMeta[] = [], initialFolders: NoteFolder[] = []) {
  const router = useRouter()
  const [status, setStatus] = useState<NoteSaveState>('idle')

  const run = useCallback(async (task: () => Promise<void>) => {
    setStatus('saving')
    try {
      await task()
      setStatus('saved')
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      setStatus('error')
      throw error instanceof Error ? error : new Error('Note store operation failed')
    }
  }, [router])

  return {
    notes: initialNotes,
    folders: initialFolders,
    status,
    isLoaded: true,
    getNote: (slug: string) => initialNotes.find(n => n.slug === slug) ?? null,
    createNote: (note: NoteRecord) => run(() => createNoteAction(note)),
    updateNote: (slug: string, updates: Partial<NoteRecord>) => run(() => updateNoteAction(slug, updates)),
    removeNote: (slug: string) => run(() => deleteNoteAction(slug)),
    createFolder: (name: string, parentId: string | null) => run(() => createNoteFolderAction(name, parentId)),
    removeFolder: (id: string) => run(() => deleteNoteFolderAction(id)),
    moveFolder: (id: string, parentId: string | null) => run(() => moveNoteFolderAction(id, parentId)),
    updateFolder: (id: string, name: string) => run(() => updateNoteFolderAction(id, name)),
    updateFolderEmoji: (id: string, emoji: string) => run(() => updateNoteFolderEmojiAction(id, emoji)),
  }
}
