'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Clock3, Pencil } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { WhiteboardPreview } from '@/components/excalidraw/WhiteboardPreview'
import { WhiteboardDeleteDialog } from '@/components/excalidraw/WhiteboardDeleteDialog'
import { updateWhiteboardTitleAction } from '@/lib/actions/whiteboard-actions'
import { cn } from '@/lib/utils'
import type { WhiteboardMeta } from '@/types/whiteboard'

interface WhiteboardCardProps {
  board: WhiteboardMeta
  onBoardUpdated?: (board: WhiteboardMeta) => void
  onBoardDeleted?: (boardId: string) => void
}

export function WhiteboardCard({ board, onBoardUpdated, onBoardDeleted }: WhiteboardCardProps) {
  const [draftTitle, setDraftTitle] = useState(board.title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isRenaming, startRenameTransition] = useTransition()

  function handleTitleCommit() {
    startRenameTransition(async () => {
      const updated = await updateWhiteboardTitleAction(board.id, draftTitle)
      if (!updated) {
        setDraftTitle(board.title)
        setIsEditingTitle(false)
        return
      }
      setDraftTitle(updated.title)
      setIsEditingTitle(false)
      onBoardUpdated?.(updated)
    })
  }

  return (
    <div className={cn("group/card relative")}>
      {/* Delete button sits outside the Link so it never bubbles into navigation */}
      <div className={cn(
        // layout
        "absolute right-3 top-3 z-10",
        // animation
        "opacity-100 sm:opacity-0 sm:transition-opacity",
        // hover
        "sm:group-hover/card:opacity-100",
      )}>
        <WhiteboardDeleteDialog boardId={board.id} title={board.title} onDeleted={onBoardDeleted} />
      </div>

      <Link href={`/whiteboard/${board.id}`} className="block">
        <Card className={cn(
          // layout
          "gap-3",
          // animation
          "transition-all",
          // hover
          "hover:-translate-y-0.5 hover:shadow-md",
        )}>
          <CardHeader className="gap-3">
            <WhiteboardPreview preview={board.preview} />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-1">
                <CardTitle>
                  {isEditingTitle ? (
                    <Input
                      autoFocus
                      value={draftTitle}
                      onChange={e => setDraftTitle(e.target.value)}
                      onBlur={handleTitleCommit}
                      onClick={e => e.preventDefault()}
                      onPointerDown={e => e.stopPropagation()}
                      onKeyDown={e => {
                        if (e.key === 'Enter') { e.preventDefault(); handleTitleCommit(); e.currentTarget.blur() }
                        if (e.key === 'Escape') { e.preventDefault(); setDraftTitle(board.title); setIsEditingTitle(false) }
                      }}
                      disabled={isRenaming}
                      className="h-8 border-transparent px-0 text-base font-medium shadow-none focus-visible:border-input focus-visible:px-2.5"
                      aria-label="Board title"
                    />
                  ) : (
                    <div className="group/title flex items-center gap-2">
                      <span className="truncate">{board.title}</span>
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          setDraftTitle(board.title)
                          setIsEditingTitle(true)
                        }}
                        className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover/title:opacity-100"
                        aria-label="Edit board title"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                    </div>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="size-3.5" />
                  <span>{formatDistanceToNow(new Date(board.updated_at), { addSuffix: true })}</span>
                </div>
              </div>
              <Badge variant="outline" className="gap-1">
                Open
                <ArrowUpRight className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-muted-foreground">
            {board.preview.elementCount === 0
              ? 'Start sketching on this blank board.'
              : `${board.preview.elementCount} element${board.preview.elementCount === 1 ? '' : 's'} saved.`}
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
