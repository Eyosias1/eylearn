"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Props = {
  selected:          string
  onSelect:          (value: string) => void
  disabled:          boolean
  correctAnswer?:    string
  showExplanation?:  boolean
}

function parseVerdict(answer: string): "True" | "False" | "" {
  if (answer.startsWith("True"))  return "True"
  if (answer.startsWith("False")) return "False"
  return ""
}

function parseExplanation(answer: string): string {
  const idx = answer.indexOf(". ")
  if (idx === -1) return ""
  const prefix = answer.slice(0, idx)
  if (prefix !== "True" && prefix !== "False") return ""
  return answer.slice(idx + 2)
}

function combine(verdict: string, explanation: string): string {
  if (!verdict) return ""
  return explanation.trim() ? `${verdict}. ${explanation}` : verdict
}

const OPTIONS: { value: "True" | "False" }[] = [{ value: "True" }, { value: "False" }]

export function ImmediateReviewTrueFalseOptions({ selected, onSelect, disabled, correctAnswer, showExplanation = false }: Props) {
  const verdict     = parseVerdict(selected)
  const explanation = parseExplanation(selected)
  const correctVerdict = correctAnswer ? parseVerdict(correctAnswer) : ""

  function handleVerdict(v: "True" | "False") {
    onSelect(combine(v, explanation))
  }

  function handleExplanation(text: string) {
    onSelect(combine(verdict || "", text))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map(({ value }) => {
          const isSelected = verdict === value
          const isCorrect  = disabled && value === correctVerdict
          const isWrong    = disabled && isSelected && value !== correctVerdict

          return (
            <Button
              key={value}
              type="button"
              variant="outline"
              disabled={disabled}
              onClick={() => handleVerdict(value)}
              className={cn(
                // layout
                "flex items-center justify-center",
                // sizing
                "h-14",
                // border
                "rounded-xl border-2",
                // typography
                "text-base font-semibold",
                // animation
                "transition-all duration-150",
                // states
                !isSelected && !isCorrect && !isWrong && "border-border hover:border-foreground/30 hover:bg-muted/30",
                isSelected && !disabled  && "border-primary bg-primary/10",
                isCorrect                && "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400",
                isWrong                  && "border-destructive bg-destructive/10 text-destructive",
              )}
            >
              {value}
            </Button>
          )
        })}
      </div>
      {showExplanation && (
        <Textarea
          placeholder="Explain your reasoning..."
          value={explanation}
          onChange={(e) => handleExplanation(e.target.value)}
          disabled={disabled}
          className="min-h-32 resize-none md:text-xl p-5"
        />
      )}
    </div>
  )
}
