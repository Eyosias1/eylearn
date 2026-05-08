"use client"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  value:    number
  max:      number
  onChange: (count: number) => void
}

export function ImmediateReviewQuestionSlider({ value, max, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className={cn(
          // typography
          "text-xs font-semibold uppercase tracking-widest",
          // colors
          "text-muted-foreground",
        )}>
          Questions
        </p>
        <span className="text-sm font-semibold tabular-nums">{value} / {max}</span>
      </div>

      {max <= 10 ? (
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: max }, (_, i) => i + 1).map(n => (
            <Button key={n} type="button" variant="ghost" onClick={() => onChange(n)}
              className={cn(
                // sizing
                "size-9",
                // typography
                "text-sm font-medium",
                // border
                "rounded-lg border",
                // animation
                "transition-colors duration-150",
                // conditional
                value === n
                  ? "bg-foreground text-background border-foreground"
                  : "bg-muted text-foreground hover:bg-muted/60",
              )}
            >
              {n}
            </Button>
          ))}
        </div>
      ) : (
        <>
          <Slider
            min={1}
            max={max}
            step={1}
            value={[value]}
            onValueChange={([v]) => onChange(v)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>{max}</span>
          </div>
        </>
      )}
    </div>
  )
}
