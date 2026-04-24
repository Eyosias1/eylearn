'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WhiteboardCard } from '@/components/excalidraw/WhiteboardCard'
import { createWhiteboardAction } from '@/lib/actions/whiteboard-actions'
import type { WhiteboardMeta } from '@/types/whiteboard'

interface WhiteboardGalleryProps {
  initialBoards: WhiteboardMeta[]
}

type BoardAction =
  | { type: 'created'; board: WhiteboardMeta }
  | { type: 'updated'; board: WhiteboardMeta }
  | { type: 'deleted'; boardId: string }

function updateBoards(boards: WhiteboardMeta[], action: BoardAction) {
  if (action.type === 'created') return [action.board, ...boards]
  if (action.type === 'deleted') return boards.filter(board => board.id !== action.boardId)
  return boards.map(board => board.id === action.board.id ? action.board : board)
}

export function WhiteboardGallery({ initialBoards }: WhiteboardGalleryProps) {
  const [boards, updateOptimisticBoards] = useOptimistic(initialBoards, updateBoards)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleCreateBoard() {
    startTransition(async () => {
      const board = await createWhiteboardAction()
      updateOptimisticBoards({ type: 'created', board })
      router.push(`/whiteboard/${board.id}`)
    })
  }

  function handleBoardUpdated(updatedBoard: WhiteboardMeta) {
    startTransition(() => updateOptimisticBoards({ type: 'updated', board: updatedBoard }))
  }

  function handleBoardDeleted(boardId: string) {
    startTransition(() => updateOptimisticBoards({ type: 'deleted', boardId }))
  }

  return (
    <main className="container mx-auto flex max-w-6xl flex-col gap-8 px-8 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Whiteboards</h1>
          <p className="text-sm text-muted-foreground">
            Create visual canvases and reopen them anytime from this gallery.
          </p>
        </div>

        <Button onClick={handleCreateBoard} disabled={isPending}>
          <Plus className="size-4" />
          New board
        </Button>
      </div>

      {boards.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-muted/20 px-6 py-16 text-center">
          <div className="mx-auto flex max-w-md flex-col items-center gap-4">
            <div className="rounded-2xl border bg-background p-4 shadow-sm">
              <Plus className="size-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">No boards yet</h2>
              <p className="text-sm text-muted-foreground">
                Start with a fresh whiteboard and it will appear here with its latest saved preview.
              </p>
            </div>
            <Button onClick={handleCreateBoard} disabled={isPending}>
              <Plus className="size-4" />
              Create your first board
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {boards.map(board => (
            <WhiteboardCard
              key={board.id}
              board={board}
              onBoardUpdated={handleBoardUpdated}
              onBoardDeleted={handleBoardDeleted}
            />
          ))}
        </div>
      )}
    </main>
  )
}
