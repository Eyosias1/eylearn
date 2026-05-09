"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { McqAnswerSection } from "@/components/library/question-bank/McqAnswerSection"
import { TrueFalseAnswerSection } from "@/components/library/question-bank/TrueFalseAnswerSection"
import { QuestionImageUpload } from "@/components/library/question-bank/QuestionImageUpload"
import { updateQuestion, deleteQuestion } from "@/lib/actions/questions"
import { QUESTION_TYPES } from "@/types/QuestionType"
import type { Question, QuestionType, McqOption } from "@/types/QuestionType"

const DEFAULT_OPTIONS: McqOption[] = [
  { label: "A", text: "" }, { label: "B", text: "" },
  { label: "C", text: "" }, { label: "D", text: "" },
]

type Props = {
  question: Question
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (updated: Question) => void
  onDelete: (id: string) => void
}

export function QuestionDialog({ question, open, onOpenChange, onUpdate, onDelete }: Props) {
  const [body, setBody]     = useState(question.body)
  const [type, setType]     = useState<QuestionType>(question.type)
  const [answer, setAnswer] = useState(question.correct_answer)
  const [options, setOptions]   = useState<McqOption[]>(question.options ?? DEFAULT_OPTIONS)
  const [imageUrl, setImageUrl] = useState<string | null>(question.image_url ?? null)
  const [loading, setLoading]   = useState(false)

  function handleTypeChange(v: QuestionType) {
    setType(v)
    setAnswer("")
    if (v === "mcq") setOptions(question.options ?? DEFAULT_OPTIONS)
  }

  const isMcq       = type === "mcq"
  const isTrueFalse = type === "true-false"

  async function handleSave() {
    if (!body.trim() || !answer.trim()) return
    setLoading(true)
    const updated = await updateQuestion(question.id, question.topic_id, body.trim(), type, answer.trim(), isMcq ? options : null, imageUrl)
    setLoading(false)
    onUpdate(updated)
    onOpenChange(false)
  }

  async function handleDelete() {
    setLoading(true)
    onDelete(question.id)
    onOpenChange(false)
    await deleteQuestion(question.id, question.topic_id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-base">Edit Question</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(85vh-8rem)]">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Question</p>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} className="resize-none text-sm" rows={4} />
            <QuestionImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</p>
            <Select value={type} onValueChange={(v) => handleTypeChange(v as QuestionType)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {QUESTION_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isMcq ? (
            <McqAnswerSection options={options} correctAnswer={answer} onOptionsChange={setOptions} onCorrectAnswerChange={setAnswer} />
          ) : isTrueFalse ? (
            <TrueFalseAnswerSection value={answer} onChange={setAnswer} />
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Correct Answer</p>
              <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} className="resize-none text-sm" rows={5} />
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between gap-2 sm:justify-between">
          <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>Delete</Button>
          <Button size="sm" onClick={handleSave} disabled={loading || !body.trim() || !answer.trim()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
