'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { NoteMeta } from '@/types/NoteRecordType'

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

interface NoteCardProps {
  note: NoteMeta
  onDelete: (slug: string, title: string) => void
  onRename: (slug: string, title: string) => Promise<void>
}

export function NoteCard({ note, onDelete, onRename }: NoteCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [draftTitle, setDraftTitle] = useState(note.title)
  const [isPending, startTransition] = useTransition()

  function handleRenameCommit() {
    startTransition(async () => {
      await onRename(note.slug, draftTitle)
      setIsEditingTitle(false)
    })
  }

  return (
    <Link href={`/notes/${note.slug}`} prefetch>
      <Card className={cn("group/card cursor-pointer", "transition-shadow hover:shadow-md")}>
        <CardHeader>
          <div className={cn("flex items-start justify-between", "gap-2")}>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base">
                {isEditingTitle ? (
                  <Input
                    autoFocus
                    value={draftTitle}
                    onChange={event => setDraftTitle(event.target.value)}
                    onBlur={handleRenameCommit}
                    onClick={event => event.preventDefault()}
                    onPointerDown={event => event.stopPropagation()}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        event.preventDefault()
                        handleRenameCommit()
                        event.currentTarget.blur()
                      }

                      if (event.key === 'Escape') {
                        event.preventDefault()
                        setDraftTitle(note.title)
                        setIsEditingTitle(false)
                      }
                    }}
                    disabled={isPending}
                    className="h-8 border-transparent px-0 text-base font-medium shadow-none focus-visible:border-input focus-visible:px-2.5"
                    aria-label="Note title"
                  />
                ) : (
                  <span className="truncate">{note.title}</span>
                )}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Badge className={cn(difficultyColor[note.difficulty] ?? '')}>
                {note.difficulty}
              </Badge>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  setIsEditingTitle(true)
                }}
                className="opacity-0 transition-opacity group-hover/card:opacity-100"
                title="Edit title"
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  onDelete(note.slug, note.title)
                }}
                className="opacity-0 transition-opacity group-hover/card:opacity-100"
                title="Delete note"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
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
