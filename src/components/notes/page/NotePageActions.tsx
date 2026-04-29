import { Eye, Pencil, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NotePageActionsProps {
  dirty: boolean
  isPending: boolean
  raw: boolean
  statusLabel: string
  onSave: () => void
  onTogglePreview: () => void
}

export function NotePageActions({ dirty, isPending, raw, statusLabel, onSave, onTogglePreview }: NotePageActionsProps) {
  return (
    <div className="absolute top-0 right-0 flex items-center gap-1">
      {statusLabel && <span className="self-center text-xs text-muted-foreground">{statusLabel}</span>}
      {dirty && (
        <Button variant="ghost" size="icon-sm" onClick={onSave} disabled={isPending} title="Save changes" className="text-muted-foreground">
          <Save className="size-5" />
        </Button>
      )}
      <Button variant="ghost" size="lg" onClick={onTogglePreview} title={raw ? 'Switch to preview' : 'Edit raw markdown'} className="text-muted-foreground">
        {raw ? <Eye className="size-5" /> : <Pencil className="size-5" />}
      </Button>
    </div>
  )
}
