'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { cn } from '@/lib/utils'
import type { NoteRecord } from '@/types/NoteRecordType'
import type { NoteChunk } from '@/types/NoteChunk'
import { NoteRenderer } from '@/components/notes/renderer/NoteRenderer'
import { NoteMetricsBadge } from '@/components/notes/page/NoteMetricsBadge'
import { NotePageActions } from '@/components/notes/page/NotePageActions'
import { renderNote } from '@/lib/actions/render-note'
import { useRegisterNoteAssistantContext } from '@/hooks/useRegisterNoteAssistantContext'

interface NotePageClientProps {
  note: NoteRecord
  serverContent: React.ReactNode  // server-rendered slot, shown until user saves
  postSaveChunks: NoteChunk[] | null
  saveState: 'idle' | 'saving' | 'saved' | 'error'
  onAutosave: (content: string) => Promise<void>
  onSave: (content: string) => Promise<void>
  children: React.ReactNode       // header
}

const AUTOSAVE_DELAY_MS = 1000

export function NotePageClient({ note, serverContent, postSaveChunks, saveState, onAutosave, onSave, children }: NotePageClientProps) {
  const [raw, setRaw] = useState(false)
  const [content, setContent] = useState(note.content)
  const [previewChunks, setPreviewChunks] = useState<NoteChunk[] | null>(null)
  const [isPending, startTransition] = useTransition()
  const dirty = content !== note.content
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useRegisterNoteAssistantContext(note, content, dirty)

  useEffect(() => {
    if (!dirty) return
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    autosaveTimer.current = setTimeout(() => { void onAutosave(content) }, AUTOSAVE_DELAY_MS)
    return () => { if (autosaveTimer.current) clearTimeout(autosaveTimer.current) }
  }, [content, dirty, onAutosave])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [content, raw])

  async function handleTogglePreview() {
    if (raw && dirty) {
      const chunks = await renderNote(content)
      setPreviewChunks(chunks)
    }
    setRaw(r => !r)
  }

  function handleSave() {
    startTransition(async () => {
      await onSave(content)
      setPreviewChunks(null)
    })
  }

  const statusLabel = dirty ? 'Unsaved' : saveState === 'saved' ? 'Saved' : saveState === 'saving' ? 'Saving' : ''
  const textareaClasses = cn("w-full resize-none overflow-hidden", "text-sm leading-relaxed", "font-[family-name:var(--font-mono)]", "bg-transparent text-foreground", "outline-none")

  return (
    <>
      <div className="relative">
        {children}
        <NotePageActions dirty={dirty} isPending={isPending} raw={raw} statusLabel={statusLabel} onSave={handleSave} onTogglePreview={handleTogglePreview} />
      </div>

      <div className="mt-10">
        {raw
          ? <textarea ref={textareaRef} value={content} onChange={e => setContent(e.target.value)} className={textareaClasses} spellCheck={false} />
          : previewChunks
            ? <NoteRenderer chunks={previewChunks} />
            : postSaveChunks
              ? <NoteRenderer chunks={postSaveChunks} />
              : serverContent
        }
      </div>
      <div
        className={cn(
          // layout
          "sticky bottom-2 z-30 flex translate-x-3 translate-y-2 justify-end",
          // spacing
          "mt-6",
        )}
      >
        <NoteMetricsBadge content={content} />
      </div>
    </>
  )
}
