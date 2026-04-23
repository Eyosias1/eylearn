import { useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Clock3, Pencil } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WhiteboardPreview } from '@/components/excalidraw/WhiteboardPreview'
import { Input } from '@/components/ui/input'
import { updateBoardTitle } from '@/lib/excalidraw/board-store'
import type { WhiteboardMeta } from '@/types/whiteboard'

interface WhiteboardCardProps {
  board: WhiteboardMeta
  onBoardUpdated?: (board: WhiteboardMeta) => void
}

export function WhiteboardCard({ board, onBoardUpdated }: WhiteboardCardProps) {
  const [title, setTitle] = useState(board.title)
  const [draftTitle, setDraftTitle] = useState(board.title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isRenaming, startRenameTransition] = useTransition()

  function handleTitleCommit() {
    startRenameTransition(async () => {
      const updated = await updateBoardTitle(board.id, draftTitle)
      if (!updated) {
        setDraftTitle(title)
        setIsEditingTitle(false)
        return
      }

      setTitle(updated.title)
      setDraftTitle(updated.title)
      setIsEditingTitle(false)
      onBoardUpdated?.(updated)
    })
  }

  return (
    <Link href={`/whiteboard/${board.id}`}>
      <Card className="cursor-pointer gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="gap-3">
          <WhiteboardPreview preview={board.preview} />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-1">
              <CardTitle>
                {isEditingTitle ? (
                  <Input
                    autoFocus
                    value={draftTitle}
                    onChange={event => setDraftTitle(event.target.value)}
                    onBlur={handleTitleCommit}
                    onClick={event => event.preventDefault()}
                    onPointerDown={event => event.stopPropagation()}
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
                    className="h-8 border-transparent px-0 text-base font-medium shadow-none focus-visible:border-input focus-visible:px-2.5"
                    aria-label="Board title"
                  />
                ) : (
                  <div className="group/title flex items-center gap-2">
                    <span className="truncate">{title}</span>
                    <button
                      type="button"
                      onClick={event => {
                        event.preventDefault()
                        event.stopPropagation()
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
                <span>{formatDistanceToNow(new Date(board.updatedAt), { addSuffix: true })}</span>
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
  )
}
