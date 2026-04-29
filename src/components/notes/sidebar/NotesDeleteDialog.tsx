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
import { getIncomingReferencesAction } from '@/lib/actions/note-actions'

interface NotesDeleteDialogProps {
  itemType: 'folder' | 'note'
  title:    string
  slug?:    string
  onDelete: () => Promise<void>
  className?: string
}

type IncomingRef = { id: string; title: string; slug: string }

export function NotesDeleteDialog(props: NotesDeleteDialogProps) {
  const { itemType, title, slug, onDelete, className } = props
  const [open,       setOpen]       = useState(false)
  const [error,      setError]      = useState<string | null>(null)
  const [references, setReferences] = useState<IncomingRef[]>([])
  const [isPending,  startTransition] = useTransition()

  async function handleOpen(next: boolean) {
    setOpen(next)
    if (next && itemType === 'note' && slug) {
      const refs = await getIncomingReferencesAction(slug)
      setReferences(refs)
    } else {
      setReferences([])
    }
  }

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
    <Dialog open={open} onOpenChange={handleOpen}>
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

        {references.length > 0 && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/10 px-3 py-2.5 flex flex-col gap-1.5">
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              {references.length} note{references.length > 1 ? 's' : ''} link to this note
            </p>
            <ul className="flex flex-col gap-0.5">
              {references.map((ref) => (
                <li key={ref.id} className="text-xs text-muted-foreground">· {ref.title}</li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">Deleting will leave dead links in those notes.</p>
          </div>
        )}

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
