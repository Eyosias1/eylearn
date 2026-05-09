"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ImmediateReviewStatCard } from "@/components/session/summary/ImmediateReviewStatCard"
import { ImmediateReviewQuestionReview } from "@/components/session/summary/ImmediateReviewQuestionReview"
import { ImmediateReviewCalibrationCard } from "@/components/session/summary/ImmediateReviewCalibrationCard"
import { useSessionGrading } from "@/hooks/useSessionGrading"
import { useSaveReviewSession } from "@/hooks/useSaveReviewSession"
import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export function ImmediateReviewSummary({ session }: Props) {
  const router = useRouter()
  const { results, questions, round2Results, elapsedSeconds } = session

  const allResults = [...results, ...round2Results]
  const { grades, round1Grades, round2Grades, loading } = useSessionGrading(results, round2Results, questions)
  const { error: saveError } = useSaveReviewSession(session, round1Grades, round2Grades, loading)

  const gotIt   = results.filter(r => r.selfRating === "correct").length
  const partial = results.filter(r => r.selfRating === "partial").length
  const missed  = results.filter(r => r.selfRating === "missed").length
  const skipped = results.filter(r => r.selfRating === "skipped").length

  const improved       = round2Results.filter(r => r.selfRating === "correct").length
  const stillWeak      = round2Results.filter(r => r.selfRating !== "correct").length
  const hasRound2      = round2Results.length > 0

  const overconfident  = results.filter(r => r.confidence === "high" && r.selfRating !== "correct").length
  const underconfident = results.filter(r => r.confidence === "low"  && r.selfRating === "correct").length

  return (
    <div className={cn(
      // layout
      "flex flex-col items-center",
      // sizing
      "w-full max-w-5xl",
      // spacing
      "mx-auto gap-6 py-16 px-4",
    )}>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Session complete</h2>
        <p className="text-sm text-muted-foreground mt-1">{formatTime(elapsedSeconds)} elapsed</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Round 1</p>
        <div className="grid grid-cols-4 gap-3">
          <ImmediateReviewStatCard label="Correct" value={gotIt}   />
          <ImmediateReviewStatCard label="Partial" value={partial} />
          <ImmediateReviewStatCard label="Missed"  value={missed}  />
          <ImmediateReviewStatCard label="Skipped" value={skipped} />
        </div>

        {hasRound2 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Round 2</p>
            <div className="grid grid-cols-4 gap-3">
              <ImmediateReviewStatCard label="Improved"   value={improved}  />
              <ImmediateReviewStatCard label="Still Weak" value={stillWeak} />
            </div>
          </>
        )}

        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Confidence Calibration</p>
        <div className="flex flex-col gap-3">
          <ImmediateReviewCalibrationCard type="overconfident"  count={overconfident}  />
          <ImmediateReviewCalibrationCard type="underconfident" count={underconfident} />
        </div>
      </div>

      <ImmediateReviewQuestionReview
        results={results}
        round2Results={round2Results}
        questions={questions}
        grades={grades}
        loading={loading}
      />

      {saveError && (
        <p className="text-sm text-destructive text-center">{saveError}</p>
      )}
      <Button onClick={() => router.push("/session")} size="lg" className="w-full">
        New Session
      </Button>
    </div>
  )
}
