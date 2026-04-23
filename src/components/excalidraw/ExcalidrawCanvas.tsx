'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { ChevronLeft, Pencil, Save } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useExcalidrawDrawing } from '@/hooks/useExcalidrawDrawing'
import { getBoard, updateBoardTitle } from '@/lib/excalidraw/board-store'
import { localDrawingStore } from '@/lib/excalidraw/local-store'
import type { DrawingStore } from '@/lib/excalidraw/store'

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { ssr: false }
)

interface ExcalidrawCanvasProps {
  drawingId: string
  store?: DrawingStore
}

function getStatusLabel(status: ReturnType<typeof useExcalidrawDrawing>['status'], hasUnsavedChanges: boolean) {
  if (status === 'saving') return 'Saving...'
  if (status === 'saved') return 'Saved'
  if (status === 'error') return 'Save failed'
  if (hasUnsavedChanges) return 'Unsaved changes'
  return 'Local storage'
}

export function ExcalidrawCanvas({ drawingId, store = localDrawingStore }: ExcalidrawCanvasProps) {
  const {
    errorMessage,
    handleChange,
    hasUnsavedChanges,
    initialScene,
    isReady,
    saveNow,
    status,
  } = useExcalidrawDrawing({ drawingId, store })
  const [title, setTitle] = useState('Whiteboard')
  const [draftTitle, setDraftTitle] = useState('Whiteboard')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isRenaming, startRenameTransition] = useTransition()

  useEffect(() => {
    let cancelled = false

    async function loadBoardTitle() {
      const board = await getBoard(drawingId)
      if (cancelled) return
      const nextTitle = board?.title ?? 'Whiteboard'
      setTitle(nextTitle)
      setDraftTitle(nextTitle)
      setIsEditingTitle(false)
    }

    void loadBoardTitle()

    return () => {
      cancelled = true
    }
  }, [drawingId])

  function handleTitleCommit() {
    startRenameTransition(async () => {
      const updated = await updateBoardTitle(drawingId, draftTitle)
      if (updated) {
        setTitle(updated.title)
        setDraftTitle(updated.title)
      } else {
        setDraftTitle(title)
      }

      setIsEditingTitle(false)
    })
  }

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="-ml-2">
              <Link href="/whiteboard">
                <ChevronLeft className="size-4" />
                Boards
              </Link>
            </Button>
          </div>
          {isEditingTitle ? (
            <Input
              autoFocus
              value={draftTitle}
              onChange={event => setDraftTitle(event.target.value)}
              onBlur={handleTitleCommit}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleTitleCommit()
                  event.currentTarget.blur()
                }

                if (event.key === 'Escape') {
                  event.preventDefault()
                  setDraftTitle(title)
                  setIsEditingTitle(false)
                }
              }}
              disabled={isRenaming}
              className="h-9 max-w-md border-transparent px-0 text-sm font-semibold shadow-none focus-visible:border-input focus-visible:px-2.5"
              aria-label="Board title"
            />
          ) : (
            <div className="group flex max-w-md items-center gap-2">
              <p className="truncate text-sm font-semibold">{title}</p>
              <button
                type="button"
                onClick={() => setIsEditingTitle(true)}
                className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
                aria-label="Edit board title"
              >
                <Pencil className="size-3.5" />
              </button>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Autosaves to local storage now and can swap to a DB-backed store later.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={status === 'error' ? 'destructive' : 'secondary'}>
            {getStatusLabel(status, hasUnsavedChanges)}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void saveNow()}
            disabled={!isReady || status === 'saving' || !hasUnsavedChanges}
          >
            <Save className="size-4" />
            Save now
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        {!isReady ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading whiteboard...
          </div>
        ) : (
          <div className="h-full">
            <Excalidraw
              key={drawingId}
              initialData={initialScene}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="border-t px-4 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      )}
    </section>
  )
}
