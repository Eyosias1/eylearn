"use client"

import Link from "next/link"
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { QuestionSet } from "@/types/QuestionSetType"

type Props = {
  set:      QuestionSet
  deleting: boolean
  onEdit:         () => void
  onDelete:       () => void
  onAddQuestions: () => void
}

export function SetDetailHeader({ set, deleting, onEdit, onDelete, onAddQuestions }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/library"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-3.5" />
        Library
      </Link>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold">{set.name}</h1>
          {set.description && (
            <p className="text-sm text-muted-foreground">{set.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Pencil className="size-3.5" />Edit
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete} disabled={deleting}
            className="text-destructive hover:bg-destructive hover:text-white"
          >
            <Trash2 className="size-3.5" />Delete
          </Button>
          <Button size="sm" variant="outline" onClick={onAddQuestions}>
            <Plus className="size-3.5" />Add Questions
          </Button>
        </div>
      </div>
    </div>
  )
}
