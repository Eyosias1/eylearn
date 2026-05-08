"use client"

import { CheckCircle2, MinusCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"
import type { ImmediateReviewRating as Rating } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

const RATINGS: { value: Rating; label: string; bg: string; hoverBg: string; text: string; Icon: React.ElementType }[] = [
  { value: "correct", label: "Correct", bg: "bg-green-600/5",   hoverBg: "hover:bg-green-600/25",   text: "text-green-500",   Icon: CheckCircle2 },
  { value: "partial", label: "Partial", bg: "bg-yellow-500/5",  hoverBg: "hover:bg-yellow-500/25",  text: "text-yellow-500",  Icon: MinusCircle  },
  { value: "missed",  label: "Missed",  bg: "bg-destructive/5", hoverBg: "hover:bg-destructive/25", text: "text-destructive", Icon: XCircle      },
]

export function ImmediateReviewRating({ session }: Props) {
  const { rateAndNext } = session
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground text-center">How did you do?</p>
      <div className="grid grid-cols-3 gap-5">
        {RATINGS.map(({ value, label, bg, hoverBg, text, Icon }) => (
          <Button key={value} onClick={() => rateAndNext(value)}
            className={cn(
              // layout
              "flex flex-col items-center justify-center",
              // sizing
              "w-full aspect-square h-25",
              // spacing
              "gap-2 py-4",
              // border
              "rounded-xl border-0",
              // animation
              "transition-colors duration-150",
              // colors
              bg, text,
              // hover
              hoverBg,
            )}
          >
            <Icon className="size-8" />
            <span className="text-sm font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
