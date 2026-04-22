import { cn } from '@/lib/utils'

interface InlineCodeProps {
  children?: React.ReactNode
  className?: string
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code className={cn(
      // layout
      "inline",
      // spacing
      "rounded px-1.5 py-0.5",
      // typography
      "text-sm font-semibold [font-family:var(--font-mono)]",
      // colors
      "bg-muted text-foreground",
      className,
    )}>
      {children}
    </code>
  )
}
