'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { Eye, Pencil, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { NoteRecord } from '@/types/NoteRecordType'
import type { NoteChunk } from '@/types/NoteChunk'
import { NoteRenderer } from '@/components/notes/renderer/NoteRenderer'
import { renderNote } from '@/lib/actions/render-note'

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
        <div className="absolute top-0 right-0 flex items-center gap-1">
          {statusLabel && <span className="self-center text-xs text-muted-foreground">{statusLabel}</span>}
          {dirty && (
            <Button variant="ghost" size="icon-sm" onClick={handleSave} disabled={isPending} title="Save changes" className="text-muted-foreground">
              <Save className="size-5" />
            </Button>
          )}
          <Button variant="ghost" size="lg" onClick={handleTogglePreview} title={raw ? 'Switch to preview' : 'Edit raw markdown'} className="text-muted-foreground">
            {raw ? <Eye className="size-5" /> : <Pencil className="size-5" />}
          </Button>
        </div>
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
    </>
  )
}
