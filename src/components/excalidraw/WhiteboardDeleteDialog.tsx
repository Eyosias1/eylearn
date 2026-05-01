'use client'

import { useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteWhiteboardAction } from '@/lib/actions/whiteboards'

interface WhiteboardDeleteDialogProps {
  boardId: string
  title: string
  onDeleted?: (boardId: string) => void
}

export function WhiteboardDeleteDialog({ boardId, title, onDeleted }: WhiteboardDeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      await deleteWhiteboardAction(boardId)
      onDeleted?.(boardId)
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="default"
          className="[&_svg]:size-5 bg-background/90 text-muted-foreground shadow-sm backdrop-blur hover:bg-destructive/10 hover:text-destructive"
          aria-label="Delete whiteboard"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete whiteboard?</DialogTitle>
          <DialogDescription>
            This will permanently delete “{title}”. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
