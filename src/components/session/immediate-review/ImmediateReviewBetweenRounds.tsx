"use client"

import { Button } from "@/components/ui/button"
import { ImmediateReviewStatCard } from "@/components/session/summary/ImmediateReviewStatCard"
import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

export function ImmediateReviewBetweenRounds({ session }: Props) {
  const { results, round2Questions, startRound2 } = session

  const gotIt   = results.filter(r => r.selfRating === "correct").length
  const partial = results.filter(r => r.selfRating === "partial").length
  const missed  = results.filter(r => r.selfRating === "missed").length
  const count   = round2Questions.length

  return (
    <div className={cn(
      // layout
      "flex flex-col items-center",
      // sizing
      "w-full max-w-md",
      // spacing
      "mx-auto gap-6 py-16",
    )}>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Round 1 complete
        </p>
        <h2 className="text-2xl font-bold mt-1">Time to review weak spots</h2>
        <p className="text-sm text-muted-foreground mt-1">
          One retry per question — no pressure.
        </p>
      </div>

      <div className="w-full grid grid-cols-3 gap-3">
        <ImmediateReviewStatCard label="Correct" value={gotIt}   />
        <ImmediateReviewStatCard label="Partial" value={partial} />
        <ImmediateReviewStatCard label="Missed"  value={missed}  />
      </div>

      <Button onClick={startRound2} size="lg" className="w-full">
        Review {count} weak {count === 1 ? "question" : "questions"}
      </Button>
    </div>
  )
}
