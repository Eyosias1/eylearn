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
import { cn } from '@/lib/utils'

interface NotesDeleteDialogProps {
  itemType: 'folder' | 'note'
  title: string
  onDelete: () => Promise<void>
  className?: string
}

export function NotesDeleteDialog(props: NotesDeleteDialogProps) {
  const { itemType, title, onDelete, className } = props
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      try {
        setError(null)
        await onDelete()
        setOpen(false)
      } catch (deleteError) {
        setError(deleteError instanceof Error ? deleteError.message : `Could not delete ${itemType}`)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className={cn("hover:text-red-500", className)}
          title={`Delete ${itemType}`}
        >
          <Trash2 className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Delete {itemType}?</DialogTitle>
          <DialogDescription>
            This will permanently delete <strong>{title}</strong>
            {itemType === 'folder' ? ' and everything inside it' : ''}. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
            {error}
          </p>
        )}
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
