'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { renderNote } from '@/lib/actions/render-note'
import { updateNoteAction } from '@/lib/actions/note-actions'
import { NotePageClient } from '@/components/notes/NotePageClient'
import { NotePageHeader } from '@/components/notes/page/NotePageHeader'
import type { NoteRecord } from '@/types/NoteRecordType'
import type { NoteChunk } from '@/types/NoteChunk'
import type { NoteSaveState } from '@/hooks/useNotesStore'

interface NotePageShellProps {
  serverNote: NoteRecord
  children: React.ReactNode  // server-rendered NoteRenderer — never serialized as a prop
}

export function NotePageShell({ serverNote, children }: NotePageShellProps) {
  const router = useRouter()
  const [note, setNote] = useState<NoteRecord>(serverNote)
  const [postSaveChunks, setPostSaveChunks] = useState<NoteChunk[] | null>(null)
  const [status, setStatus] = useState<NoteSaveState>('idle')

  async function handleSave(content: string) {
    setStatus('saving')
    try {
      await updateNoteAction(note.slug, { content })
      setNote(prev => ({ ...prev, content }))
      const newChunks = await renderNote(content)
      setPostSaveChunks(newChunks)
      router.refresh()
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  return (
    <NotePageClient
      key={note.slug}
      note={note}
      serverContent={children}
      postSaveChunks={postSaveChunks}
      saveState={status}
      onAutosave={(content) => updateNoteAction(note.slug, { content })}
      onSave={handleSave}
    >
      <NotePageHeader note={note} />
    </NotePageClient>
  )
}
