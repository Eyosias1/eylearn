"use client"

import { Zap, Minus, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ImmediateReviewConfidence } from "@/types/ImmediateReviewType"

type Props = {
  selected: ImmediateReviewConfidence | null
  onSelect: (confidence: ImmediateReviewConfidence) => void
}

const OPTIONS: {
  value: ImmediateReviewConfidence
  label: string
  bg: string
  activeBg: string
  hoverBg: string
  text: string
  activeBorder: string
  Icon: React.ElementType
}[] = [
  { value: "high",   label: "High",   bg: "bg-blue-500/5",   activeBg: "bg-blue-500/20",   hoverBg: "hover:bg-blue-500/15",   text: "text-blue-500",   activeBorder: "border-blue-500",   Icon: Zap          },
  { value: "medium", label: "Medium", bg: "bg-muted/50",     activeBg: "bg-muted",          hoverBg: "hover:bg-muted",          text: "text-foreground", activeBorder: "border-foreground/40", Icon: Minus        },
  { value: "low",    label: "Low",    bg: "bg-orange-500/5", activeBg: "bg-orange-500/20",  hoverBg: "hover:bg-orange-500/15", text: "text-orange-500", activeBorder: "border-orange-500", Icon: AlertTriangle },
]

export function ImmediateReviewConfidencePicker({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className={cn(
        // typography
        "text-xl font-medium ",
        // colors
        "text-muted-foreground",
      )}>
        How confident were you?
      </p>
      <div className="grid grid-cols-3 gap-5">
        {OPTIONS.map(({ value, label, bg, activeBg, hoverBg, text, activeBorder, Icon }) => {
          const isSelected = selected === value
          return (
            <Button key={value} type="button" onClick={() => onSelect(value)}
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
    </div>
  )
}
