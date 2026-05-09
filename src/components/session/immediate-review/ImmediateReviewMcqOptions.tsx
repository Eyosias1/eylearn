"use client"

import { cn } from "@/lib/utils"
import type { McqOption } from "@/types/QuestionType"

type Props = {
  options:       McqOption[]
  selected:      string
  onSelect:      (value: string) => void
  disabled:      boolean
  correctAnswer?: string
}

export function ImmediateReviewMcqOptions({ options, selected, onSelect, disabled, correctAnswer }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const value      = `${option.label}. ${option.text}`
        const isSelected = selected === value
        const isCorrect  = disabled && value === correctAnswer
        const isWrong    = disabled && isSelected && value !== correctAnswer

        return (
          <button
            key={option.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(value)}
            className={cn(
              // layout
              "flex items-center gap-3",
              // spacing
              "p-4",
              // border
              "rounded-xl border-2",
              // typography
              "text-sm text-left",
              // animation
              "transition-all duration-150 cursor-pointer",
              // states
              !isSelected && !isCorrect && !isWrong && "border-border hover:border-foreground/30 hover:bg-muted/30",
              isSelected && !disabled  && "border-primary bg-primary/10",
              isCorrect                && "border-green-500 bg-green-500/10",
              isWrong                  && "border-destructive bg-destructive/10",
            )}
          >
            <span className={cn(
              "shrink-0 flex items-center justify-center size-7 rounded-full text-xs font-bold",
              !isCorrect && !isWrong && "bg-muted",
              isCorrect  && "bg-green-500 text-white",
              isWrong    && "bg-destructive text-white",
            )}>
              {option.label}
            </span>
            <span className={cn(
              isCorrect && "text-green-700 dark:text-green-400 font-medium",
              isWrong   && "text-destructive font-medium",
            )}>
              {option.text}
            </span>
          </button>
        )
      })}
    </div>
  )
}
