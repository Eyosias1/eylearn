"use client"

import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useImmediateReviewSession } from "@/hooks/useImmediateReviewSession"
import { ImmediateReviewProgress } from "@/components/session/immediate-review/ImmediateReviewProgress"
import { ImmediateReviewQuestion } from "@/components/session/immediate-review/ImmediateReviewQuestion"
import { ImmediateReviewAnswer } from "@/components/session/immediate-review/ImmediateReviewAnswer"
import { ImmediateReviewReveal } from "@/components/session/immediate-review/ImmediateReviewReveal"
import { ImmediateReviewRating } from "@/components/session/immediate-review/ImmediateReviewRating"
import { ImmediateReviewBetweenRounds } from "@/components/session/immediate-review/ImmediateReviewBetweenRounds"
import { ImmediateReviewSummary } from "@/components/session/summary/ImmediateReviewSummary"
import { cn } from "@/lib/utils"
import type { Question } from "@/types/QuestionType"

type Props = { questions: Question[]; durationMinutes: number; subtopicId: string }

export function ImmediateReviewSession({ questions, durationMinutes, subtopicId }: Props) {
  const router  = useRouter()
  const session = useImmediateReviewSession(questions, durationMinutes, subtopicId)

  if (session.stage === "summary")        return <ImmediateReviewSummary session={session} />
  if (session.stage === "between-rounds") return <ImmediateReviewBetweenRounds session={session} />

  return (
    <div className="flex flex-col w-full">
      <Button variant="ghost" size="lg" onClick={() => router.push("/session")}
        className={cn(
          // layout
          "self-start",
          // spacing
          "mb-4",
          // colors
          "font-semibold hover:text-foreground",
        )}
      >
        <X className="size-4" />
        Exit
      </Button>

      <div className={cn(
        // layout
        "flex flex-col",
        // sizing
        "w-full max-w-4xl",
        // spacing
        "mx-auto gap-6",
      )}>
        <ImmediateReviewProgress session={session} />
        <ImmediateReviewQuestion session={session} />
        <ImmediateReviewAnswer session={session} />
        {session.isRevealed && <ImmediateReviewReveal session={session} />}
        {session.isRevealed && <ImmediateReviewRating session={session} />}
      </div>
    </div>
  )
}
