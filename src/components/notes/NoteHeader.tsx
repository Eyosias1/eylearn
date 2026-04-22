import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { NoteMeta } from '@/lib/get-note'

export function NoteHeader({ note }: { note: NoteMeta }) {
  return (
    <div className={cn("flex flex-col", "gap-3 pb-6 ")}>
      <div className={cn("flex flex-wrap gap-2")}>
        <Badge variant="secondary">{note.subject}</Badge>
        <Badge variant="outline">{note.topic}</Badge>
      </div>
      <h1 className={cn("text-3xl font-bold")}>{note.title}</h1>
      <div className={cn("flex flex-wrap gap-2", "text-sm text-muted-foreground")}>
        {note.tags?.map(tag => (
          <span key={tag} className="text-xs text-muted-foreground">#{tag}</span>
        ))}
      </div>
      <div className={cn("flex gap-2")}>
        <Badge>{note.status}</Badge>
        <Badge variant="outline">{note.difficulty}</Badge>
        <span className={cn("text-xs text-muted-foreground", "self-center")}>{note.date}</span>
      </div>
    </div>
  )
}
