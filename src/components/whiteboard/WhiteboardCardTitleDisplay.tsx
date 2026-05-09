import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WhiteboardCardTitleDisplayProps {
  title: string
  onEdit: () => void
}

export function WhiteboardCardTitleDisplay({
  title,
  onEdit,
}: WhiteboardCardTitleDisplayProps) {
  return (
    <div className={cn(
      // layout
      "group/title flex items-center",
      // spacing
      "gap-2",
    )}>
      <span className={cn(
        // layout
        "truncate",
      )}>
        {title}
      </span>
      <Button
        type="button"
        variant="ghost"
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          onEdit()
        }}
        className={cn(
          // spacing
          "p-1",
          // colors
          "text-muted-foreground",
          // border
          "rounded-md",
          // animation
          "opacity-0 transition-opacity",
          // hover
          "hover:bg-muted hover:text-foreground group-hover/title:opacity-100",
        )}
        aria-label="Edit board title"
      >
        <Pencil className={cn(
          // sizing
          "size-3.5",
        )} />
      </Button>
    </div>
  )
}
