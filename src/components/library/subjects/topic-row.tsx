"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SubtopicRow } from "@/components/library/subjects/subtopic-row"
import { SubtopicDialog } from "@/components/library/subjects/subtopic-dialog"
import { deleteTopic } from "@/lib/actions/topics"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

interface Props {
  topic:        Topic
  subtopics:    Subtopic[]
  onEdit:       (topic: Topic) => void
  onSelectSubtopic: (subtopic: Subtopic) => void
}

export function TopicRow({ topic, subtopics, onEdit, onSelectSubtopic }: Props) {
  const [expanded,   setExpanded]   = useState(false)
  const [open,       setOpen]       = useState(false)
  const [editing,    setEditing]    = useState<Subtopic | null>(null)
  const [confirming, setConfirming] = useState(false)

  function handleEditSubtopic(s: Subtopic) { setEditing(s); setOpen(true) }
  function handleClose()                   { setOpen(false); setEditing(null) }

  return (
    <>
      <div className={cn(expanded && "bg-muted/10")}>
        {/* Topic header */}
        <div
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            // layout
            "flex items-center justify-between group",
            // spacing
            "px-4 py-2",
            // hover
            "hover:bg-muted/20 transition-colors cursor-pointer",
          )}
        >
          <div className="flex items-center gap-2">
            <ChevronRight className={cn(
              // sizing
              "size-3.5",
              // color
              "text-muted-foreground",
              // animation
              "transition-transform",
              // conditional
              expanded && "rotate-90",
            )} />
            <p className="text-sm font-medium">{topic.name}</p>
            <span className="text-[11px] text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded-md">
              {subtopics.length} subtopic{subtopics.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
              <Plus className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); onEdit(topic) }}>
              <Pencil className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); setConfirming(true) }}>
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Subtopics */}
        {expanded && (
          <div className={cn(
            // layout
            "flex flex-col",
            // spacing
            "pb-1",
            // border
            "border-l-2 border-border/50 ml-6",
          )}>
            {subtopics.length === 0 ? (
              <p className="text-xs text-muted-foreground/50 px-3 py-2">No subtopics yet</p>
            ) : (
              subtopics.map((s) => (
                <SubtopicRow key={s.id} subtopic={s} onEdit={handleEditSubtopic} onSelect={onSelectSubtopic} />
              ))
            )}
            <Button
              variant="ghost"
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 h-auto text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <Plus className="size-3" /> Add subtopic
            </Button>
          </div>
        )}
      </div>

      <SubtopicDialog open={open} topicId={topic.id} subtopic={editing} onClose={handleClose} />

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{topic.name}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the topic and all its subtopics. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteTopic(topic.id, topic.subject_id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
