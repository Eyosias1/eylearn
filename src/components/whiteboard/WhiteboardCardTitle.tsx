'use client'

import { useState, useTransition } from 'react'
import type { KeyboardEvent } from 'react'
import { CardTitle } from '@/components/ui/card'
import { WhiteboardCardTitleDisplay } from '@/components/whiteboard/WhiteboardCardTitleDisplay'
import { WhiteboardCardTitleInput } from '@/components/whiteboard/WhiteboardCardTitleInput'
import { updateWhiteboardTitleAction } from '@/lib/actions/whiteboards'
import type { WhiteboardMeta } from '@/types/whiteboard'

interface WhiteboardCardTitleProps {
  board: WhiteboardMeta
  onBoardUpdated?: (board: WhiteboardMeta) => void
}

export function WhiteboardCardTitle({
  board,
  onBoardUpdated,
}: WhiteboardCardTitleProps) {
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

  function handleTitleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleTitleCommit()
      event.currentTarget.blur()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      setDraftTitle(board.title)
      setIsEditingTitle(false)
    }
  }

  return (
    <CardTitle>
      {isEditingTitle ? (
        <WhiteboardCardTitleInput
          value={draftTitle}
          disabled={isRenaming}
          onChange={setDraftTitle}
          onBlur={handleTitleCommit}
          onKeyDown={handleTitleKeyDown}
        />
      ) : (
        <WhiteboardCardTitleDisplay
          title={board.title}
          onEdit={() => {
            setDraftTitle(board.title)
            setIsEditingTitle(true)
          }}
        />
      )}
    </CardTitle>
  )
}
