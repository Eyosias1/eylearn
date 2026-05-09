"use client"

import { CheckCircle2, MinusCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"
import type { ImmediateReviewRating as Rating } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

const RATINGS: {
  value: Rating
  label: string
  bg: string
  activeBg: string
  hoverBg: string
  text: string
  activeBorder: string
  Icon: React.ElementType
}[] = [
  { value: "correct", label: "Correct", bg: "bg-green-600/5",   activeBg: "bg-green-600/20",   hoverBg: "hover:bg-green-600/15",   text: "text-green-500",   activeBorder: "border-green-500",   Icon: CheckCircle2 },
  { value: "partial", label: "Partial", bg: "bg-yellow-500/5",  activeBg: "bg-yellow-500/20",  hoverBg: "hover:bg-yellow-500/15",  text: "text-yellow-500",  activeBorder: "border-yellow-500",  Icon: MinusCircle  },
  { value: "missed",  label: "Missed",  bg: "bg-destructive/5", activeBg: "bg-destructive/20", hoverBg: "hover:bg-destructive/15", text: "text-destructive", activeBorder: "border-destructive", Icon: XCircle      },
]

export function ImmediateReviewRating({ session }: Props) {
  const { selectedRating, selectRating, advanceQuestion } = session
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl text-muted-foreground ">How did you do?</p>
      <div className="grid grid-cols-3 gap-5">
        {RATINGS.map(({ value, label, bg, activeBg, hoverBg, text, activeBorder, Icon }) => {
          const isSelected = selectedRating === value
          return (
            <Button key={value} onClick={() => selectRating(value)}
              className={cn(
                // layout
                "flex flex-col items-center justify-center",
                // sizing
                "w-full aspect-square h-25",
                // spacing
                "gap-2 py-4",
                // border
                "rounded-xl border-2",
                // animation
                "transition-colors duration-150",
                // colors
                text,
                // states
                isSelected ? [activeBg, activeBorder] : ["border-transparent", bg, hoverBg],
              )}
            >
              <Icon className="size-8" />
              <span className="text-sm font-medium">{label}</span>
            </Button>
          )
        })}
      </div>
      {selectedRating && (
        <Button onClick={advanceQuestion} size="lg" className="w-full">
          Next Question
        </Button>
      )}
    </div>
  )
}
