"use client"

import { useState } from "react"
import { ChevronDown, Pencil, Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { TopicRow } from "@/components/library/subjects/topic-row"
import { deleteSubject } from "@/lib/actions/subjects"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

interface Props {
  subject:          Subject
  topics:           Topic[]
  subtopicsByTopic: Record<string, Subtopic[]>
  expanded:         boolean
  onToggle:         () => void
  onEdit:              (subject: Subject) => void
  onAddTopic:          (subject: Subject) => void
  onEditTopic:         (topic: Topic) => void
  onSelectSubtopic:    (subtopic: Subtopic) => void
}

export function SubjectSection({ subject, topics, subtopicsByTopic, expanded, onToggle, onEdit, onAddTopic, onEditTopic, onSelectSubtopic }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  async function handleDelete() {
    await deleteSubject(subject.id)
    setConfirmOpen(false)
  }

  return (
    <>
      <div className={cn("rounded-xl border bg-card transition-colors")}>
        {/* Subject header */}
        <div
          onClick={onToggle}
          className={cn(
            // layout
            "flex items-center justify-between",
            // spacing
            "px-4 py-3.5",
            // hover
            "hover:bg-muted/30 cursor-pointer",
            // border
            expanded && "border-b",
            // border radius
            "rounded-xl",
            expanded && "rounded-b-none",
          )}
        >
          <div className="flex items-center gap-3">
            <span className={cn("size-3 rounded-full shrink-0", subject.color)} />
            <p className="text-sm font-semibold">{subject.name}</p>
            <span className="text-xs text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded-md">{topics.length} topic{topics.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); onEdit(subject) }}>
              <Pencil className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); setConfirmOpen(true) }}>
              <Trash2 className="size-3.5" />
            </Button>
            <ChevronDown className={cn("size-4 text-muted-foreground transition-transform ml-1", expanded && "rotate-180")} />
          </div>
        </div>

        {/* Topics */}
        {expanded && (
          <div className="flex flex-col py-2">
            {topics.map((t) => (
              <TopicRow key={t.id} topic={t} subtopics={subtopicsByTopic[t.id] ?? []} onEdit={onEditTopic} onSelectSubtopic={onSelectSubtopic} />
            ))}
            <div className="px-4 pt-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground h-7 px-2" onClick={() => onAddTopic(subject)}>
                <Plus className="size-3.5 mr-1.5" /> Add Topic
              </Button>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {subject.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <span className="font-medium text-foreground">{subject.name}</span> and all its topics and subtopics. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
