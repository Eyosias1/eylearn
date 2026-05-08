"use client"

import { Textarea } from "@/components/ui/textarea"
import { ImmediateReviewConfidencePicker } from "@/components/session/immediate-review/ImmediateReviewConfidencePicker"
import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

export function ImmediateReviewAnswer({ session }: Props) {
  const { studentAnswer, isRevealed, setStudentAnswer, revealAnswer } = session

  return (
    <div className={cn(
      // layout
      "flex flex-col",
      // spacing
      "gap-4",
    )}>
      <Textarea
        placeholder="Write your answer..."
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.target.value)}
        disabled={isRevealed}
        className="min-h-48 resize-none md:text-xl p-5"
      />
      {!isRevealed && (
        <ImmediateReviewConfidencePicker onSelect={revealAnswer} />
      )}
    </div>
  )
}
