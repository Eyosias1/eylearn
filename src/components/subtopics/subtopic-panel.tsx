"use client"

import { useState, useEffect } from "react"
import { X, BookOpen, Brain, FileText, MousePointerClick, Link2Off, ExternalLink, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NotePicker } from "@/components/subtopics/note-picker"
import { linkSubtopicNote, unlinkSubtopicNote, getLinkedNotes } from "@/lib/actions/subtopics"
import type { Subtopic } from "@/types/SubtopicType"
import type { Topic } from "@/types/TopicType"
import type { Subject } from "@/types/SubjectType"

const BOX_LABEL: Record<number, string> = {
  1: "Daily", 2: "Every 3 days", 3: "Weekly", 4: "Bi-weekly", 5: "Mastered",
}

type LinkedNote = { id: string; title: string; slug: string }

interface Props {
  subtopic: Subtopic | null
  topic:    Topic | null
  subject:  Subject | null
  onClose:  () => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}

export function SubtopicPanel({ subtopic, topic, subject, onClose }: Props) {
  const [picking,     setPicking]     = useState(false)
  const [linkedNotes, setLinkedNotes] = useState<LinkedNote[]>([])

  useEffect(() => {
    setPicking(false)
    setLinkedNotes([])
    if (subtopic?.id) {
      getLinkedNotes(subtopic.id).then(setLinkedNotes)
    }
  }, [subtopic?.id])

  async function handleSelectNote(note: LinkedNote) {
    if (!subtopic) return
    await linkSubtopicNote(subtopic.id, note.id)
    setLinkedNotes((prev) => prev.some((n) => n.id === note.id) ? prev : [...prev, note])
    setPicking(false)
  }

  async function handleUnlink(note: LinkedNote) {
    if (!subtopic) return
    await unlinkSubtopicNote(subtopic.id, note.id)
    setLinkedNotes((prev) => prev.filter((n) => n.id !== note.id))
  }

  if (!subtopic || !topic || !subject) {
    return (
      <div className={cn(
        // layout
        "flex flex-col items-center justify-center gap-3 shrink-0",
        // sizing
        "w-72",
        // spacing
        "p-6",
        // border
        "rounded-xl border border-dashed",
        // colors
        "bg-card text-center",
        // position
        "sticky top-4",
      )}>
        <MousePointerClick className="size-6 text-muted-foreground/50" />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">No subtopic selected</p>
          <p className="text-xs text-muted-foreground">Click a subtopic to view its details, or expand a topic and add one</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      // layout
      "flex flex-col gap-5 shrink-0",
      // sizing
      "w-72",
      // spacing
      "p-4",
      // border
      "rounded-xl border",
      // colors
      "bg-card",
      // position
      "sticky top-4",
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-semibold leading-snug">{subtopic.name}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className={cn("size-2 rounded-full shrink-0", subject.color)} />
            <span>{subject.name}</span>
            <span>·</span>
            <span>{topic.name}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onClose} className="shrink-0 -mt-0.5">
          <X className="size-3.5" />
        </Button>
      </div>

      <div className="h-px bg-border" />

      {/* Leitner */}
      <Section title="Leitner Box">
        {subtopic.leitner_active && subtopic.leitner_box ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Brain className="size-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold">Box {subtopic.leitner_box}</span>
              <span className="text-xs text-muted-foreground">{BOX_LABEL[subtopic.leitner_box]}</span>
            </div>
            {subtopic.next_review_date && (
              <p className="text-xs text-muted-foreground pl-5">
                Next review: <span className="text-foreground font-medium">{subtopic.next_review_date}</span>
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Brain className="size-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Not yet studied — start a session to activate</span>
          </div>
        )}
      </Section>

      <div className="h-px bg-border" />

      {/* Linked notes */}
      <Section title="Linked Notes">
        <div className="flex flex-col gap-1">
          {linkedNotes.map((note) => (
            <div key={note.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="size-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs font-medium truncate">{note.title}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon-sm" asChild>
                  <Link href={`/notes/${note.slug}`}>
                    <ExternalLink className="size-3.5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleUnlink(note)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Link2Off className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}

          {picking ? (
            <NotePicker onSelect={handleSelectNote} onCancel={() => setPicking(false)} />
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs gap-1.5 mt-1"
              onClick={() => setPicking(true)}
            >
              <Plus className="size-3.5" />
              Link a Note
            </Button>
          )}
        </div>
      </Section>

      <div className="h-px bg-border" />

      <Section title="Study">
        <Button size="sm" className="w-full gap-2">
          <BookOpen className="size-3.5" />
          Start Session
        </Button>
      </Section>
    </div>
  )
}
