'use client'

import Link from 'next/link'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WhiteboardCardTitle } from '@/components/whiteboard/WhiteboardCardTitle'
import { WhiteboardPreview } from '@/components/whiteboard/WhiteboardPreview'
import { WhiteboardDeleteDialog } from '@/components/whiteboard/WhiteboardDeleteDialog'
import { cn } from '@/lib/utils'
import type { WhiteboardMeta } from '@/types/whiteboard'

interface WhiteboardCardProps {
  board: WhiteboardMeta
  onBoardUpdated?: (board: WhiteboardMeta) => void
  onBoardDeleted?: (boardId: string) => void
}

export function WhiteboardCard({ board, onBoardUpdated, onBoardDeleted }: WhiteboardCardProps) {
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
          "hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-white/15",
        )}>
          <CardHeader className="gap-3">
            <WhiteboardPreview preview={board.preview} />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-1">
                <WhiteboardCardTitle
                  board={board}
                  onBoardUpdated={onBoardUpdated}
                />
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
