"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Verdict = "True" | "False" | ""

function parse(value: string): { verdict: Verdict; explanation: string } {
  if (value.startsWith("True. "))  return { verdict: "True",  explanation: value.slice(6)  }
  if (value.startsWith("False. ")) return { verdict: "False", explanation: value.slice(7)  }
  if (value === "True")            return { verdict: "True",  explanation: ""              }
  if (value === "False")           return { verdict: "False", explanation: ""              }
  return { verdict: "", explanation: value }
}

function combine(verdict: Verdict, explanation: string): string {
  if (!verdict) return ""
  return explanation.trim() ? `${verdict}. ${explanation}` : verdict
}

type Props = {
  value: string
  onChange: (combined: string) => void
}

const OPTIONS: { value: "True" | "False"; text: string; activeBg: string; activeBorder: string; hoverBg: string; baseBg: string }[] = [
  { value: "True",  text: "text-green-600",   activeBg: "bg-green-500/20",   activeBorder: "border-green-500",   hoverBg: "hover:bg-green-500/10",   baseBg: "bg-green-500/5"   },
  { value: "False", text: "text-destructive", activeBg: "bg-destructive/20", activeBorder: "border-destructive", hoverBg: "hover:bg-destructive/10", baseBg: "bg-destructive/5" },
]

export function TrueFalseAnswerSection({ value, onChange }: Props) {
  const init = parse(value)
  const [verdict, setVerdict]         = useState<Verdict>(init.verdict)
  const [explanation, setExplanation] = useState(init.explanation)

  function handleVerdict(v: "True" | "False") {
    setVerdict(v)
    onChange(combine(v, explanation))
  }

  function handleExplanation(v: string) {
    setExplanation(v)
    onChange(combine(verdict, v))
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Answer</p>
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map(({ value: v, text, activeBg, activeBorder, hoverBg, baseBg }) => {
            const isSelected = verdict === v
            return (
              <Button
                key={v}
                type="button"
                variant="outline"
                onClick={() => handleVerdict(v)}
                className={cn(
                  // layout
                  "flex items-center justify-center",
                  // sizing
                  "h-12 w-full",
                  // border
                  "rounded-xl border-2",
                  // typography
                  "text-sm font-semibold",
                  // animation
                  "transition-colors duration-150",
                  // colors
                  text,
                  // states
                  isSelected
                    ? [activeBg, activeBorder]
                    : ["border-transparent", baseBg, hoverBg],
                )}
              >
                {v}
              </Button>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Explanation{" "}
          <span className="normal-case font-normal text-muted-foreground/60">(optional)</span>
        </p>
        <Textarea
          value={explanation}
          onChange={(e) => handleExplanation(e.target.value)}
          placeholder="Why is the answer True or False?"
          className="resize-none text-sm"
          rows={4}
        />
      </div>
    </>
  )
}
