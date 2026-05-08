import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0")
  const s = (seconds % 60).toString().padStart(2, "0")
  return `${m}:${s}`
}

export function ImmediateReviewProgress({ session }: Props) {
  const { currentIndex, activeQuestions, round, remainingSeconds } = session
  const isLow            = remainingSeconds <= 60
  const questionProgress = (currentIndex / activeQuestions.length) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {round === 2 && <span className="text-primary font-medium mr-1.5">Round 2 —</span>}
          {currentIndex + 1} of {activeQuestions.length}
        </span>
        <div className={cn(
          // layout
          "flex items-center gap-1.5",
          // conditional
          isLow ? "text-destructive" : "text-muted-foreground",
        )}>
          <Clock className="size-3.5" />
          <span className="text-sm font-mono tabular-nums">{formatTime(remainingSeconds)}</span>
        </div>
      </div>
      <div className={cn(
        // layout
        "overflow-hidden",
        // sizing
        "h-1.5 w-full",
        // border
        "rounded-full",
        // colors
        "bg-muted",
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            round === 2 ? "bg-yellow-500" : "bg-primary",
          )}
          style={{ width: `${questionProgress}%` }}
        />
      </div>
    </div>
  )
}
