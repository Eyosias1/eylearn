import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface NoteMetricsBadgeProps {
  content: string
}

export function NoteMetricsBadge({ content }: NoteMetricsBadgeProps) {
  const words = content.trim() ? content.trim().split(/\s+/).length : 0
  const characters = content.length

  return (
    <Badge
      variant="outline"
      className={cn(
        // spacing
        "px-2.5 py-1",
        // typography
        "font-mono text-[11px]",
        // colors
        "bg-background/80 text-muted-foreground",
      )}
    >
      {words} {words === 1 ? 'word' : 'words'} · {characters} {characters === 1 ? 'character' : 'characters'}
    </Badge>
  )
}
