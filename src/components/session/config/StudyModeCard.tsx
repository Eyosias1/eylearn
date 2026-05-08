"use client"

import { Brain, RefreshCw, PenLine, UsersRound, ClipboardCheck, Timer, MoonStar, CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { StudyModeConfig, StudyMode } from "@/types/StudySessionType"

const ICONS = { Brain, RefreshCw, PenLine, UsersRound, ClipboardCheck, Timer, MoonStar, CalendarClock }

type Props = {
  mode: StudyModeConfig
  selected: boolean
  onSelect: (id: StudyMode) => void
}

export function StudyModeCard({ mode, selected, onSelect }: Props) {
  const Icon = ICONS[mode.iconName as keyof typeof ICONS]

  return (
    <Button
      type="button"
      variant="card"
      onClick={() => onSelect(mode.id)}
      className={cn(
        // layout
        "flex flex-col items-start gap-2 text-left w-full h-auto min-w-0 whitespace-normal",
        // spacing
        "p-4",
        // border
        "rounded-xl border-2",
        // animation
        "transition-all duration-150 cursor-pointer",
        // hover
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        // conditional
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card hover:border-foreground/30",
      )}
    >
      <Icon className="size-5" />
      <div className="flex flex-col">
        <p className="text-sm font-semibold leading-tight">{mode.label}</p>
        <p className={cn(
          // typography
          "text-xs mt-1 leading-snug",
          // conditional
          selected ? "text-background/70" : "text-muted-foreground",
        )}>
          {mode.description}
        </p>
      </div>
    </Button>
  )
}
