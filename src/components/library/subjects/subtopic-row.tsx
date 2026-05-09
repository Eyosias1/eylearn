"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { deleteSubtopic } from "@/lib/actions/subtopics"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Subtopic } from "@/types/SubtopicType"

interface Props {
  subtopic:  Subtopic
  onEdit:    (subtopic: Subtopic) => void
  onSelect:  (subtopic: Subtopic) => void
}

export function SubtopicRow({ subtopic, onEdit, onSelect }: Props) {
  const [confirming, setConfirming] = useState(false)

  return (
    <>
      <div
        onClick={() => onSelect(subtopic)}
        className={cn(
          // layout
          "flex items-center justify-between group",
          // spacing
          "px-3 py-1",
          // hover
          "hover:bg-muted/30 transition-colors rounded-sm mx-1 cursor-pointer",
        )}
      >
        <p className="text-sm text-foreground/75 flex-1">{subtopic.name}</p>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {subtopic.leitner_box && (
            <span className="text-[10px] text-muted-foreground border rounded px-1 mr-1">
              Box {subtopic.leitner_box}
            </span>
          )}
          <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); onEdit(subtopic) }}>
            <Pencil className="size-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive"
            onClick={(e) => { e.stopPropagation(); setConfirming(true) }}
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
      </div>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{subtopic.name}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this subtopic. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteSubtopic(subtopic.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
