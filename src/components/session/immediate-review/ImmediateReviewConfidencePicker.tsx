"use client"

import { Zap, Minus, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ImmediateReviewConfidence } from "@/types/ImmediateReviewType"

type Props = {
  onSelect: (confidence: ImmediateReviewConfidence) => void
}

const OPTIONS: { value: ImmediateReviewConfidence; label: string; bg: string; hoverBg: string; text: string; Icon: React.ElementType }[] = [
  { value: "high",   label: "High",   bg: "bg-blue-500/5",   hoverBg: "hover:bg-blue-500/25",   text: "text-blue-500",   Icon: Zap           },
  { value: "medium", label: "Medium", bg: "bg-muted/50",     hoverBg: "hover:bg-muted",          text: "text-foreground", Icon: Minus          },
  { value: "low",    label: "Low",    bg: "bg-orange-500/5", hoverBg: "hover:bg-orange-500/25",  text: "text-orange-500", Icon: AlertTriangle  },
]

export function ImmediateReviewConfidencePicker({ onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className={cn(
        // typography
        "text-sm font-medium text-center",
        // colors
        "text-muted-foreground",
      )}>
        How confident were you? <span className="text-xs">(this reveals the answer)</span>
      </p>
      <div className="grid grid-cols-3 gap-5">
        {OPTIONS.map(({ value, label, bg, hoverBg, text, Icon }) => (
          <Button key={value} type="button" onClick={() => onSelect(value)}
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
