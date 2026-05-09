'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { NoteCardActions } from '@/components/notes/list/NoteCardActions'
import { cn } from '@/lib/utils'
import type { NoteMeta } from '@/types/NoteRecordType'

const statusColor: Record<string, string> = {
  mastered:  'bg-blue-100   text-blue-700',
  reviewing: 'bg-orange-100 text-orange-700',
  learning:  'bg-purple-100 text-purple-700',
}

const difficultyColor: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  hard: 'bg-red-100   text-red-700',
}

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
      <NoteCardActions
        title={note.title}
        slug={note.slug}
        onEdit={() => setIsEditingTitle(true)}
        onDelete={() => onDelete(note.slug)}
      />
      <Card className={cn("cursor-pointer", "transition-shadow hover:shadow-md")}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base pr-10">
            {isEditingTitle ? (
              <Input
                autoFocus
                value={draftTitle}
                onChange={e => setDraftTitle(e.target.value)}
                onBlur={handleRenameCommit}
                onKeyDown={e => {
                  if (e.key === 'Enter')  { e.preventDefault(); handleRenameCommit(); e.currentTarget.blur() }
                  if (e.key === 'Escape') { e.preventDefault(); setDraftTitle(note.title); setIsEditingTitle(false) }
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
          <p className="text-xs text-muted-foreground">
            {note.subject} · {note.topic}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          <Link
            href={`/notes/${note.slug}`}
            prefetch={false}
            className="flex flex-wrap items-center gap-1.5"
          >
            <Badge className={cn("text-xs", statusColor[note.status] ?? '')}>
              {note.status}
            </Badge>

            {note.difficulty !== 'medium' && (
              <Badge className={cn("text-xs", difficultyColor[note.difficulty] ?? '')}>
                {note.difficulty}
              </Badge>
            )}

            {note.tags?.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
