import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { NoteMeta } from '@/lib/get-note'

const difficultyColor: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
}

const statusColor: Record<string, string> = {
  mastered: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-orange-100 text-orange-700',
  learning: 'bg-purple-100 text-purple-700',
}

export function NoteCard({ note }: { note: NoteMeta }) {
  return (
    <Link href={`/notes/${note.slug}`}>
      <Card className={cn("cursor-pointer", "hover:shadow-md transition-shadow")}>
        <CardHeader>
          <div className={cn("flex items-start justify-between", "gap-2")}>
            <CardTitle className="text-base">{note.title}</CardTitle>
            <Badge className={cn(difficultyColor[note.difficulty] ?? '')}>
              {note.difficulty}
            </Badge>
          </div>
          <div className={cn("flex items-center gap-2", "text-sm text-muted-foreground")}>
            <span>{note.subject}</span>
            <span>·</span>
            <span>{note.topic}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className={cn("flex flex-wrap items-center gap-2")}>
            <Badge className={cn(statusColor[note.status] ?? '')}>
              {note.status}
            </Badge>
            {note.tags?.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
