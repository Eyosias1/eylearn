"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SessionLength } from "@/types/StudySessionType"

const OPTIONS: { value: SessionLength; label: string }[] = [
  { value: 20,       label: "20 min"  },
  { value: 30,       label: "30 min"  },
  { value: "custom", label: "Custom"  },
]

type Props = {
  selected: SessionLength
  onSelect: (length: SessionLength) => void
}

export function SessionLengthPicker({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Session Length
      </p>
      <div className="flex gap-3">
        {OPTIONS.map(({ value, label }) => (
          <Button
            key={String(value)}
            type="button"
            variant="ghost"
            onClick={() => onSelect(value)}
            className={cn(
              // layout
              "flex-1",
              // spacing
              "py-2.5",
              // typography
              "text-sm font-medium",
              // border
              "rounded-xl border",
              // animation
              "transition-colors duration-150",
              // conditional
              selected === value
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-foreground border-border hover:border-foreground/30",
            )}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
