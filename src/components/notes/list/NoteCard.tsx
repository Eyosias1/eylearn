'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { NoteCardActions } from '@/components/notes/list/NoteCardActions'
import { cn } from '@/lib/utils'
import type { NoteMeta } from '@/types/NoteRecordType'

const difficultyColor: Record<string, string> = { easy: 'bg-green-100 text-green-700', medium: 'bg-yellow-100 text-yellow-700', hard: 'bg-red-100 text-red-700' }
const statusColor: Record<string, string> = { mastered: 'bg-blue-100 text-blue-700', reviewing: 'bg-orange-100 text-orange-700', learning: 'bg-purple-100 text-purple-700' }

interface NoteCardProps {
  note: NoteMeta
  onDelete: (slug: string) => Promise<void>
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
    <div className={cn("group/card relative")}>
      <NoteCardActions title={note.title} slug={note.slug} onEdit={() => setIsEditingTitle(true)} onDelete={() => onDelete(note.slug)} />
      <Card className={cn("cursor-pointer", "transition-shadow hover:shadow-md")}>
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
                    onKeyDown={event => {
                      if (event.key === 'Enter') { event.preventDefault(); handleRenameCommit(); event.currentTarget.blur() }
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
                  <Link href={`/notes/${note.slug}`} prefetch={false} className="block truncate">
                    {note.title}
                  </Link>
                )}
              </CardTitle>
            </div>
            <div className="mr-14 flex items-center gap-1">
              <Badge className={cn(difficultyColor[note.difficulty] ?? '')}>
                {note.difficulty}
              </Badge>
            </div>
          </div>
          <Link href={`/notes/${note.slug}`} prefetch={false} className={cn("flex items-center gap-2", "text-sm text-muted-foreground")}>
              <span>{note.subject}</span>
              <span>·</span>
              <span>{note.topic}</span>
            </Link>
        </CardHeader>
        <CardContent>
          <Link href={`/notes/${note.slug}`} prefetch={false} className={cn("flex flex-wrap items-center gap-2")}>
            <Badge className={cn(statusColor[note.status] ?? '')}>
              {note.status}
            </Badge>
            {note.tags?.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
