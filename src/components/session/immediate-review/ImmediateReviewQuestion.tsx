import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

export function ImmediateReviewQuestion({ session }: Props) {
  const { currentQuestion } = session
  if (!currentQuestion) return null

  return (
    <div className={cn(
      // layout
      "flex flex-col",
      // spacing
      "gap-3 py-4",
      // border
      "rounded-xl ",
      // sizing
      // "min-h-48",
    )}>
      <p className={cn(
        // typography
        "text-3xl font-semibold leading-relaxed",
      )}>
        {currentQuestion.body}
      </p>
    </div>
  )
}
