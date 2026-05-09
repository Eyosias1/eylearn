import { McqOptionsEditor } from "@/components/library/question-bank/McqOptionsEditor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { McqOption } from "@/types/QuestionType"

type Props = {
  options: McqOption[]
  correctAnswer: string
  onOptionsChange: (options: McqOption[]) => void
  onCorrectAnswerChange: (value: string) => void
}

export function McqAnswerSection({ options, correctAnswer, onOptionsChange, onCorrectAnswerChange }: Props) {
  const filledOptions = options.filter(o => o.text.trim())

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Options</p>
        <McqOptionsEditor options={options} onChange={onOptionsChange} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Correct Option</p>
        <Select value={correctAnswer || undefined} onValueChange={onCorrectAnswerChange}>
          <SelectTrigger className="w-full h-11 text-sm">
            {correctAnswer
              ? <SelectValue />
              : <span className="text-muted-foreground">Select the correct option...</span>
            }
          </SelectTrigger>
          <SelectContent>
            {filledOptions.length === 0 ? (
              <div className="py-3 px-3 text-sm text-muted-foreground">
                Fill in the options above first
              </div>
            ) : (
              filledOptions.map(o => (
                <SelectItem key={o.label} value={`${o.label}. ${o.text}`} className="py-2.5">
                  <span className="font-semibold mr-2">{o.label}.</span>{o.text}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
