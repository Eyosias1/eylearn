import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { McqOption } from "@/types/QuestionType"

const LABELS = ["A", "B", "C", "D", "E", "F"]

type Props = {
  options: McqOption[]
  onChange: (options: McqOption[]) => void
}

export function McqOptionsEditor({ options, onChange }: Props) {
  function add() {
    if (options.length >= LABELS.length) return
    onChange([...options, { label: LABELS[options.length], text: "" }])
  }

  function update(index: number, text: string) {
    onChange(options.map((o, i) => i === index ? { ...o, text } : o))
  }

  function remove(index: number) {
    onChange(
      options
        .filter((_, i) => i !== index)
        .map((o, i) => ({ ...o, label: LABELS[i] }))
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {options.map((option, i) => (
        <div key={i} className={cn("flex items-center gap-2")}>
          <span className="text-xs font-bold text-muted-foreground w-4 shrink-0 text-center">
            {option.label}
          </span>
          <Input
            value={option.text}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Option ${option.label}...`}
            className="text-sm h-9"
          />
          {options.length > 2 && (
            <Button variant="ghost" size="icon" onClick={() => remove(i)} className="size-8 shrink-0">
              <X className="size-3.5" />
            </Button>
          )}
        </div>
      ))}
      {options.length < LABELS.length && (
        <Button variant="outline" size="sm" onClick={add} className="gap-1.5 mt-1">
          <Plus className="size-3.5" />
          Add option
        </Button>
      )}
    </div>
  )
}
