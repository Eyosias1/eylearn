import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

export function ImmediateReviewReveal({ session }: Props) {
  const { currentQuestion } = session
  if (!currentQuestion) return null

  return (
    <div className={cn(
      // layout
      "flex flex-col",
      // spacing
      "gap-2 p-4",
      // border
      "rounded-xl border",
      // colors
      "bg-muted/50",
    )}>
      <p className={cn(
        // typography
        "text-xs font-semibold uppercase tracking-wide",
        // colors
        "text-muted-foreground",
      )}>
        Correct Answer
      </p>
      <p className="text-base font-medium">{currentQuestion.correct_answer}</p>
    </div>
  )
}
