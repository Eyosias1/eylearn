import { cn } from "@/lib/utils"
import type { Question } from "@/types/QuestionType"

type Props = {
  question: Question
  selected: boolean
  onToggle: () => void
}

export function BankQuestionRow({ question, selected, onToggle }: Props) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        // layout
        "flex items-start gap-3 cursor-pointer",
        // spacing
        "p-3",
        // border
        "rounded-lg border",
        // animation
        "transition-colors",
        // conditional
        selected ? "border-primary bg-primary/5" : "hover:border-foreground/20",
      )}
    >
      <input type="checkbox" readOnly checked={selected} className="mt-0.5 shrink-0 cursor-pointer" />
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm font-medium line-clamp-2">{question.body}</p>
        <p className="text-sm text-muted-foreground line-clamp-1">{question.correct_answer}</p>
      </div>
    </div>
  )
}
