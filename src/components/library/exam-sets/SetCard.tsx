"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteQuestionSet } from "@/lib/actions/question-sets"
import { useQuestionsStore } from "@/providers/questions-store-provider"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"
import type { QuestionSetWithCount } from "@/types/QuestionSetType"

type Props = {
  set: QuestionSetWithCount
  subject?: Subject
  onDelete: (id: string) => void
}

export function SetCard({ set, subject, onDelete }: Props) {
  const router = useRouter()
  const { setCounts } = useQuestionsStore()
  const count   = setCounts[set.id] ?? set.question_count
  const isEmpty = count === 0

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation()
    onDelete(set.id)
    await deleteQuestionSet(set.id)
  }

  return (
    <div
      onClick={() => router.push(`/library/sets/${set.id}`)}
      className={cn(
        // layout
        "group relative flex flex-col gap-3",
        // sizing
        "h-full",
        // spacing
        "p-4",
        // border
        "rounded-xl border",
        // colors
        "bg-card",
        // hover
        "hover:border-foreground/20 transition-colors cursor-pointer",
        // conditional
        isEmpty && "border-dashed",
      )}
    >
      <Button variant="link" size="sm" onClick={handleDelete}
        className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 text-muted-foreground group-hover:text-white group-hover:bg-destructive/80 transition-all"
      >
        <Trash2 className="size-4" />
      </Button>

      {subject && (
        <div className={cn("inline-flex items-center self-start px-2 py-0.5 text-xs font-medium text-white rounded-full", subject.color)}>
          {subject.name}
        </div>
      )}

      <div className="flex flex-col gap-1 flex-1">
        <p className="text-base font-semibold leading-snug">{set.name}</p>
        {set.description && <p className="text-sm text-muted-foreground line-clamp-2">{set.description}</p>}
      </div>

      <span className={cn(
        "self-start px-2 py-0.5 text-sm font-medium rounded-full",
        isEmpty ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary",
      )}>
        {count} {count === 1 ? "question" : "questions"}
      </span>
    </div>
  )
}
