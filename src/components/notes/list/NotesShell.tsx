'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NoteCard } from '@/components/notes/list/NoteCard'
import { NewNoteDialog } from '@/components/notes/list/NewNoteDialog'
import { NotesFilterBar } from '@/components/notes/list/NotesFilterBar'
import { useNotesContext } from '@/providers/notes-store-provider'
import { updateNoteAction } from '@/lib/actions/notes'
import { slugify } from '@/lib/slugify'
import type { NoteRecord } from '@/types/NoteRecordType'

export type NotesSortKey = "recent" | "az" | "difficulty"

const difficultyOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }

export function NotesShell() {
  const { notes, createNote, removeNote } = useNotesContext()
  const router = useRouter()

  const [query,      setQuery]      = useState("")
  const [subject,    setSubject]    = useState("all")
  const [status,     setStatus]     = useState("all")
  const [difficulty, setDifficulty] = useState("all")
  const [sort,       setSort]       = useState<NotesSortKey>("recent")

  const subjects = useMemo(
    () => Array.from(new Set(notes.map((n) => n.subject).filter(Boolean))),
    [notes],
  )

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    const result = notes.filter((n) => {
      if (subject    !== "all" && n.subject    !== subject)    return false
      if (status     !== "all" && n.status     !== status)     return false
      if (difficulty !== "all" && n.difficulty !== difficulty) return false
      if (q && !n.title.toLowerCase().includes(q) && !n.subject.toLowerCase().includes(q)) return false
      return true
    })
    if (sort === "az")         result.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === "difficulty") result.sort((a, b) => (difficultyOrder[b.difficulty] ?? 1) - (difficultyOrder[a.difficulty] ?? 1))
    return result
  }, [notes, query, subject, status, difficulty, sort])

  async function handleCreate(note: NoteRecord) {
    await createNote(note)
    router.push(`/notes/${note.slug}`)
  }

  async function handleDelete(slug: string) {
    await removeNote(slug)
  }

  async function handleRename(slug: string, title: string) {
    const newSlug = `${slugify(title)}-${Date.now().toString(36)}`
    await updateNoteAction(slug, { title, slug: newSlug })
    router.refresh()
  }

  return (
    <main className={cn("container mx-auto", "max-w-5xl py-10 px-8")}>
      <div className="mb-6">
        <h1 className={cn("text-2xl font-bold")}>My Notes</h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} of {notes.length} notes</p>
      </div>

      <div className="mb-6">
        <NotesFilterBar
          query={query} subject={subject} status={status} difficulty={difficulty} sort={sort} subjects={subjects}
          action={<NewNoteDialog onCreate={handleCreate} />}
          onQuery={setQuery} onSubject={setSubject} onStatus={setStatus} onDifficulty={setDifficulty} onSort={setSort}
        />
      </div>

      <div className={cn("grid gap-4", "sm:grid-cols-2")}>
        {filtered.map(note => (
          <NoteCard
            key={`${note.slug}:${note.title}`}
            note={note}
            onDelete={handleDelete}
            onRename={handleRename}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 py-12 text-center text-sm text-muted-foreground">
            No notes match your filters.
          </p>
        )}
      </div>
    </main>
  )
}
